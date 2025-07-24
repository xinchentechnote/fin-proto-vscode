import { ANTLRErrorListener, Token } from "antlr4ts";

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
    // if (this.metaDataMap.has(meta.name)) {
    //   this.addSyntaxError(
    //     new DslSyntaxError(line, start, end, `Duplicate metadata definition: ${meta.name}`)
    //   );
    //   return;
    // }
    this.metaDataMap.set(meta.name, meta);
  }

  addOption(name: string, value: string, line: number, startIndex: number, stopIndex: number) {
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
    public matchPairs: MatchPair[] = [],
    line: number = 0,
    startIndex: number = 0,
    stopIndex: number = 0
  ) {
    super(line, startIndex, stopIndex);
  }
}

export class MatchPair extends Positioned {
  constructor(public key: string, public value: string, line: number = 0, startIndex: number = 0, stopIndex: number = 0) {
    super(line, startIndex, stopIndex);
  }
}
