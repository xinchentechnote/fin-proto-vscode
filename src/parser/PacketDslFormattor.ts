import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { PacketDslVisitor } from './antlr4/PacketDslVisitor';
import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { PacketDslLexer } from './antlr4/PacketDslLexer';
import { InerObjectFieldContext, MatchFieldContext, MatchFieldDeclarationContext, MetaDataDeclarationContext, MetaDataDefinitionContext, MetaFieldContext, ObjectFieldContext, OptionDeclarationContext, OptionDefinitionContext, PacketContext, PacketDefinitionContext, PacketDslParser } from './antlr4/PacketDslParser';

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
        if(token?.line !== t?.line){
          return '\n' + t.text;
        }
        return t.text;
      }).join('');
  }

  visitPacket(ctx: PacketContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));

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

    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('').trim();
  }

  visitPacketDefinition(ctx: PacketDefinitionContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    if (ctx.ROOT()) {lines.push('root ');}
    lines.push(`packet ${ctx.IDENTIFIER()?.text} {\n`);
    for (const field of ctx.fieldDefinition() ?? []) {
      if(field instanceof MetaFieldContext){
        lines.push(addIdent4ln(this.visitMetaField(field)));
      }
      if(field instanceof ObjectFieldContext){
        lines.push(addIdent4ln(this.visitObjectField(field)));
      }
      if(field instanceof InerObjectFieldContext){
        lines.push(addIdent4ln(this.visitInerObjectField(field)));
      }
      if(field instanceof MatchFieldContext){
        lines.push(addIdent4ln(this.visitMatchField(field)));
      }
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
    let formatted = "";
    if(ctx.type()){
      formatted += ctx.type()?.text + ' ';
    }
    formatted += ctx.IDENTIFIER().text;
    if(ctx.STRING_LITERAL()){
      formatted += ' ' + ctx.STRING_LITERAL()?.text;
    }  
    if(ctx.COMMA()){
      formatted += ctx.COMMA()?.text;
    }
    const lineComment = this.getHiddenRight(ctx.stop);
    return `${formatted}${lineComment ? lineComment : ''}`;
  }

  visitMetaField(ctx: MetaFieldContext) : string {
    const lines:string[]=[];
    lines.push(this.getHiddenLeft(ctx.start));
    var repeat = "";
    if (ctx.REPEAT()){
      repeat = 'repeat ';
    }
    lines.push(repeat + this.visitMetaDataDeclaration(ctx.metaDataDeclaration()));
    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('');
  }

  visitObjectField(ctx: ObjectFieldContext) : string {
    const lines:string[]=[];
    lines.push(this.getHiddenLeft(ctx.start));
    var repeat = "";
    if (ctx.REPEAT()){
      repeat = 'repeat ';
    }
    lines.push(repeat + ctx.IDENTIFIER().text + (ctx.COMMA()?.text ?? ''));
    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('');
  }

  visitInerObjectField(ctx: InerObjectFieldContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    if (ctx.REPEAT()) {lines.push('repeat ');}
    lines.push(`${ctx.inerObjectDeclaration().IDENTIFIER()?.text} {\n`);
    for (const fd of ctx.inerObjectDeclaration().fieldDefinition() ?? []) {
      lines.push(addIdent4ln(this.visit(fd)));
    }
    lines.push('}');
    lines.push(this.getHiddenRight(ctx.stop));
    return lines.join('');
  }


  visitMatchField(ctx: MatchFieldContext): string {
    return this.visitMatchFieldDeclaration(ctx.matchFieldDeclaration()) + (ctx.COMMA() ? ',' : '');
  }

  visitMatchFieldDeclaration(ctx: MatchFieldDeclarationContext): string {
    const lines: string[] = [];
    lines.push(this.getHiddenLeft(ctx.start));
    lines.push(`match ${ctx.IDENTIFIER().text} {\n`);
    for (const pair of ctx.matchPair() ?? []) {
      const leftHidden = this.getHiddenLeft(pair.start).trim();
      if (leftHidden) {lines.push('    ' + leftHidden + '\n');}
      let key = '';
      if(pair.DIGITS()){
        key = pair.DIGITS()?.text ?? '';
      } else if(pair.STRING()){
        key = pair.STRING()?.text ?? '';
      } else if(pair.list()){
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
      const rightHidden = this.getHiddenRight(pair.stop).trim();
      if (rightHidden) {lines.push(addIdent4ln(rightHidden));}
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

function addIdent4ln(value : string): string {
  return addIdent4(value)+"\n";
}

function addIdent4(value : string): string {
  return addIdent(value,4);
}

function addIdent(value : string, count: number): string {
  const ident = ' '.repeat(count);
  return value.split("\n").map(line=>ident+line).join("\n");
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
