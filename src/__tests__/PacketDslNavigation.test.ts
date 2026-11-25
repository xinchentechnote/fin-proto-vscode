import { buildDocumentSymbols, computeFoldingRanges, resolveDefinition } from "../parser/PacketDslNavigation";
import { parsePacketDsl } from "../parser/PacketDslModelParser";

const dsl = `// demo dsl
MetaData PriceType {
  int64 value \`价格\`,
  zchar[8] symbol \`代码\`,
}

packet Logon {
  uint32 seq \`流水号\`,
  string user,
}

root packet Session {
  @lengthOf(body)
  uint16 bodyLen,
  PriceType quote,
  match type as Body {
    1 : Logon,
  },
}

options {
  LittleEndian = true;
}
`;

const model = () => parsePacketDsl(dsl);

describe('resolveDefinition', () => {
  it('jumps to a MetaData block from a packet field reference', () => {
    // "PriceType quote" is on line 15 (0-based 14)
    const target = resolveDefinition(model(), 'PriceType', 15);
    expect(target).toBeDefined();
    expect(target!.kind).toBe('metaBlock');
    expect(target!.line).toBe(2);
    expect(target!.col).toBe(dsl.split('\n')[1].indexOf('PriceType'));
  });

  it('jumps to a packet from a match value', () => {
    // "1 : Logon" is inside Session, Logon word on line 19
    const target = resolveDefinition(model(), 'Logon', 19);
    expect(target).toBeDefined();
    expect(target!.kind).toBe('packet');
    expect(target!.line).toBe(7);
  });

  it('jumps to a field declaration for lengthOf targets', () => {
    // cursor over "bodyLen" (declared line 14) — field lookup
    const target = resolveDefinition(model(), 'bodyLen', 14);
    expect(target).toBeDefined();
    expect(target!.kind).toBe('field');
    expect(target!.line).toBe(14);
  });

  it('prefers the field in the packet containing the cursor', () => {
    // "seq" belongs to Logon; cursor inside Session should not resolve Logon's field
    const insideSession = resolveDefinition(model(), 'seq', 14);
    expect(insideSession).toBeUndefined();
    const insideLogon = resolveDefinition(model(), 'seq', 9);
    expect(insideLogon).toBeDefined();
    expect(insideLogon!.kind).toBe('field');
  });

  it('resolves meta entries by name', () => {
    const target = resolveDefinition(model(), 'value', 3);
    expect(target).toBeDefined();
    expect(target!.kind).toBe('meta');
    expect(target!.detail).toContain('int64');
  });

  it('returns undefined for keywords and unknown words', () => {
    expect(resolveDefinition(model(), 'uint32', 9)).toBeUndefined();
    expect(resolveDefinition(model(), 'Nonexistent', 9)).toBeUndefined();
  });
});

describe('buildDocumentSymbols', () => {
  it('lists meta blocks, packets and nested fields in line order', () => {
    const symbols = buildDocumentSymbols(model(), dsl);
    const names = symbols.map(s => s.name);
    expect(names).toEqual(['PriceType', 'Logon', 'Session', 'options']);

    const session = symbols.find(s => s.name === 'Session')!;
    expect(session.kind).toBe('packet');
    expect(session.detail).toBe('root packet');
    // `match type as Body` names the dispatch field "Body"; "type" is the match key
    expect(session.children.map(c => c.name)).toEqual(['bodyLen', 'quote', 'Body']);

    const matchField = session.children.find(c => c.name === 'Body')!;
    expect(matchField.kind).toBe('match');
    expect(matchField.children[0].name).toBe('1 : Logon');

    const priceType = symbols.find(s => s.name === 'PriceType')!;
    expect(priceType.kind).toBe('metadata');
    expect(priceType.children.map(c => c.name)).toEqual(['value', 'symbol']);
  });
});

describe('computeFoldingRanges', () => {
  it('finds one range per balanced brace block', () => {
    const ranges = computeFoldingRanges(dsl);
    // MetaData + Logon + Session + match + options blocks
    expect(ranges).toHaveLength(5);
    const startLines = ranges.map(r => r.startLine).sort((a, b) => a - b);
    expect(startLines).toEqual([1, 6, 11, 15, 20]);
  });

  it('ignores braces inside strings and comments', () => {
    const tricky = `packet P {\n  zchar[4] a \`has { brace\`, // } comment\n}`;
    const ranges = computeFoldingRanges(tricky);
    expect(ranges).toHaveLength(1);
    expect(ranges[0]).toEqual({ startLine: 0, endLine: 2 });
  });
});
