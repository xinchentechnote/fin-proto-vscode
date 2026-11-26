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
    expect(model.syntaxErrors).toHaveLength(0);
  });

  it('parses tag and padding attributes into the model', () => {
    const dsl = `
      root packet Tagged {
        @tag(3)
        @rightPad('0')
        char[8] code \`固定长度字符串\`,
        @tag(5)
        uint32 seq,
      }
    `;
    const model = parsePacketDsl(dsl);
    expect(model.syntaxErrors).toHaveLength(0);

    const code = model.packets[0].fields.find(f => f.name === 'code');
    expect(code).toBeDefined();
    expect(code!.tag).toBe(3);
    expect(code!.paddingAttr).toBe("'0'");
    expect(code!.type).toBe('char[8]');

    const seq = model.packets[0].fields.find(f => f.name === 'seq');
    expect(seq!.tag).toBe(5);
    expect(seq!.paddingAttr).toBeUndefined();
  });

  it('parses prefix lengthOf attribute into the model', () => {
    const dsl = `
      root packet WithLength {
        @lengthOf(body)
        uint16 bodyLen,
        char[] body,
      }
    `;
    const model = parsePacketDsl(dsl);
    expect(model.syntaxErrors).toHaveLength(0);
    const bodyLen = model.packets[0].fields.find(f => f.name === 'bodyLen');
    expect(bodyLen!.lengthOfField).toBe('body');
  });

  it('restricts lengthOf to a single field of the root packet', () => {
    const dup = `
      root packet P {
        @lengthOf(a)
        uint16 l1,
        @lengthOf(b)
        uint16 l2,
        char[] a,
        char[] b,
      }
    `;
    const dupModel = parsePacketDsl(dup);
    expect(dupModel.syntaxErrors.some(e => e.msg.includes('Duplicate LengthOfField'))).toBe(true);

    const nested = `
      packet Inner {
        @lengthOf(x)
        uint16 lx,
        char[] x,
      }
    `;
    const nestedModel = parsePacketDsl(nested);
    expect(nestedModel.syntaxErrors.some(e => e.msg.includes('LengthOfField can only be declared in the root packet'))).toBe(true);
  });

  it('treats MetaData block names as valid composite field types', () => {
    const dsl = `
      MetaData PriceType {
        int64 value \`价格\`,
        zchar[8] symbol \`代码\`,
      }

      root packet QuotePacket {
        PriceType quote,
        UnknownType bad,
      }
    `;
    const model = parsePacketDsl(dsl);
    expect(model.metaBlockPositions.has('PriceType')).toBe(true);

    const errors = model.syntaxErrors.filter(e => e.msg.includes('Unknown field type'));
    expect(errors).toHaveLength(1);
    expect(errors[0].msg).toContain('UnknownType');

    const quote = model.packets[0].fields[0];
    expect(quote.type).toBe('PriceType');
  });

  it('resolves renamed meta references by declared type, not field name', () => {
    const dsl = `
      MetaData DataType {
        uint32 Date \`日期\`,
      }

      root packet MyPacket {
        DataType myDate,
      }
    `;
    const model = parsePacketDsl(dsl);
    expect(model.syntaxErrors).toHaveLength(0);
    const field = model.packets[0].fields[0];
    expect(field.name).toBe('myDate');
    expect(field.type).toBe('DataType');
  });

  it('reports duplicate match values only once', () => {
    const dsl = `
      packet A { uint32 x, }
      packet B { uint32 y, }

      packet Dispatch {
        match type as Body {
          1 : A,
          1 : B,
          2 : UnknownPacket,
        },
      }
    `;
    const model = parsePacketDsl(dsl);
    const dupErrors = model.syntaxErrors.filter(e => e.msg.includes('Duplicate match key'));
    const unknownErrors = model.syntaxErrors.filter(e => e.msg.includes('Unknown match value'));
    expect(dupErrors).toHaveLength(1);
    expect(unknownErrors).toHaveLength(1);
    expect(unknownErrors[0].msg).toContain('UnknownPacket');
  });

  it('validates lengthOf target and match key existence', () => {
    const bad = `
      packet P {
        @lengthOf(missing)
        uint16 len,
        match kind as Body {
          1 : A,
        },
      }
    `;
    const badModel = parsePacketDsl(bad);
    expect(badModel.syntaxErrors.some(e => e.msg.includes('Unknown lengthOf target: missing'))).toBe(true);
    expect(badModel.syntaxErrors.some(e => e.msg.includes('Unknown match key: kind'))).toBe(true);

    const good = `
      packet A { uint32 x, }
      packet P {
        uint32 kind,
        @lengthOf(kind)
        uint16 len,
        match kind as Body {
          1 : A,
        },
      }
    `;
    const goodModel = parsePacketDsl(good);
    expect(goodModel.syntaxErrors.filter(e => e.msg.includes('lengthOf') || e.msg.includes('match key'))).toHaveLength(0);
  });

  it('validates lengthOf target declared after the referencing field', () => {
    const dsl = `
      root packet P {
        @lengthOf(body)
        uint16 len,
        char[] body,
      }
    `;
    const model = parsePacketDsl(dsl);
    expect(model.syntaxErrors.filter(e => e.msg.includes('lengthOf'))).toHaveLength(0);
  });

  it('rejects unknown metadata references', () => {
    const dsl = `
      MetaData Quote {
        Missing meta \`引用了未定义的块\`,
      }
    `;
    const model = parsePacketDsl(dsl);
    expect(model.syntaxErrors.some(e => e.msg.includes('Invalid metadata definition'))).toBe(true);
  });

  it('spans the full offending token in syntax errors', () => {
    const dsl = 'packet Good {\n  uint32 a,\n}\n\npacket Broken {\n  someUnknownKeyword\n}';
    const model = parsePacketDsl(dsl);
    const syntaxErrors = model.syntaxErrors.filter(e => e.msg.length > 0);
    expect(syntaxErrors.length).toBeGreaterThan(0);
    // the error on the last line should cover more than a single character
    const last = syntaxErrors[syntaxErrors.length - 1];
    expect(last.stopIndex - last.startIndex).toBeGreaterThanOrEqual(1);
  });
});
