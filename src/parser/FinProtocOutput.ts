export interface CompileError {
  /** 1-based line reported by fin-protoc */
  line: number;
  /** 1-based column reported by fin-protoc */
  col: number;
  msg: string;
}

const ERROR_LINE_RE = /Syntax error at line (\d+), column (\d+): (.*)/;

/**
 * Parse fin-protoc CLI output into positionable errors.
 * The Go compiler prints one line per model error:
 *   "Syntax error at line 12, column 5: Duplicate packet definition: X"
 * Non-positioned output (generator failures, parse fatal errors) is ignored here
 * and stays visible in the fin-proto output channel.
 */
export function parseCompileErrors(output: string): CompileError[] {
  const errors: CompileError[] = [];
  for (const line of output.split('\n')) {
    const m = ERROR_LINE_RE.exec(line.trim());
    if (m) {
      errors.push({ line: Number(m[1]), col: Number(m[2]), msg: m[3].trim() });
    }
  }
  return errors;
}
