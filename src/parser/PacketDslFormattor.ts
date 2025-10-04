import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { PacketDslVisitor } from './antlr4/PacketDslVisitor';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { PacketDslLexer } from './antlr4/PacketDslLexer';
import { CheckSumFieldContext, FieldAttributeContext, InerObjectFieldContext, LengthFieldContext, MatchFieldContext, MatchFieldDeclarationContext, MetaDataDeclarationContext, MetaDataDefinitionContext, MetaFieldContext, ObjectFieldContext, OptionDeclarationContext, OptionDefinitionContext, PacketContext, PacketDefinitionContext, PacketDslParser } from './antlr4/PacketDslParser';
import { SyntaxErrorCollector } from './model';
import { FoldingRange } from 'vscode';

export class PacketDslFormattor extends AbstractParseTreeVisitor<string>
  implements PacketDslVisitor<string> {
  private readonly tokenStream: CommonTokenStream;
  private readonly lineComments = new Set<Token>();

  constructor(tokenStream: CommonTokenStream) {
    super();
    this.tokenStream = tokenStream;
  }

  protected defaultResult(): string {
    return '';
  }

  private getHiddenLeft(token: Token | undefined): string {
    const hidden = this.tokenStream.getHiddenTokensToLeft(token!.tokenIndex);
    if (!hidden) { return ''; }
    let comment = hidden
      .filter(t => t.type === PacketDslParser.LINE_COMMENT && !this.lineComments.has(t))
      .map(t => {
        this.lineComments.add(t);
        return t.text;
      }).join('\n');
    if (comment) {
      comment += "\n";
    }
    return comment;
  }

  private getHiddenRightAtSameLine(token: Token | undefined): string {
    const hidden = this.tokenStream.getHiddenTokensToRight(token!.tokenIndex);
    if (!hidden) { return ''; }
    return hidden
      .filter(t => t.type === PacketDslParser.LINE_COMMENT && !this.lineComments.has(t))
      .map(t => {
        if (token?.line === t?.line) {
          // only get right comment when it is in the same line
          this.lineComments.add(t);
          return t.text;
        }
        return "";
      }).join('');
  }

  visitPacket(ctx: PacketContext): string {
    const lines: string[] = [];
    for (const child of ctx.children ?? []) {
      lines.push('\n');
      lines.push('\n');
      if (child instanceof PacketDefinitionContext) {
        lines.push(this.visitPacketDefinition(child));
      } else if (child instanceof MetaDataDefinitionContext) {
        lines.push(this.visitMetaDataDefinition(child));
      } else if (child instanceof OptionDefinitionContext) {
        lines.push(this.visitOptionDefinition(child));
      } else if (child instanceof TerminalNode) {
        lines.push(child.text);
      }
    }

    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('').trim();
  }

  visitPacketDefinition(ctx: PacketDefinitionContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    if (ctx.ROOT()) { lines.push('root '); }
    lines.push(`packet ${ctx.IDENTIFIER()?.text} {\n`);
    for (const fieldWithAttribute of ctx.fieldDefinitionWithAttribute() ?? []) {
      const fwas = fieldWithAttribute.fieldAttribute();
      if (fwas) {
        lines.push(this.formatFieldWithAttribute(fwas));
      }
      const field = fieldWithAttribute.fieldDefinition();
      if (field instanceof MetaFieldContext) {
        lines.push(addIdent4ln(this.visitMetaField(field)));
      }
      if (field instanceof ObjectFieldContext) {
        lines.push(addIdent4ln(this.visitObjectField(field)));
      }
      if (field instanceof InerObjectFieldContext) {
        lines.push(addIdent4ln(this.visitInerObjectField(field)));
      }
      if (field instanceof LengthFieldContext) {
        lines.push(addIdent4ln(this.visitLengthField(field)));
      }
      if (field instanceof CheckSumFieldContext) {
        lines.push(addIdent4ln(this.visitCheckSumField(field)));
      }
      if (field instanceof MatchFieldContext) {
        lines.push(addIdent4ln(this.visitMatchField(field)));
      }
    }
    lines.push('}');
    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('');
  }

  formatFieldWithAttribute(fwas: FieldAttributeContext[]): string {
    const lines: string[] = [];
    for (const fwa of fwas) {
      
    }
    return lines.join('');
  }


  visitLengthField(ctx: LengthFieldContext): string {
    const lfd = ctx.lengthFieldDeclaration();
    let desc = "";
    if (lfd.STRING_LITERAL()) {
      desc = " " + lfd.STRING_LITERAL()?.text;
    }
    let type = "";
    if (lfd.type()) {
      type = lfd.type()?.text + " ";
    }
    return type + lfd._name.text + " @lengthOf(" + lfd.lengthOfAttribute()._from.text + ")" + desc + ",";
  }

  visitCheckSumField(ctx: CheckSumFieldContext): string {
    const cfd = ctx.checkSumFieldDeclaration();
    let desc = "";
    if (cfd.STRING_LITERAL()) {
      desc = " " + cfd.STRING_LITERAL()?.text;
    }
    let type = "";
    if (cfd.type()) {
      type = cfd.type()?.text + " ";
    }
    return type + cfd._name.text + " @calculatedFrom(" + cfd.calculatedFromAttribute()?._from.text + ")" + desc + ",";
  }

  visitOptionDefinition(ctx: OptionDefinitionContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    lines.push('options {\n');
    for (const decl of ctx.optionDeclaration() ?? []) {
      if (decl instanceof OptionDeclarationContext) { lines.push(`    ${this.visitOptionDeclaration(decl)}\n`); }
    }
    lines.push('}');
    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('');
  }

  visitOptionDeclaration(ctx: OptionDeclarationContext): string {
    const name = ctx.IDENTIFIER().text;
    const value = ctx.value().text;
    const semicolon = ctx.SEMICOLON() ? ';' : '';
    return `${name} = ${value}${semicolon}`;
  }

  visitMetaDataDefinition(ctx: MetaDataDefinitionContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    lines.push(`MetaData ${ctx.IDENTIFIER()?.text} {\n`);
    for (const decl of ctx.metaDataDeclaration() ?? []) {
      if (decl instanceof MetaDataDeclarationContext) { lines.push('    ' + this.visitMetaDataDeclaration(decl) + '\n'); }
    }
    lines.push('}');
    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('');
  }

  visitMetaDataDeclaration(ctx: MetaDataDeclarationContext): string {
    let formatted = "";
    if (ctx.type()) {
      formatted += ctx.type()?.text + ' ';
    }
    formatted += ctx._name.text;
    if (ctx.STRING_LITERAL()) {
      formatted += ' ' + ctx.STRING_LITERAL()?.text;
    }
    formatted += ',';
    const lineComment = this.getHiddenRightAtSameLine(ctx.stop);
    return `${formatted}${lineComment ? lineComment : ''}`;
  }

  visitMetaField(ctx: MetaFieldContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    var repeat = "";
    if (ctx.REPEAT()) {
      repeat = 'repeat ';
    }
    lines.push(repeat + this.visitMetaDataDeclaration(ctx.metaDataDeclaration()));
    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('');
  }

  visitObjectField(ctx: ObjectFieldContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    var repeat = "";
    if (ctx.REPEAT()) {
      repeat = 'repeat ';
    }
    lines.push(repeat + ctx.IDENTIFIER().text + (ctx.COMMA()?.text ?? ''));
    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('');
  }

  visitInerObjectField(ctx: InerObjectFieldContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    if (ctx.REPEAT()) { lines.push('repeat '); }
    lines.push(`${ctx.inerObjectDeclaration().IDENTIFIER()?.text} {\n`);
    for (const fd of ctx.inerObjectDeclaration().fieldDefinition() ?? []) {
      lines.push(addIdent4ln(this.visit(fd)));
    }
    lines.push('},');
    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('');
  }


  visitMatchField(ctx: MatchFieldContext): string {
    return this.visitMatchFieldDeclaration(ctx.matchFieldDeclaration()) + ",";
  }

  visitMatchFieldDeclaration(ctx: MatchFieldDeclarationContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    lines.push(`match ${ctx._matchKey.text} as ${ctx._matchName.text} {\n`);
    for (const pair of ctx.matchPair() ?? []) {
      const leftHidden = this.getHiddenLeft(pair.start).trim();
      if (leftHidden) { lines.push(addIdent4ln(leftHidden)); }
      let key = '';
      if (pair.DIGITS()) {
        key = pair.DIGITS()?.text ?? '';
      } else if (pair.STRING()) {
        key = pair.STRING()?.text ?? '';
      } else if (pair.list()) {
        const items: string[] = [];
        for (const num of pair.list()!.DIGITS()) {
          items.push(num.text);
        }
        for (const num of pair.list()!.STRING()) {
          items.push(num.text);
        }
        key = formatStringList(items, 5);
      }
      pair.STRING()?.text ?? pair.DIGITS()?.text ?? '';
      const value = pair.IDENTIFIER()?.text ?? '';
      lines.push(addIdent4ln(`${key} : ${value}${pair.COMMA() ? ',' : ''}`));
      const rightHidden = this.getHiddenRightAtSameLine(pair.stop).trim();
      if (rightHidden) { lines.push(addIdent4ln(rightHidden)); }
    }
    lines.push('}');
    lines.push(this.getHiddenRightAtSameLine(ctx.stop));
    return lines.join('');
  }

  visitTerminal(node: TerminalNode): string {
    return node.text;
  }

  visit(ctx: any): string {
    return super.visit(ctx) ?? '';
  }
}

function formatStringList(values: string[], itemsPerLine: number): string {
  let result = '';

  if (values.length <= itemsPerLine) {
    return `[${values.join(', ')}]`;
  }

  for (let idx = 0; idx < values.length; idx++) {
    if (idx !== 0 && idx % itemsPerLine === 0) {
      result += '\n';
    }
    result += values[idx];
    if (idx !== values.length - 1) {
      result += ',';
      if ((idx + 1) % itemsPerLine !== 0) {
        result += ' ';
      }
    }
  }

  return `[\n${addIdent4ln(result)}]`;
}

function addIdent4ln(value: string): string {
  return addIdent4(value) + "\n";
}

function addIdent4(value: string): string {
  return addIdent(value, 4);
}

function addIdent(value: string, count: number): string {
  const ident = ' '.repeat(count);
  return value.split("\n").map(line => ident + line).join("\n");
}




export function formatDsl(dsl: string): string {
  const inputStream = CharStreams.fromString(dsl);
  const lexer = new PacketDslLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new PacketDslParser(tokenStream);
  parser.removeErrorListeners();
  let collector = new SyntaxErrorCollector();
  parser.addErrorListener(collector);
  const tree = parser.packet();
  if (collector.errors.length > 0) {
    // return origin dsl when syntax error
    console.info("DSL Syntax Errors:\n" + collector.errors.join("\n"));
    return dsl;
  }
  const formatter = new PacketDslFormattor(tokenStream);
  return formatter.visitPacket(tree);
}
