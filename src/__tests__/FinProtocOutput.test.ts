import { parseCompileErrors } from "../parser/FinProtocOutput";

describe('parseCompileErrors', () => {
  it('extracts positioned errors from fin-protoc output', () => {
    const output = [
      'Syntax error at line 12, column 5: Duplicate packet definition: Logon',
      'Syntax error at line 30, column 1: Unknown match value: Foo in field Body of packet Session',
      'found 2 syntax errors',
    ].join('\n');
    const errors = parseCompileErrors(output);
    expect(errors).toHaveLength(2);
    expect(errors[0]).toEqual({ line: 12, col: 5, msg: 'Duplicate packet definition: Logon' });
    expect(errors[1].line).toBe(30);
  });

  it('ignores non-positioned output', () => {
    const output = ['> fin-protoc compile -f demo.pdsl', 'failed to parse file: open demo.pdsl: no such file'].join('\n');
    expect(parseCompileErrors(output)).toHaveLength(0);
  });

  it('returns empty for empty output', () => {
    expect(parseCompileErrors('')).toHaveLength(0);
  });
});
