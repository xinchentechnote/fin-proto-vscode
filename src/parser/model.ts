export class BinaryModel {
  metaDataMap = new Map<string, MetaData>();
  options = new Map<string, string>();
  packets: Packet[] = [];
  rootPacket?: Packet;

  addMetaData(meta: MetaData) {
    this.metaDataMap.set(meta.name, meta);
  }

  addOption(name: string, value: string) {
    this.options.set(name, value);
  }

  addPacket(packet: Packet) {
    this.packets.push(packet);
    if (packet.isRoot) {
      this.rootPacket = packet;
    }
  }

  getMetaDataType(name: string): string | undefined {
    return this.metaDataMap.get(name)?.basicType;
  }
}

export class MetaData {
  constructor(
    public name: string,
    public type: string,
    public basicType: string,
    public description: string
  ) {}
}

export class Packet {
  constructor(
    public name: string,
    public isRoot: boolean,
    public fields: Field[],
    public matchFields: Record<string, MatchPair[]> = {}
  ) {}
}

export class Field {
  constructor(
    public name: string,
    public type: string,
    public lengthOfField?: string,
    public isRepeat: boolean = false,
    public inerObject?: Packet,
    public doc: string = "",
    public matchType?: string,
    public matchPairs: MatchPair[] = []
  ) {}
}

export class MatchPair {
  constructor(public key: string, public value: string) {}
}
