import { BinaryModel, Packet } from './model';
import { stripCommentsAndStrings } from './PacketDslNavigation';

export type CompletionKind = 'keyword' | 'type' | 'attribute' | 'metadata' | 'packet' | 'field' | 'option' | 'optionValue' | 'snippet';

export interface DslCompletionItem {
  label: string;
  kind: CompletionKind;
  detail?: string;
}

const topLevelKeywords: DslCompletionItem[] = [
  { label: 'root', kind: 'keyword', detail: 'root packet' },
  { label: 'packet', kind: 'keyword' },
  { label: 'MetaData', kind: 'keyword' },
  { label: 'options', kind: 'keyword' },
];

const fieldStartKeywords: DslCompletionItem[] = [
  { label: 'repeat', kind: 'keyword' },
  { label: 'match', kind: 'keyword', detail: 'match <key> as <name> { ... }' },
];

const attributes: DslCompletionItem[] = [
  { label: '@lengthOf', kind: 'attribute', detail: '@lengthOf(<lenField>)' },
  { label: '@calculatedFrom', kind: 'attribute', detail: '@calculatedFrom("<field1,field2>")' },
  { label: '@leftPad', kind: 'attribute', detail: '@leftPad(\'0\')' },
  { label: '@rightPad', kind: 'attribute', detail: '@rightPad(\'0\')' },
  { label: '@tag', kind: 'attribute', detail: '@tag(<number>)' },
];

const basicTypes: DslCompletionItem[] = [
  'uint8', 'uint16', 'uint32', 'uint64',
  'int8', 'int16', 'int32', 'int64',
  'float32', 'float64',
  'char', 'string',
].map(t => ({ label: t, kind: 'type' as const }));

const fixedStringTypes: DslCompletionItem[] = [
  { label: 'char[N]', kind: 'type', detail: '定长字符串，N 为长度' },
  { label: 'zchar[N]', kind: 'type', detail: '定长字符串（左侧补 0），N 为长度' },
];

// well-known aliases accepted by the grammar (u8 == uint8 etc.)
const typeAliases: DslCompletionItem[] = [
  'u8', 'u16', 'u32', 'u64', 'i8', 'i16', 'i32', 'i64', 'f32', 'f64',
].map(t => ({ label: t, kind: 'type' as const }));

const snippets: DslCompletionItem[] = [
  {
    label: 'packet',
    kind: 'snippet',
    detail: 'packet definition skeleton',
  },
  {
    label: 'root packet',
    kind: 'snippet',
    detail: 'root packet definition skeleton',
  },
  {
    label: 'MetaData',
    kind: 'snippet',
    detail: 'MetaData block skeleton',
  },
  {
    label: 'match',
    kind: 'snippet',
    detail: 'match dispatch block skeleton',
  },
  {
    label: 'options',
    kind: 'snippet',
    detail: 'options block skeleton',
  },
];

export const snippetBodies: Record<string, string> = {
  'packet': 'packet ${1:Name} {\n    uint32 ${2:id} `${3:description}`,\n}',
  'root packet': 'root packet ${1:Name} {\n    uint32 ${2:id} `${3:description}`,\n}',
  'MetaData': 'MetaData ${1:Name} {\n    uint32 ${2:field} `${3:description}`,\n}',
  'match': 'match ${1:key} as ${2:Name} {\n    ${3:1} : ${4:PacketA},\n    ${5:2} : ${6:PacketB},\n}',
  'options': 'options {\n    LittleEndian = ${1|true,false|};\n}',
  'char[N]': 'char[${1:8}]',
  'zchar[N]': 'zchar[${1:8}]',
};

const optionNames: DslCompletionItem[] = [
  { label: 'StringPrefixLenType', kind: 'option', detail: 'u8 | u16 | u32 | u64' },
  { label: 'ArrayPrefixLenType', kind: 'option', detail: 'u8 | u16 | u32 | u64' },
  { label: 'LittleEndian', kind: 'option', detail: 'true | false' },
  { label: 'JavaPackage', kind: 'option', detail: 'package name' },
  { label: 'GoPackage', kind: 'option', detail: 'package name' },
  { label: 'GoModule', kind: 'option', detail: 'module name' },
  { label: 'FixedStringPadFromLeft', kind: 'option', detail: 'true | false' },
  { label: 'FixedStringPadChar', kind: 'option', detail: "'0' | ' '" },
];

const optionValues: Record<string, string[]> = {
  StringPrefixLenType: ['u8', 'u16', 'u32', 'u64'],
  ArrayPrefixLenType: ['u8', 'u16', 'u32', 'u64'],
  LittleEndian: ['true', 'false'],
  FixedStringPadFromLeft: ['true', 'false'],
  FixedStringPadChar: ["'0'", "' '"],
};

/**
 * Compute completion candidates for a cursor position in a DSL document.
 * Pure text/model based so it is testable without a VSCode runtime.
 *
 * Context-aware: nothing inside line comments, no candidates mid-declaration
 * (after a complete type word), types only inside MetaData blocks, top-level
 * keywords at file scope, field names only in attribute argument positions.
 *
 * @param textBeforeCursor full document text up to the cursor
 * @param model parsed model of the document (may be undefined when parse failed)
 */
export function computeCompletions(textBeforeCursor: string, model: BinaryModel | undefined): DslCompletionItem[] {
  const linePrefix = textBeforeCursor.slice(textBeforeCursor.lastIndexOf('\n') + 1);

  // inside a line comment -> no suggestions
  if (linePrefix.includes('//')) {
    return [];
  }

  // completing the argument of @lengthOf(...) / @calculatedFrom("...") -> field names
  const attrArg = linePrefix.match(/@(lengthOf|calculatedFrom)\s*\(\s*("?)([^")]*)$/);
  if (attrArg) {
    return prefixFilter(fieldItems(model, textBeforeCursor), attrArg[3]);
  }

  // "@..." -> field attributes
  if (linePrefix.trimStart().startsWith('@')) {
    return prefixFilter(attributes, linePrefix.trimStart());
  }

  if (isInsideBlock(textBeforeCursor, 'options')) {
    // after `OptionName = ` suggest allowed values
    const eq = linePrefix.indexOf('=');
    if (eq >= 0) {
      const name = linePrefix.slice(0, eq).trim();
      const values = optionValues[name];
      if (values) {
        return prefixFilter(values.map(v => ({ label: v, kind: 'optionValue' as const })), linePrefix.slice(eq + 1).trimStart());
      }
      return [];
    }
    return prefixFilter(optionNames, linePrefix.trimStart());
  }

  if (isInsideBlock(textBeforeCursor, 'match')) {
    // match arms map to packet names
    return prefixFilter(packetItems(model), linePrefix.trimStart());
  }

  // structural position: how many identifiers on the current line?
  const trimmed = linePrefix.trimStart();
  const words = trimmed.length ? trimmed.split(/\s+/) : [];
  if (words.length >= 2) {
    // mid declaration, e.g. "uint32 myfi|" — field names are free-form
    return [];
  }

  // first token on the line: scope decides what can start here
  if (isInsideBlock(textBeforeCursor, 'MetaData')) {
    // MetaData declarations always start with a type
    return prefixFilter([...basicTypes, ...fixedStringTypes, ...typeAliases], trimmed);
  }
  const stripped = textBeforeCursor
    .split('\n')
    .map(stripCommentsAndStrings)
    .join('\n');
  if (braceDepth(stripped) === 0) {
    // file scope: only top-level constructs
    return prefixFilter([...topLevelKeywords, ...snippets], trimmed);
  }
  // packet / inner-object body: a field definition start
  return prefixFilter(
    [
      ...fieldStartKeywords,
      ...basicTypes,
      ...fixedStringTypes,
      ...typeAliases,
      ...metaItems(model),
      ...packetItems(model),
    ],
    trimmed
  );
}

/**
 * Brace depth of the text before the cursor after comments/strings are removed.
 */
function braceDepth(text: string): number {
  let depth = 0;
  for (const ch of text) {
    if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
    }
  }
  return depth;
}

function prefixFilter(items: DslCompletionItem[], prefix: string): DslCompletionItem[] {
  if (!prefix) {
    return items;
  }
  const lower = prefix.toLowerCase();
  return items.filter(i => i.label.toLowerCase().startsWith(lower));
}

function metaItems(model: BinaryModel | undefined): DslCompletionItem[] {
  const names = new Set<string>([
    ...Array.from(model?.metaBlockPositions.keys() ?? []),
    ...Array.from(model?.metaDataMap.keys() ?? []),
  ]);
  return Array.from(names).map(name => ({ label: name, kind: 'metadata' as const }));
}

function packetItems(model: BinaryModel | undefined): DslCompletionItem[] {
  return Array.from(model?.packetMaps.keys() ?? []).map(name => ({ label: name, kind: 'packet' as const }));
}

/**
 * Field names of the packet the cursor currently sits in — used mainly for @lengthOf targets.
 */
function fieldItems(model: BinaryModel | undefined, textBeforeCursor: string): DslCompletionItem[] {
  if (!model) {
    return [];
  }
  const cursorLine = (textBeforeCursor.match(/\n/g) ?? []).length + 1;
  let current: Packet | undefined;
  for (const pkt of model.packets) {
    if (pkt.line <= cursorLine && (!current || pkt.line >= current.line)) {
      current = pkt;
    }
  }
  const names = new Set<string>();
  if (current) {
    for (const f of current.fields) {
      if (f.type !== 'match') {
        names.add(f.name);
      }
    }
  }
  return Array.from(names).map(name => ({ label: name, kind: 'field' as const }));
}

/**
 * Heuristic block detection: true when the last `keyword ... {` before the cursor
 * has no matching `}` after it.
 */
function isInsideBlock(textBeforeCursor: string, keyword: string): boolean {
  const re = new RegExp(`\\b${keyword}\\b[^{]*\\{`, 'g');
  let match: RegExpExecArray | null;
  let last: RegExpExecArray | null = null;
  while ((match = re.exec(textBeforeCursor)) !== null) {
    last = match;
  }
  if (!last) {
    return false;
  }
  const after = textBeforeCursor.slice(last.index + last[0].length);
  // crude brace balance between block start and cursor
  let depth = 1;
  for (const ch of after) {
    if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth <= 0) {
        return false;
      }
    }
  }
  return true;
}
