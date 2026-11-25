import { formatDsl } from "../parser/PacketDslFormattor";

describe('PacketDslFormattor', () => {
  it('formats a simple packet definition', () => {
    const input = `
    packet MyPacket {
      repeat   int32 id \`identifier\`,
      // comment
      string name \`name\`,   // comment
    match MsgType as Payload {
      1  : Logon,
      [2,3]  : Logout,
  },
    }
    `;

    const expected = `packet MyPacket {
    repeat int32 id \`identifier\`,
    // comment
    string name \`name\`,// comment
    match MsgType as Payload {
        1 : Logon,
        [2, 3] : Logout,
    },
}`;

    const output = formatDsl(input);
    expect(output).toBe(expected);
  });

  it('formats with root and comments', () => {
    const input = `// Packet header
    root packet RootPacket {
      int64 time \`timestamp\`, // comment
    }`;

    const output = formatDsl(input);

    expect(output).toContain('root packet RootPacket');
    expect(output).toContain('int64 time \`timestamp\`,');
    expect(output).toContain('// Packet header');
  });

  it('formats metadata section', () => {
    const input = `
    MetaData PriceInfo {
      int64 price \`价格\`,
      int64 quantity \`数量\`,
    }`;

    const output = formatDsl(input);
    expect(output).toContain('MetaData PriceInfo');
    expect(output).toContain('int64 price \`价格\`,');
  });

  it('formats options section', () => {
    const input = `
    options {
      endian = "little";
      align = true;
    }`;

    const output = formatDsl(input);
    expect(output).toContain('options');
    expect(output).toContain('endian = "little";');
    expect(output).toContain('align = true;');
  });

  it('preserves match block', () => {
    const input = `
    packet OrderType {
      match type as Body {
        "1": Limit,
        "2": Market,
      },
    }`;

    const output = formatDsl(input);
    expect(output).toContain('match type');
    expect(output).toContain('"1" : Limit,');
    expect(output).toContain('"2" : Market,');
  });

  it('formats tag and padding attributes', () => {
    const input = `
    packet Tagged {
      @tag(3)
      @rightPad('0')
      char[8] code \`固定长度\`,
    }`;

    const output = formatDsl(input);
    expect(output).toContain("@tag(3)");
    expect(output).toContain("@rightPad('0')");
    expect(output).toContain('char[8] code');
  });

  it('formats metadata with referenced metadata', () => {
    const input = `
    MetaData PriceType {
      int64 value \`价格\`,
    }

    MetaData Quote {
      PriceType price \`引用\`,
    }`;

    const output = formatDsl(input);
    expect(output).toContain('MetaData Quote');
    expect(output).toContain('PriceType price `引用`,');
  });
});