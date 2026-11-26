import { computeRename, collectReferences, detectRenameCollision } from "../parser/PacketDslNavigation";
import { buildQuickFixes } from "../parser/PacketDslCodeActions";
import { formatDslSegments } from "../parser/PacketDslFormattor";
import { WorkspaceIndex } from "../parser/WorkspaceIndex";
import { parsePacketDsl } from "../parser/PacketDslModelParser";

describe('collectReferences', () => {
  const dsl = `packet Logon {
  uint32 seq,
}

root packet Session {
  @lengthOf(bodyLen)
  uint16 bodyLen,
  match type as Body {
    1 : Logon,
  },
}`;
  const model = () => parsePacketDsl(dsl);

  it('collects declaration and match value references for a packet', () => {
    const refs = collectReferences(model(), dsl, 'Logon', 1);
    expect(refs).toHaveLength(2);
    expect(refs[0].kind).toBe('declaration');
    expect(refs[1].kind).toBe('reference');
    expect(refs[1].line).toBe(9);
  });

  it('collects field references in attribute arguments and match keys', () => {
    const refs = collectReferences(model(), dsl, 'bodyLen', 7);
    expect(refs.map(r => `${r.line}:${r.col}`)).toEqual(['7:9', '6:12']);
    expect(refs[0].kind).toBe('declaration');
    expect(refs[1].kind).toBe('reference');
  });

  it('resolves from a reference position back to the same symbol', () => {
    // cursor on the match value "Logon" (line 9)
    const refs = collectReferences(model(), dsl, 'Logon', 9);
    expect(refs).toHaveLength(2);
    expect(refs[0].line).toBe(1);
  });
});

describe('detectRenameCollision', () => {
  const dsl = `packet A { uint32 x, }
packet B { uint32 y, }
MetaData M { int64 v, }`;
  const model = () => parsePacketDsl(dsl);

  it('detects packet name collisions', () => {
    expect(detectRenameCollision(model(), 'A', 'B', 1)).toContain('已存在');
    expect(detectRenameCollision(model(), 'A', 'M', 1)).toContain('已存在');
    expect(detectRenameCollision(model(), 'A', 'Unique', 1)).toBeUndefined();
  });

  it('detects field name collisions within the same packet only', () => {
    const two = `packet P { uint32 x, string y, }`;
    expect(detectRenameCollision(parsePacketDsl(two), 'x', 'y', 1)).toContain('已存在');
    expect(detectRenameCollision(parsePacketDsl(two), 'x', 'z', 1)).toBeUndefined();
    // same field name in another packet is fine
    expect(detectRenameCollision(model(), 'x', 'y', 1)).toBeUndefined();
  });

  it('detects meta block and entry collisions', () => {
    expect(detectRenameCollision(model(), 'M', 'A', 3)).toContain('已存在');
    expect(detectRenameCollision(model(), 'M', 'N', 3)).toBeUndefined();
  });
});

describe('buildQuickFixes', () => {
  it('offers a MetaData skeleton for unknown field types', () => {
    const text = 'packet P {\n  DataType myDate,\n}';
    const fixes = buildQuickFixes(
      [{ message: 'Unknown field type: DataType in packet P', line: 1, col: 2 }],
      text
    );
    expect(fixes).toHaveLength(1);
    expect(fixes[0].title).toBe('创建 MetaData "DataType"');
    expect(fixes[0].edits[0].newText).toContain('MetaData DataType {');
    expect(fixes[0].edits[0].startLine).toBe(2); // appended at end of document
  });

  it('offers a packet skeleton for unknown match values', () => {
    const text = 'packet P {\n  match t as B {\n    1 : Missing,\n  },\n}';
    const fixes = buildQuickFixes(
      [{ message: 'Unknown match value: Missing in field B of packet P', line: 2, col: 8 }],
      text
    );
    expect(fixes[0].title).toBe('创建 packet "Missing"');
    expect(fixes[0].edits[0].newText).toContain('packet Missing {');
  });

  it('offers a trailing comma fix on the previous field line', () => {
    const text = 'packet P {\n  uint32 a\n  uint32 b,\n}';
    // ANTLR reports the error on line 2 ("uint32 b")
    const fixes = buildQuickFixes(
      [{ message: "mismatched input 'uint32' expecting ','", line: 2, col: 2 }],
      text
    );
    expect(fixes).toHaveLength(1);
    expect(fixes[0].edits[0].startLine).toBe(1);
    expect(fixes[0].edits[0].startCol).toBe(10);
    expect(fixes[0].edits[0].newText).toBe(',');
  });

  it('does not offer the comma fix when a comma is already present', () => {
    const text = 'packet P {\n  uint32 a,\n  uint32 b,\n}';
    const fixes = buildQuickFixes(
      [{ message: "extraneous input 'uint32' expecting...", line: 2, col: 2 }],
      text
    );
    expect(fixes).toHaveLength(0);
  });

  it('ignores unrelated diagnostics', () => {
    const fixes = buildQuickFixes(
      [{ message: 'Duplicate packet definition: A', line: 1, col: 0 }],
      'packet A {}\npacket A {}'
    );
    expect(fixes).toHaveLength(0);
  });
});

describe('WorkspaceIndex', () => {
  const fileA = 'file:///a.pdsl';
  const fileB = 'file:///b.pdsl';

  it('searches packets and metas across files', () => {
    const index = new WorkspaceIndex();
    index.update(fileA, parsePacketDsl(`
      packet Logon { uint32 seq, }
      root packet Session { match type as Body { 1 : Logon, }, }
    `));
    index.update(fileB, parsePacketDsl(`
      MetaData PriceType { int64 value, }
      packet PriceLogon { uint32 seq, }
    `));

    const hits = index.searchSymbols('logon');
    expect(hits.map(h => `${h.uri}#${h.name}`)).toEqual([`${fileA}#Logon`, `${fileB}#PriceLogon`]);
    // within one file packets are indexed before MetaData blocks
    expect(index.searchSymbols('price').map(h => h.name)).toEqual(['PriceLogon', 'PriceType']);
    expect(index.searchSymbols('', 3)).toHaveLength(3);
  });

  it('resolves definitions across files excluding the current one', () => {
    const index = new WorkspaceIndex();
    index.update(fileA, parsePacketDsl('packet Shared { uint32 x, }'));
    index.update(fileB, parsePacketDsl('packet Other { uint32 y, }'));

    const inA = index.resolveInWorkspace('Shared', fileA);
    expect(inA).toBeUndefined();

    const fromB = index.resolveInWorkspace('Shared', fileB);
    expect(fromB!.uri).toBe(fileA);
    expect(fromB!.target.kind).toBe('packet');
    expect(fromB!.target.line).toBe(1);
  });

  it('removes stale files from the index', () => {
    const index = new WorkspaceIndex();
    index.update(fileA, parsePacketDsl('packet X { uint32 x, }'));
    expect(index.size).toBe(1);
    index.remove(fileA);
    expect(index.size).toBe(0);
    expect(index.searchSymbols('X')).toHaveLength(0);
  });
});

describe('computeRename', () => {
  const dsl = `MetaData PriceType {
  int64 value \`价格\`,
}

packet Logon {
  uint32 seq,
}

root packet Session {
  @lengthOf(bodyLen)
  uint16 bodyLen,
  PriceType quote,
  match type as Body {
    1 : Logon,
  },
}`;

  it('renames a packet including match value references', () => {
    const model = parsePacketDsl(dsl);
    // cursor on "Logon" declaration (line 5)
    const spans = computeRename(model, dsl, 'Logon', 'SignOn', 5);
    const positions = spans.map(s => [s.line, s.col]).sort((a, b) => a[0] - b[0]).map(p => p.join(':'));
    expect(positions).toEqual(['5:7', '14:8']);
  });

  it('renames a field including lengthOf target', () => {
    const model = parsePacketDsl(dsl);
    // cursor on "bodyLen" declaration (line 11)
    const spans = computeRename(model, dsl, 'bodyLen', 'payloadLen', 11);
    const positions = spans.map(s => [s.line, s.col]).sort((a, b) => a[0] - b[0]).map(p => p.join(':'));
    // declaration + @lengthOf(bodyLen) argument
    expect(positions).toEqual(['10:12', '11:9']);
  });

  it('renames a field referenced as a match key', () => {
    const matchKeyDsl = `packet P {
  uint32 msgType,
  match msgType as Body {
    1 : Q,
  },
}
packet Q { uint32 x, }`;
    const model = parsePacketDsl(matchKeyDsl);
    // cursor on field "msgType" declaration (line 2)
    const spans = computeRename(model, matchKeyDsl, 'msgType', 'kind', 2);
    expect(spans.map(s => `${s.line}:${s.col}`).sort()).toEqual(['2:9', '3:8']);
  });

  it('renames a MetaData block including declared-type references', () => {
    const model = parsePacketDsl(dsl);
    // cursor on "PriceType" block declaration (line 1)
    const spans = computeRename(model, dsl, 'PriceType', 'PriceInfo', 1);
    const positions = spans.map(s => [s.line, s.col]).sort((a, b) => a[0] - b[0]).map(p => p.join(':'));
    // declaration + "PriceType quote" field type reference
    expect(positions).toEqual(['1:9', '12:2']);
  });

  it('rejects invalid identifiers', () => {
    const model = parsePacketDsl(dsl);
    expect(computeRename(model, dsl, 'Logon', '1bad', 5)).toHaveLength(0);
    expect(computeRename(model, dsl, 'Missing', 'X', 5)).toHaveLength(0);
  });
});

describe('formatDslSegments', () => {
  const dsl = `packet A {
  u32   x,
}

packet B {
   u32    y,
}`;

  it('formats only the segments overlapping the requested range', () => {
    // select only packet B (lines 4-6, 0-based)
    const segments = formatDslSegments(dsl, 3, 6);
    expect(segments).toHaveLength(1);
    expect(segments[0].text).toBe('packet B {\n    u32 y,\n}');
    expect(segments[0].startOffset).toBe(dsl.indexOf('packet B'));
    expect(segments[0].endOffset).toBe(dsl.length);
    // packet A must be untouched
    expect(dsl.slice(0, segments[0].startOffset)).toContain('u32   x,');
  });

  it('formats overlapping segments when the range spans both', () => {
    const segments = formatDslSegments(dsl, 0, 6);
    expect(segments).toHaveLength(2);
  });

  it('returns no segments on syntax errors', () => {
    expect(formatDslSegments('packet Broken { oops', 0, 1)).toHaveLength(0);
  });
});
