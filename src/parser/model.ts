import { ANTLRErrorListener, Token } from "antlr4ts";

let options: Map<string, Set<string>>;
options = new Map<string, Set<string>>();
options.set("StringPreFixLenType", new Set(["u8", "u16", "u32", "u64"]));
options.set("RepeatPreFixSizeType", new Set(["u8", "u16", "u32", "u64"]));
options.set("LittleEndian", new Set(["true", "false"]));
options.set("JavaPackage", new Set());
options.set("GoPackage", new Set());
options.set("GoModule", new Set());

const basicTypes = new Set<string>([
  "char", "u8", "u16", "u32", "u64", "i8", "i16", "i32", "i64", "f32", "f64", "string",
  "uint8", "uint16", "uint32", "uint64", "int8", "int16", "int32", "int64", "float32", "float64", "char[]"
]);

export class DslSyntaxError {
  constructor(
    public line: number,
    public startIndex: number,
    public stopIndex: number,
    public msg: string,
  ) { }
}

export class SyntaxErrorCollector implements ANTLRErrorListener<Token> {
  public errors: DslSyntaxError[] = [];

  syntaxError(
    _recognizer: any,
    _offendingSymbol: Token | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e: any
  ): void {
    this.errors.push(new DslSyntaxError(line, charPositionInLine, charPositionInLine + 1, msg));
  }
}

export class BinaryModel {
  rootPacket?: Packet;
  metaDataMap = new Map<string, MetaData>();
  options = new Map<string, string>();
  packets: Packet[] = [];
  packetMaps = new Map<string, Packet>();
  syntaxErrors: DslSyntaxError[] = [];

  addSyntaxError(error: DslSyntaxError) {
    this.syntaxErrors.push(error);
  }

  addMetaData(meta: MetaData) {
    if (this.metaDataMap.has(meta.name)) {
      this.addSyntaxError(
        new DslSyntaxError(meta.line, meta.startIndex, meta.stopIndex, `Duplicate metadata definition: ${meta.name}`)
      );
      return;
    }
    this.metaDataMap.set(meta.name, meta);
  }

  addOption(name: string, value: string, line: number, startIndex: number, stopIndex: number) {
    if (!options.has(name)) {
      this.addSyntaxError(
        new DslSyntaxError(line, startIndex, stopIndex, `Unknown option: ${name}. Expected one of: ${Array.from(options.keys()).join(", ")}`)
      );
      return;
    }
    if (options.get(name)?.size !== 0 &&
      !options.get(name)?.has(value)) {
      this.addSyntaxError(
        new DslSyntaxError(line, startIndex, stopIndex, `Invalid value for option ${name}: ${value}. Expected one of: ${Array.from(options.get(name) ?? []).join(", ")}`)
      );
      return;
    }
    if (this.options.has(name)) {
      this.addSyntaxError(
        new DslSyntaxError(line, startIndex, stopIndex, `Duplicate option definition: ${name}`)
      );
      return;
    }
    this.options.set(name, value);
  }

  addPacket(packet: Packet) {
    if (this.packetMaps.has(packet.name)) {
      this.addSyntaxError(
        new DslSyntaxError(packet.line, packet.startIndex, packet.stopIndex, `Duplicate packet definition: ${packet.name}`)
      );
      return;
    }
    this.packetMaps.set(packet.name, packet);
    this.packets.push(packet);
    if (packet.isRoot) {
      if (this.rootPacket) {
        this.addSyntaxError(
          new DslSyntaxError(packet.line, packet.startIndex, packet.stopIndex, `Root packet already defined: ${this.rootPacket.name}. New root packet: ${packet.name}`)
        );
      } else {
        this.rootPacket = packet;
      }
    }
  }

  validatePacketField(packet: Packet) {
    for (const field of packet.fields) {
      if (basicTypes.has(field.type)) {
        continue;
      }
      if (field.type.startsWith("char[") && field.type.endsWith("]")) {
        continue;
      }
      if (this.metaDataMap.has(field.type)) {
        continue;
      }
      if (field.inerObject) {
        this.validatePacketField(field.inerObject);
        continue;
      }
      if (this.packetMaps.has(field.type)) {
        continue;
      }
      if (field.type === "match") {
        for (const pair of field.matchPairs) {
          if (!this.packetMaps.has(pair.value)) {
            this.addSyntaxError(
              new DslSyntaxError(pair.line, pair.startIndex, pair.stopIndex, `Unknown match value: ${pair.value} in packet ${packet.name}`)
            );
          }
        }
        continue;
      }
      this.addSyntaxError(
        new DslSyntaxError(field.line, field.startIndex, field.stopIndex, `Unknown field type: ${field.type} in packet ${packet.name}`)
      );
    }
  }

  validatePacket(packet: Packet) {
    let fieldNames = new Set<string>();
    for (const field of packet.fields) {
      if (fieldNames.has(field.name)) {
        this.addSyntaxError(
          new DslSyntaxError(field.line, field.startIndex, field.stopIndex, `Duplicate field name: ${field.name} in packet ${packet.name}`)
        );
      } else {
        fieldNames.add(field.name);
      }
      if (field.type === "match") {
        let keys = new Set<string>();
        field.matchPairs.forEach(pair => {
          if (keys.has(pair.key)) {
            this.addSyntaxError(
              new DslSyntaxError(pair.line, pair.startIndex, pair.stopIndex, `Duplicate match key: ${pair.key} in field ${field.name} of packet ${packet.name}`)
            );
          } else {
            keys.add(pair.key);
          }
        });
      }
      if (field.inerObject) {
        this.validatePacket(field.inerObject);
      }
    }
  }

  validate() {
    for (const packet of this.packets) {
      this.validatePacket(packet);
      this.validatePacketField(packet);
    }
    //validate meta data
    for (const meta of this.metaDataMap) {
      this.validateMetaData(meta[1]);
    }
  }
  validateMetaData(meta: MetaData | undefined) {
    if (!meta) {
      return;
    }
    if (basicTypes.has(meta.type)) {
      return;
    }
    if (meta.type.startsWith("char[") && meta.type.endsWith("]")) {
      return;
    }
    if (this.metaDataMap.has(meta.type)) {
      this.validateMetaData(this.metaDataMap.get(meta.type));
    } else {
      this.addSyntaxError(
        new DslSyntaxError(meta.line, meta.startIndex, meta.stopIndex, `Invalid metadata definition: ${meta.type}`)
      );
    }
  }

  getMetaDataType(name: string): string | undefined {
    return this.metaDataMap.get(name)?.basicType;
  }
}

export class Positioned {
  constructor(
    public line: number = 0,
    public startIndex: number = 0,
    public stopIndex: number = 0
  ) { }
}

export class MetaData extends Positioned {
  constructor(
    public name: string,
    public type: string,
    public basicType: string,
    public description: string,
    line: number = 0,
    startIndex: number = 0,
    stopIndex: number = 0
  ) {
    super(line, startIndex, stopIndex);
  }
}

export class Packet extends Positioned {
  constructor(
    public name: string,
    public isRoot: boolean,
    public fields: Field[],
    public matchFields: Record<string, MatchPair[]> = {},
    line: number = 0,
    startIndex: number = 0,
    stopIndex: number = 0
  ) {
    super(line, startIndex, stopIndex);
  }
}

export class Field extends Positioned {
  constructor(
    public name: string,
    public type: string,
    public lengthOfField?: string,
    public isRepeat: boolean = false,
    public inerObject?: Packet,
    public doc: string = "",
    public matchType?: string,
    public checkSumType?: string,
    public matchPairs: MatchPair[] = [],
    line: number = 0,
    startIndex: number = 0,
    stopIndex: number = 0
  ) {
    super(line, startIndex, stopIndex);
  }

  toString(): string {
    return `Field(name: ${this.name}, type: ${this.type}, isRepeat: ${this.isRepeat}, lengthOfField: ${this.lengthOfField}, doc: ${this.doc}, line: ${this.line}, startIndex: ${this.startIndex}, stopIndex: ${this.stopIndex})`;
  }
}

export class MatchPair extends Positioned {
  constructor(public key: string, public value: string, line: number = 0, startIndex: number = 0, stopIndex: number = 0) {
    super(line, startIndex, stopIndex);
  }
}
