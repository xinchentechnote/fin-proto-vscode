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

function stripCommentsAndStrings(line: string): string {
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
