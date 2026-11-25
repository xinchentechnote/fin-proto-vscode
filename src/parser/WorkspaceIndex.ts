import { BinaryModel } from './model';
import { DefinitionTarget } from './PacketDslNavigation';

export interface WorkspaceSymbolHit {
  uri: string;
  name: string;
  kind: 'packet' | 'metaBlock' | 'meta';
  detail: string;
  line: number;
  col: number;
}

/**
 * In-memory index of every parsed packetdsl file in the workspace.
 * Keyed by document uri; models are provided by the extension host which
 * already maintains a per-document parse cache.
 */
export class WorkspaceIndex {
  private files = new Map<string, BinaryModel>();

  update(uri: string, model: BinaryModel): void {
    this.files.set(uri, model);
  }

  remove(uri: string): void {
    this.files.delete(uri);
  }

  get(uri: string): BinaryModel | undefined {
    return this.files.get(uri);
  }

  get size(): number {
    return this.files.size;
  }

  /**
   * Case-insensitive substring search over packets, MetaData blocks and meta
   * entries across all indexed files.
   */
  searchSymbols(query: string, limit = 100): WorkspaceSymbolHit[] {
    const q = query.toLowerCase();
    const hits: WorkspaceSymbolHit[] = [];
    for (const [uri, model] of this.files) {
      for (const pkt of model.packets) {
        if (matches(pkt.name, q)) {
          hits.push({
            uri,
            name: pkt.name,
            kind: 'packet',
            detail: pkt.isRoot ? 'root packet' : 'packet',
            line: pkt.line,
            col: pkt.startIndex,
          });
        }
      }
      for (const [name, pos] of model.metaBlockPositions) {
        if (matches(name, q)) {
          hits.push({ uri, name, kind: 'metaBlock', detail: 'MetaData', line: pos.line, col: pos.col });
        }
      }
      for (const meta of model.metaDataMap.values()) {
        if (matches(meta.name, q)) {
          hits.push({
            uri,
            name: meta.name,
            kind: 'meta',
            detail: meta.type,
            line: meta.nameLine,
            col: meta.nameCol,
          });
        }
      }
      if (hits.length >= limit) {
        return hits.slice(0, limit);
      }
    }
    return hits;
  }

  /**
   * Find a name across the workspace, optionally skipping one file
   * (used as the fallback for go-to-definition when the current document
   * does not contain the definition).
   */
  resolveInWorkspace(word: string, excludeUri?: string): { uri: string; target: DefinitionTarget } | undefined {
    for (const [uri, model] of this.files) {
      if (uri === excludeUri) {
        continue;
      }
      for (const pkt of model.packets) {
        if (pkt.name === word) {
          return {
            uri,
            target: { kind: 'packet', name: pkt.name, line: pkt.line, col: pkt.startIndex, detail: pkt.isRoot ? 'root packet' : 'packet' },
          };
        }
      }
      const pos = model.metaBlockPositions.get(word);
      if (pos) {
        return { uri, target: { kind: 'metaBlock', name: word, line: pos.line, col: pos.col, detail: `MetaData ${word}` } };
      }
      const meta = model.metaDataMap.get(word);
      if (meta) {
        return {
          uri,
          target: { kind: 'meta', name: meta.name, line: meta.nameLine, col: meta.nameCol, detail: `${meta.type} ${meta.name}` },
        };
      }
    }
    return undefined;
  }
}

function matches(name: string, query: string): boolean {
  if (!query) {
    return true;
  }
  return name.toLowerCase().includes(query);
}
