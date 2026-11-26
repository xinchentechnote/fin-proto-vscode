export interface DiagnosticInfo {
  message: string;
  /** 0-based line of the diagnostic start */
  line: number;
  /** 0-based column of the diagnostic start */
  col: number;
}

export interface QuickFixEdit {
  startLine: number;
  startCol: number;
  endLine: number;
  endCol: number;
  newText: string;
}

export interface QuickFix {
  title: string;
  edits: QuickFixEdit[];
}

const TYPE_START_RE = /^(u?int\d*|u\d+|i\d+|f32|f64|float\d*|char|string|zchar|match|repeat)/;

/**
 * Quick fixes derived from fin-proto diagnostics:
 * - "Unknown field type: X"       -> append a MetaData X skeleton
 * - "Unknown match value: X"      -> append a packet X skeleton
 * - ANTLR input errors            -> insert a trailing comma on the previous line
 * Pure text logic so it is testable without a VSCode runtime.
 */
export function buildQuickFixes(diagnostics: DiagnosticInfo[], text: string): QuickFix[] {
  const fixes: QuickFix[] = [];
  const seen = new Set<string>();
  for (const diag of diagnostics) {
    const fix = buildQuickFix(diag, text);
    if (!fix) {
      continue;
    }
    const key = `${fix.title}@${fix.edits[0]?.startLine}:${fix.edits[0]?.startCol}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    fixes.push(fix);
  }
  return fixes;
}

function buildQuickFix(diag: DiagnosticInfo, text: string): QuickFix | undefined {
  const metaMatch = /Unknown field type: ([A-Za-z_][A-Za-z_0-9]*)/.exec(diag.message);
  if (metaMatch) {
    return appendSkeleton(text, `MetaData ${metaMatch[1]} {\n    uint32 field \`描述\`,\n}`, `创建 MetaData "${metaMatch[1]}"`);
  }
  const packetMatch = /Unknown match value: ([A-Za-z_][A-Za-z_0-9]*)/.exec(diag.message);
  if (packetMatch) {
    return appendSkeleton(text, `packet ${packetMatch[1]} {\n    uint32 msgType \`消息类型\`,\n}`, `创建 packet "${packetMatch[1]}"`);
  }
  if (isInputError(diag.message)) {
    return missingCommaFix(diag, text);
  }
  return undefined;
}

function isInputError(message: string): boolean {
  return (
    message.startsWith('mismatched input') ||
    message.startsWith('extraneous input') ||
    message.startsWith('no viable alternative') ||
    message.startsWith('missing')
  );
}

/**
 * A very common typo is a missing trailing comma on the previous field line;
 * ANTLR reports it on the FOLLOWING line. Offer inserting the comma there.
 */
function missingCommaFix(diag: DiagnosticInfo, text: string): QuickFix | undefined {
  const lines = text.split('\n');
  const errorLine = (lines[diag.line] ?? '').trim();
  // the error line should look like a new declaration is starting
  if (!errorLine || !TYPE_START_RE.test(errorLine)) {
    return undefined;
  }
  let prev = diag.line - 1;
  while (prev >= 0 && !lines[prev].trim()) {
    prev--;
  }
  if (prev < 0) {
    return undefined;
  }
  const prevContent = lines[prev].trimEnd();
  if (/[,;{]$/.test(prevContent.trim())) {
    return undefined;
  }
  return {
    title: `在第 ${prev + 1} 行末尾插入逗号`,
    edits: [
      {
        startLine: prev,
        startCol: prevContent.length,
        endLine: prev,
        endCol: prevContent.length,
        newText: ',',
      },
    ],
  };
}

function appendSkeleton(text: string, skeleton: string, title: string): QuickFix {
  const lines = text.split('\n');
  const lastLine = lines.length - 1;
  const lastCol = lines[lastLine].length;
  const prefix = text.endsWith('\n') ? '' : '\n';
  return {
    title,
    edits: [
      {
        startLine: lastLine,
        startCol: lastCol,
        endLine: lastLine,
        endCol: lastCol,
        newText: `${prefix}${skeleton}\n`,
      },
    ],
  };
}
