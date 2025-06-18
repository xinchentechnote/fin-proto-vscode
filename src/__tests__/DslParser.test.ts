import { parsePacketDsl as parsePacketDsl } from "../parser/PacketDslModelParser";
import { BinaryModel } from "../parser/model";

describe('PacketDslModelParser', () => {
  it('should parse a simple packet DSL into BinaryModel', () => {
    const dsl = `
      options {
        endian = little;
      }

      MetaData DataType {
        uint32 date \`日期\`,
        int64 price \`价格\`,
      }

      root packet MyPacket {
        date,
        price,
      }
    `;

    const model: BinaryModel = parsePacketDsl(dsl);

    // 测试 metadata
    const dateMeta = model.metaDataMap.get('date');
    expect(dateMeta).toBeDefined();
    expect(dateMeta!.type).toBe('uint32');
    expect(dateMeta!.description).toBe('日期');

    const priceMeta = model.metaDataMap.get('price');
    expect(priceMeta).toBeDefined();
    expect(priceMeta!.type).toBe('int64');
    expect(priceMeta!.description).toBe('价格');


    // 测试 options
    expect(model.options.get('endian')).toBe('little');

    // 测试 packet
    expect(model.packets.length).toBe(1);
    const packet = model.packets[0];
    expect(packet.name).toBe('MyPacket');
    expect(packet.isRoot).toBe(true);
    expect(packet.fields.map(f => f.name)).toEqual(['date', 'price']);
  });
});
