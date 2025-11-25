import { parsePacketDsl as parsePacketDsl } from "../parser/PacketDslModelParser";
import { BinaryModel } from "../parser/model";

describe('PacketDslModelParser', () => {
  it('should parse a simple packet DSL into BinaryModel', () => {
    const dsl = `
      options {
        LittleEndian = true;
      }

      MetaData DataType {
        uint32 Date \`日期\`,
        int64 Price \`价格\`,
      }

      root packet MyPacket {
        Date,
        Price,
      }
    `;

    const model: BinaryModel = parsePacketDsl(dsl);

    // 测试 metadata
    const dateMeta = model.metaDataMap.get('Date');
    expect(dateMeta).toBeDefined();
    expect(dateMeta!.type).toBe('uint32');
    expect(dateMeta!.description).toBe('日期');

    const priceMeta = model.metaDataMap.get('Price');
    expect(priceMeta).toBeDefined();
    expect(priceMeta!.type).toBe('int64');
    expect(priceMeta!.description).toBe('价格');


    // 测试 options
    expect(model.options.get('endian')).toBe(undefined);
    expect(model.options.get('LittleEndian')).toBe("true");

    // 测试 packet
    expect(model.packets.length).toBe(1);
    const packet = model.packets[0];
    expect(packet.name).toBe('MyPacket');
    expect(packet.isRoot).toBe(true);
    expect(packet.fields.map(f => f.name)).toEqual(['Date', 'Price']);
  });
});
