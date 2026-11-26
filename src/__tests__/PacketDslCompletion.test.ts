import { computeCompletions, snippetBodies } from "../parser/PacketDslCompletion";
import { parsePacketDsl } from "../parser/PacketDslModelParser";

function parse(text: string) {
  return parsePacketDsl(text);
}

describe('PacketDslCompletion', () => {
  const dsl = `
    MetaData PriceType {
      int64 value \`价格\`,
    }

    packet Logon {
      uint32 seq,
    }

    root packet Session {
      @lengthOf(bodyLen)
      uint16 bodyLen,
      match type as Body {
        1 : Logon,
      },
    }

    options {
      LittleEndian = true;
    }
  `;

  it('suggests attributes when typing @', () => {
    const items = computeCompletions('    @', undefined);
    const labels = items.map(i => i.label);
    expect(labels).toContain('@lengthOf');
    expect(labels).toContain('@calculatedFrom');
    expect(labels).toContain('@tag');
    expect(labels).not.toContain('packet');
  });

  it('suggests option names inside options block', () => {
    const items = computeCompletions(dsl.slice(0, dsl.indexOf('LittleEndian')), undefined);
    const labels = items.map(i => i.label);
    expect(labels).toContain('LittleEndian');
    expect(labels).toContain('StringPrefixLenType');
    expect(labels).not.toContain('@lengthOf');
  });

  it('suggests option values after =', () => {
    const before = dsl.slice(0, dsl.indexOf('true;'));
    const items = computeCompletions(before, undefined);
    expect(items.map(i => i.label)).toEqual(expect.arrayContaining(['true', 'false']));
  });

  it('suggests packet names inside match block', () => {
    const model = parse(dsl);
    const before = dsl.slice(0, dsl.indexOf('1 : Logon'));
    const items = computeCompletions(before, model);
    const labels = items.map(i => i.label);
    expect(labels).toContain('Logon');
    expect(labels).not.toContain('PriceType');
  });

  it('suggests types, metas and packets at field-start position only', () => {
    const model = parse(dsl);
    const before = dsl.slice(0, dsl.indexOf('@lengthOf'));
    const items = computeCompletions(before, model);
    const labels = items.map(i => i.label);
    expect(labels).toContain('uint32');
    expect(labels).toContain('PriceType');
    expect(labels).toContain('Logon');
    expect(labels).toContain('repeat');
    // field names are free-form, so they are not suggested at the type position
    expect(labels).not.toContain('bodyLen');
    expect(labels).not.toContain('seq');
    // 'packet' is a top-level keyword, not valid inside a packet body
    expect(labels).not.toContain('packet');
  });

  it('returns nothing while typing inside a line comment', () => {
    const model = parse(dsl);
    const items = computeCompletions('  // some comment ui', model);
    expect(items).toHaveLength(0);
  });

  it('returns nothing mid-declaration after a complete type word', () => {
    const model = parse(dsl);
    const items = computeCompletions('packet P {\n  uint32 myfi', model);
    expect(items).toHaveLength(0);
  });

  it('suggests only basic types inside MetaData blocks', () => {
    const model = parse(dsl);
    const before = dsl.slice(0, dsl.indexOf('int64 value'));
    const items = computeCompletions(before, model);
    const labels = items.map(i => i.label);
    expect(labels).toContain('uint32');
    expect(labels).toContain('zchar[N]');
    expect(labels).not.toContain('PriceType');
    expect(labels).not.toContain('packet');
  });

  it('suggests only top-level constructs at file scope', () => {
    const items = computeCompletions('', undefined);
    const labels = items.map(i => i.label);
    expect(labels).toContain('packet');
    expect(labels).toContain('MetaData');
    expect(labels).toContain('options');
    expect(labels).not.toContain('uint32');
    expect(labels).not.toContain('repeat');
  });

  it('suggests field names inside lengthOf argument', () => {
    const bodyDsl = `
    packet Session {
      uint16 bodyLen,
      @lengthOf(body
    }`;
    const model = parse(bodyDsl);
    const before = bodyDsl.slice(0, bodyDsl.indexOf('@lengthOf(body') + '@lengthOf(body'.length);
    const items = computeCompletions(before, model);
    const labels = items.map(i => i.label);
    expect(labels).toContain('bodyLen');
    expect(labels).not.toContain('@lengthOf');
  });

  it('every snippet label has a snippet body', () => {
    for (const label of ['packet', 'root packet', 'MetaData', 'match', 'options']) {
      expect(snippetBodies[label]).toBeDefined();
    }
  });
});
