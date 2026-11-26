import { BinaryModel, Field, Packet } from './model';

export type DefinitionKind = 'metaBlock' | 'meta' | 'packet' | 'field';

export interface DefinitionTarget {
  kind: DefinitionKind;
  name: string;
  /** 1-based line of the name token */
  line: number;
  /** 0-based column of the name token */
  col: number;
  /** human readable summary used by hover */
  detail: string;
}

/**
 * Resolve the word under the cursor to its definition inside the same document.
 * Lookup order: field of the packet containing the cursor, meta entry,
 * MetaData block, packet — this keeps inner references (fields, meta usage)
 * ahead of global names when a name collides.
 */
export function resolveDefinition(model: BinaryModel, word: string, cursorLine: number): DefinitionTarget | undefined {
  if (!word) {
    return undefined;
  }
  const packet = findPacketAtLine(model, cursorLine);
  const field = packet ? findFieldDeep(packet, word) : undefined;
  if (field) {
    return { kind: 'field', name: field.name, line: field.nameLine, col: field.nameCol, detail: describeField(field) };
  }

  const meta = model.metaDataMap.get(word);
  if (meta) {
    return {
      kind: 'meta',
      name: meta.name,
      line: meta.nameLine,
      col: meta.nameCol,
      detail: `${meta.type} ${meta.name}${meta.description ? ` — ${meta.description}` : ''}`,
    };
  }

  const blockPos = model.metaBlockPositions.get(word);
  if (blockPos) {
    const entryCount = countMetaEntries(model, word);
    return { kind: 'metaBlock', name: word, line: blockPos.line, col: blockPos.col, detail: `MetaData ${word}（复合类型，${entryCount} 个成员）` };
  }

  const pkt = model.packetMaps.get(word);
  if (pkt) {
    return { kind: 'packet', name: pkt.name, line: pkt.line, col: pkt.startIndex, detail: describePacket(model, pkt) };
  }

  return undefined;
}

export interface FlatSymbol {
  name: string;
  kind: 'packet' | 'metadata' | 'field' | 'match' | 'matchPair' | 'innerObject' | 'options';
  detail?: string;
  line: number;
  col: number;
  children: FlatSymbol[];
}

/**
 * Build the outline tree (packets / MetaData blocks / options and their fields).
 * Plain data so it can be unit tested; the provider maps it to vscode.DocumentSymbol.
 */
export function buildDocumentSymbols(model: BinaryModel, text: string): FlatSymbol[] {
  const symbols: FlatSymbol[] = [];

  for (const meta of model.metaDataMap.values()) {
    // group entries under their MetaData block when the block name is known
    const blockName = findMetaBlockOfLine(model, meta.line);
    const blockPos = blockName ? model.metaBlockPositions.get(blockName) : undefined;
    if (blockPos) {
      let blockSymbol = symbols.find(s => s.kind === 'metadata' && s.line === blockPos.line);
      if (!blockSymbol) {
        blockSymbol = { name: blockName!, kind: 'metadata', detail: 'MetaData', line: blockPos.line, col: blockPos.col, children: [] };
        symbols.push(blockSymbol);
      }
      if (!blockSymbol.children.some(c => c.name === meta.name)) {
        blockSymbol.children.push({ name: meta.name, kind: 'field', detail: `${meta.type}${meta.description ? ` ${meta.description}` : ''}`, line: meta.nameLine, col: meta.nameCol, children: [] });
      }
    } else {
      symbols.push({ name: meta.name, kind: 'field', detail: meta.type, line: meta.nameLine, col: meta.nameCol, children: [] });
    }
  }

  for (const pkt of model.packets) {
    const sym: FlatSymbol = {
      name: pkt.name,
      kind: 'packet',
      detail: pkt.isRoot ? 'root packet' : 'packet',
      line: pkt.line,
      col: pkt.startIndex,
      children: pkt.fields.map(f => fieldToSymbol(f)),
    };
    symbols.push(sym);
  }

  const options = findOptionsBlock(text);
  if (options) {
    symbols.push({ name: 'options', kind: 'options', detail: 'options', line: options.line, col: options.col, children: [] });
  }

  return symbols.sort((a, b) => a.line - b.line || a.col - b.col);
}

function fieldToSymbol(f: Field): FlatSymbol {
  if (f.type === 'match') {
    return {
      name: f.name,
      kind: 'match',
      detail: `match ${f.matchType ?? ''}`,
      line: f.nameLine,
      col: f.nameCol,
      children: f.matchPairs.map(p => ({ name: `${p.key} : ${p.value}`, kind: 'matchPair' as const, line: p.line, col: p.startIndex, children: [] })),
    };
  }
  if (f.inerObject) {
    return {
      name: f.name,
      kind: 'innerObject',
      detail: f.isRepeat ? 'repeat 内嵌对象' : '内嵌对象',
      line: f.nameLine,
      col: f.nameCol,
      children: f.inerObject.fields.map(sub => fieldToSymbol(sub)),
    };
  }
  return { name: f.name, kind: 'field', detail: describeField(f), line: f.nameLine, col: f.nameCol, children: [] };
}

export interface FlatFoldingRange {
  startLine: number;
  endLine: number;
}

/**
 * Line-based brace matching for foldable blocks ({...} of packet/MetaData/match/inner objects).
 * Strips line comments and string literals per line before counting braces.
 */
export function computeFoldingRanges(text: string): FlatFoldingRange[] {
  const lines = text.split('\n');
  const ranges: FlatFoldingRange[] = [];
  const stack: number[] = [];
  lines.forEach((raw, idx) => {
    const line = stripCommentsAndStrings(raw);
    for (const ch of line) {
      if (ch === '{') {
        stack.push(idx);
      } else if (ch === '}') {
        const start = stack.pop();
        if (start !== undefined && idx > start) {
          ranges.push({ startLine: start, endLine: idx });
        }
      }
    }
  });
  return ranges;
}

/**
 * Remove line comments and quoted/backtick strings from a single line so
 * braces inside them are not counted.
 */
export function stripCommentsAndStrings(line: string): string {
  let out = '';
  let inString: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inString) {
      if (ch === inString) {
        inString = null;
      }
      continue;
    }
    if (ch === '"' || ch === '`' || ch === '\'') {
      inString = ch;
      continue;
    }
    if (ch === '/' && line[i + 1] === '/') {
      break;
    }
    out += ch;
  }
  return out;
}

export interface EditSpan {
  /** 1-based line of the occurrence */
  line: number;
  /** 0-based column of the occurrence */
  col: number;
  length: number;
}

export interface ReferenceSpan extends EditSpan {
  kind: 'declaration' | 'reference';
}

/**
 * Collect the declaration and every reference of the symbol under the cursor.
 * References are derived from the model (exact token positions), plus
 * attribute arguments scanned from the raw text:
 * - packet   -> declaration + match pair values
 * - field    -> declaration + match key usages + @lengthOf/@calculatedFrom args
 * - meta/blk -> declaration + declared-type identifiers of fields and meta entries
 */
export function collectReferences(model: BinaryModel, text: string, word: string, cursorLine: number): ReferenceSpan[] {
  if (!isValidIdentifier(word)) {
    return [];
  }
  const target = resolveDefinition(model, word, cursorLine);
  if (!target) {
    return [];
  }
  const spans: ReferenceSpan[] = [{ line: target.line, col: target.col, length: word.length, kind: 'declaration' }];

  if (target.kind === 'packet') {
    forEachMatchPair(model, (pair, _field) => {
      if (pair.value === word && pair.valueLine > 0) {
        spans.push({ line: pair.valueLine, col: pair.valueCol, length: word.length, kind: 'reference' });
      }
    });
  } else if (target.kind === 'field') {
    for (const pkt of model.packets) {
      for (const f of pkt.fields) {
        if (f.type === 'match' && f.matchType === word && f.matchKeyLine > 0) {
          spans.push({ line: f.matchKeyLine, col: f.matchKeyCol, length: word.length, kind: 'reference' });
        }
      }
    }
    for (const span of findAttributeArgReferences(text, word)) {
      spans.push({ ...span, kind: 'reference' });
    }
  } else {
    // metaBlock or meta entry: rename declared-type identifier references
    forEachFieldDeep(model, f => {
      if (f.declaredType === word && f.typeLine > 0) {
        spans.push({ line: f.typeLine, col: f.typeCol, length: word.length, kind: 'reference' });
      }
    });
    for (const meta of model.metaDataMap.values()) {
      if (meta.type === word && meta.typeLine > 0) {
        spans.push({ line: meta.typeLine, col: meta.typeCol, length: word.length, kind: 'reference' });
      }
    }
  }
  return dedupeSpans(spans);
}

/**
 * Every occurrence that must change when renaming the symbol under the cursor.
 */
export function computeRename(model: BinaryModel, text: string, oldName: string, newName: string, cursorLine: number): EditSpan[] {
  if (!isValidIdentifier(newName)) {
    return [];
  }
  return collectReferences(model, text, oldName, cursorLine);
}

/**
 * Returns a human-readable reason when renaming to `newName` would collide
 * with an existing definition in the same namespace, undefined otherwise.
 */
export function detectRenameCollision(model: BinaryModel, word: string, newName: string, cursorLine: number): string | undefined {
  const target = resolveDefinition(model, word, cursorLine);
  if (!target) {
    return undefined;
  }
  switch (target.kind) {
    case 'packet':
      if (model.packetMaps.has(newName)) {
        return `packet "${newName}" 已存在`;
      }
      if (model.metaBlockPositions.has(newName)) {
        return `MetaData 块 "${newName}" 已存在`;
      }
      return undefined;
    case 'metaBlock':
      if (model.metaBlockPositions.has(newName)) {
        return `MetaData 块 "${newName}" 已存在`;
      }
      if (model.packetMaps.has(newName)) {
        return `packet "${newName}" 已存在`;
      }
      return undefined;
    case 'meta':
      if (model.metaDataMap.has(newName)) {
        return `MetaData 字段 "${newName}" 已存在`;
      }
      return undefined;
    default: {
      // field: names must stay unique within their packet
      const owner = findPacketContainingField(model, word, target.line);
      if (!owner) {
        return undefined;
      }
      const clash = (fields: Field[]): boolean =>
        fields.some(f => f.name === newName && !(f.nameLine === target.line && f.name === word)) ||
        fields.some(f => f.inerObject ? clash(f.inerObject.fields) : false);
      if (clash(owner.fields)) {
        return `字段 "${newName}" 在 packet ${owner.name} 中已存在`;
      }
      return undefined;
    }
  }
}

function findPacketContainingField(model: BinaryModel, name: string, declLine: number): Packet | undefined {
  const contains = (fields: Field[]): boolean =>
    fields.some(f => f.name === name && f.nameLine === declLine) ||
    fields.some(f => f.inerObject && contains(f.inerObject.fields));
  return model.packets.find(pkt => contains(pkt.fields));
}

function isValidIdentifier(name: string): boolean {
  return /^[A-Za-z_][A-Za-z_0-9]*$/.test(name);
}

function forEachMatchPair(model: BinaryModel, fn: (pair: import('./model').MatchPair, field: Field) => void): void {
  for (const pkt of model.packets) {
    forEachFieldDeepInPacket(pkt, f => {
      if (f.type === 'match') {
        for (const pair of f.matchPairs) {
          fn(pair, f);
        }
      }
    });
  }
}

function forEachFieldDeep(model: BinaryModel, fn: (f: Field) => void): void {
  for (const pkt of model.packets) {
    forEachFieldDeepInPacket(pkt, fn);
  }
}

function forEachFieldDeepInPacket(packet: Packet, fn: (f: Field) => void): void {
  const walk = (fields: Field[]) => {
    for (const f of fields) {
      fn(f);
      if (f.inerObject) {
        walk(f.inerObject.fields);
      }
    }
  };
  walk(packet.fields);
}

function findAttributeArgReferences(text: string, oldName: string): EditSpan[] {
  const spans: EditSpan[] = [];
  const lineStarts = computeLineStarts(text);
  const offsetToSpan = (offset: number, length: number): EditSpan => {
    let line = 0;
    while (line + 1 < lineStarts.length && lineStarts[line + 1] <= offset) {
      line++;
    }
    return { line: line + 1, col: offset - lineStarts[line], length };
  };

  const lengthOfRe = /@lengthOf\s*\(\s*([A-Za-z_][A-Za-z_0-9]*)\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = lengthOfRe.exec(text)) !== null) {
    if (m[1] === oldName) {
      const argOffset = m.index + m[0].indexOf(m[1]);
      spans.push(offsetToSpan(argOffset, oldName.length));
    }
  }

  const calcRe = /@calculatedFrom\s*\(\s*"([^"]*)"\s*\)/g;
  while ((m = calcRe.exec(text)) !== null) {
    const listOffset = m.index + m[0].indexOf(m[1]);
    let searchFrom = 0;
    for (;;) {
      const rel = m[1].indexOf(oldName, searchFrom);
      if (rel < 0) {
        break;
      }
      const before = rel === 0 || !/[A-Za-z_0-9]/.test(m[1][rel - 1]);
      const after = rel + oldName.length >= m[1].length || !/[A-Za-z_0-9]/.test(m[1][rel + oldName.length]);
      if (before && after) {
        spans.push(offsetToSpan(listOffset + rel, oldName.length));
      }
      searchFrom = rel + 1;
    }
  }
  return spans;
}

function computeLineStarts(text: string): number[] {
  const starts = [0];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      starts.push(i + 1);
    }
  }
  return starts;
}

function dedupeSpans<T extends EditSpan>(spans: T[]): T[] {
  const seen = new Set<string>();
  return spans.filter(s => {
    const key = `${s.line}:${s.col}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function findPacketAtLine(model: BinaryModel, line: number): Packet | undefined {
  let current: Packet | undefined;
  for (const pkt of model.packets) {
    if (pkt.line <= line && (!current || pkt.line >= current.line)) {
      current = pkt;
    }
  }
  return current;
}

function findFieldDeep(packet: Packet, name: string): Field | undefined {
  for (const f of packet.fields) {
    if (f.name === name) {
      return f;
    }
    if (f.inerObject) {
      const inner = findFieldDeep(f.inerObject, name);
      if (inner) {
        return inner;
      }
    }
  }
  return undefined;
}

function findMetaBlockOfLine(model: BinaryModel, line: number): string | undefined {
  let best: string | undefined;
  let bestLine = -1;
  for (const [name, pos] of model.metaBlockPositions) {
    if (pos.line <= line && pos.line > bestLine) {
      best = name;
      bestLine = pos.line;
    }
  }
  return best;
}

function countMetaEntries(model: BinaryModel, blockName: string): number {
  const pos = model.metaBlockPositions.get(blockName);
  if (!pos) {
    return 0;
  }
  // block scope ends where the next MetaData block begins
  let nextBlockLine = Infinity;
  for (const other of model.metaBlockPositions.values()) {
    if (other.line > pos.line && other.line < nextBlockLine) {
      nextBlockLine = other.line;
    }
  }
  let count = 0;
  for (const meta of model.metaDataMap.values()) {
    if (meta.line > pos.line && meta.line < nextBlockLine) {
      count++;
    }
  }
  return count;
}

export function describeField(f: Field): string {
  const parts = [f.type || 'object'];
  if (f.isRepeat) {
    parts.push('repeat');
  }
  if (f.lengthOfField) {
    parts.push(`@lengthOf(${f.lengthOfField})`);
  }
  if (f.checkSumType) {
    parts.push(`@calculatedFrom(${f.checkSumType})`);
  }
  if (f.paddingAttr) {
    parts.push(`padding ${f.paddingAttr}`);
  }
  if (f.tag !== undefined) {
    parts.push(`@tag(${f.tag})`);
  }
  if (f.doc) {
    parts.push(f.doc);
  }
  return parts.join(' · ');
}

function describePacket(model: BinaryModel, pkt: Packet): string {
  const kind = pkt.isRoot ? 'root packet' : 'packet';
  const fieldNames = pkt.fields.map(f => f.name).filter(n => n).slice(0, 8).join(', ');
  return `${kind} ${pkt.name}（${pkt.fields.length} 个字段）${fieldNames ? `\n\n${fieldNames}` : ''}`;
}

function findOptionsBlock(text: string): { line: number; col: number } | undefined {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const col = lines[i].indexOf('options');
    if (col >= 0) {
      return { line: i + 1, col };
    }
  }
  return undefined;
}
