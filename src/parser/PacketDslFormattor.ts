import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { PacketDslVisitor } from './antlr4/PacketDslVisitor';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { PacketDslLexer } from './antlr4/PacketDslLexer';
import { InerObjectFieldContext, MatchFieldDeclarationContext, MetaDataDeclarationContext, MetaDataDefinitionContext, OptionDeclarationContext, OptionDefinitionContext, PacketContext, PacketDefinitionContext, PacketDslParser } from './antlr4/PacketDslParser';

export class PacketDslFormattor   extends AbstractParseTreeVisitor<string>
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

  private getHiddenLeft(token: Token|undefined): string {
    const hidden = this.tokenStream.getHiddenTokensToLeft(token!.tokenIndex);
    if (!hidden) {return '';}
    return hidden
      .filter(t => t.type === PacketDslParser.LINE_COMMENT && !this.lineComments.has(t))
      .map(t => {
        this.lineComments.add(t);
        return t.text;
      }).join('\n');
  }

  private getHiddenRight(token: Token|undefined): string {
    const hidden = this.tokenStream.getHiddenTokensToRight(token!.tokenIndex);
    if (!hidden) {return '';}
    return hidden
      .filter(t => t.type === PacketDslParser.LINE_COMMENT && !this.lineComments.has(t))
      .map(t => {
        this.lineComments.add(t);
        return t.text;
      }).join('\n');
  }

  visitPacket(ctx: PacketContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));

    for (const child of ctx.children ?? []) {
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

    lines.push('\n' + this.getHiddenRight(ctx.stop));
    return lines.join('').trim();
  }

  visitPacketDefinition(ctx: PacketDefinitionContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    if (ctx.ROOT()) {lines.push('root ');}
    lines.push(`packet ${ctx.IDENTIFIER()?.text} {\n`);
    for (const field of ctx.fieldDefinition() ?? []) {
      lines.push('    ' + this.visit(field) + '\n');
    }
    lines.push('}');
    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('');
  }

  visitOptionDefinition(ctx: OptionDefinitionContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    lines.push('options {\n');
    for (const decl of ctx.optionDeclaration() ?? []) {
      if (decl instanceof OptionDeclarationContext)
        {lines.push(`    ${this.visitOptionDeclaration(decl)}\n`);}
    }
    lines.push('}');
    lines.push(this.getHiddenRight(ctx.stop));
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
      if (decl instanceof MetaDataDeclarationContext)
        {lines.push('    ' + this.visitMetaDataDeclaration(decl) + '\n');}
    }
    lines.push('}');
    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('');
  }

  visitMetaDataDeclaration(ctx: MetaDataDeclarationContext): string {
    const type = ctx.type()?.text ?? '';
    const name = ctx.IDENTIFIER()?.text ?? '';
    const comment = ctx.STRING_LITERAL()?.text ?? '';
    const comma = ctx.COMMA() ? ',' : '';
    const lineComment = this.getHiddenRight(ctx.stop);
    return `${type} ${name} ${comment}${comma}${lineComment ? '\n' + lineComment : ''}`;
  }

  visitInerObjectField(ctx: InerObjectFieldContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    if (ctx.REPEAT()) {lines.push('repeat ');}
    lines.push(`${ctx.inerObjectDeclaration().IDENTIFIER()?.text} {\n`);
    for (const fd of ctx.inerObjectDeclaration().fieldDefinition() ?? []) {
      lines.push('        ' + this.visit(fd) + '\n');
    }
    lines.push('    }');
    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('');
  }

  visitMatchFieldDeclaration(ctx: MatchFieldDeclarationContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    lines.push(`match ${ctx.IDENTIFIER().text} {\n`);
    for (const pair of ctx.matchPair() ?? []) {
      const leftHidden = this.getHiddenLeft(pair.start).trim();
      if (leftHidden) {lines.push('    ' + leftHidden + '\n');}
      const key = pair.STRING()?.text ?? pair.DIGITS()?.text ?? '';
      const value = pair.IDENTIFIER()?.text ?? '';
      lines.push(`    ${key} : ${value}${pair.COMMA() ? ',' : ''}\n`);
      const rightHidden = this.getHiddenRight(pair.stop).trim();
      if (rightHidden) {lines.push('    ' + rightHidden + '\n');}
    }
    lines.push('}');
    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('');
  }

  visitTerminal(node: TerminalNode): string {
    return node.text;
  }

  visit(ctx: any): string {
    return super.visit(ctx) ?? '';
  }
}

export function formatDsl(dsl: string): string {
  const inputStream = CharStreams.fromString(dsl);
  const lexer = new PacketDslLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new PacketDslParser(tokenStream);
  const tree = parser.packet();
  const formatter = new PacketDslFormattor(tokenStream);
  return formatter.visitPacket(tree);
}
