import { CharStreams, CommonTokenStream, Token } from 'antlr4ts';
import { PacketDslLexer } from './antlr4/PacketDslLexer';
import {
  CheckSumFieldContext,
  FieldDefinitionContext,
  InerObjectFieldContext,
  LengthFieldContext,
  MatchFieldContext,
  MatchFieldDeclarationContext,
  MatchPairContext,
  MetaDataDeclarationContext,
  MetaDataDefinitionContext,
  MetaFieldContext,
  ObjectFieldContext,
  PacketContext,
  PacketDefinitionContext,
  PacketDslParser,
  TypeContext,
} from './antlr4/PacketDslParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { PacketDslVisitor } from './antlr4/PacketDslVisitor';
import { BinaryModel, DslSyntaxError, Field, MatchPair, MetaData, Packet, SyntaxErrorCollector } from './model';

export class PacketDslModelParser
  extends AbstractParseTreeVisitor<any>
  implements PacketDslVisitor<any> {
  private model = new BinaryModel();

  public getModel(): BinaryModel {
    return this.model;
  }

  protected defaultResult(): BinaryModel {
    return this.model;
  }

  visitPacket(ctx: PacketContext): BinaryModel {
    for (const metaDef of ctx.metaDataDefinition()) {
      this.visitMetaDataDefinition(metaDef);
    }

    for (const optDef of ctx.optionDefinition()) {
      for (const opt of optDef.optionDeclaration()) {
        const name = opt.IDENTIFIER().text;
        const value = opt.value().text;
        this.model.addOption(name,
          value,
          opt.start.line,
          opt.start.charPositionInLine,
          opt.start.charPositionInLine + (opt.stop?.stopIndex ?? opt.start.startIndex + 1) - opt.start.startIndex);
      }
    }

    for (const pktDef of ctx.packetDefinition()) {
      this.visitPacketDefinition(pktDef);
    }
    this.model.validate();
    return this.model;
  }

  visitPacketDefinition(ctx: PacketDefinitionContext): BinaryModel {
    const name = ctx.IDENTIFIER().text;
    const isRoot = !!ctx.ROOT();
    const fields: Field[] = [];
    const matchFields: Record<string, MatchPair[]> = {};

    for (const fctx of ctx.fieldDefinition()) {
      const field = this.visitFieldDefinition(fctx);
      if (!field) {
        continue;
      }
      fields.push(field);
      if (field.type === 'match') {
        matchFields[field.name] = field.matchPairs;
      }
    }
    let nameToken = ctx.IDENTIFIER().symbol;
    const pkt = new Packet(name, isRoot, fields, matchFields, nameToken.line, nameToken.charPositionInLine, nameToken.charPositionInLine + name.length);
    this.model.addPacket(pkt);
    return this.model;
  }

  visitFieldDefinition(ctx: FieldDefinitionContext): Field | undefined {
    let field: Field;
    if (ctx instanceof ObjectFieldContext) {
      const name = ctx.IDENTIFIER().text;
      const isRepeat = !!ctx.REPEAT();
      const type = this.model.getMetaDataType(name) || name;
      field = new Field(name, type, undefined, isRepeat);
    } else if (ctx instanceof InerObjectFieldContext) {
      field = this.visitInerObjectField(ctx);
    } else if (ctx instanceof LengthFieldContext) {
      field = this.visitLengthField(ctx);
    } else if (ctx instanceof CheckSumFieldContext) {
      field = this.visitCheckSumField(ctx);
    } else if (ctx instanceof MetaFieldContext) {
      field = this.visitMetaDataDeclaration(ctx.metaDataDeclaration()!);
      if (ctx.REPEAT()) {
        field.isRepeat = true;
      }
    } else if (ctx instanceof MatchFieldContext) {
      field = this.visitMatchFieldDeclaration(ctx.matchFieldDeclaration()!);
    } else {
      this.model.addSyntaxError(
        new DslSyntaxError(ctx.start.line, ctx.start.charPositionInLine, ctx.start.charPositionInLine + 1, `Unknown FieldDefinitionContext type: ${ctx.constructor.name}`)
      );
      return undefined;
    }
    field.line = ctx.start.line;
    field.startIndex = ctx.start.charPositionInLine;
    field.stopIndex = ctx.start.charPositionInLine + (ctx.stop?.stopIndex ?? ctx.start.startIndex + 1) - ctx.start.startIndex;
    return field;
  }

  visitLengthField(ctx: LengthFieldContext): Field {
    const lfd = ctx.lengthFieldDeclaration();
    const name = lfd._name.text ?? '';
    const typeText = lfd.type()?.text || name;
    const lengthOfField = lfd._from?.text ?? '';
    const doc = lfd.STRING_LITERAL()?.text?.slice(1, -1) || '';
    const baseType = this.model.getMetaDataType(typeText) || typeText;
    return new Field(name, baseType, lengthOfField, false, undefined, doc);
  }

  visitCheckSumField(ctx: CheckSumFieldContext): Field {
    const lfd = ctx.checkSumFieldDeclaration();
    const name = lfd._name.text ?? '';
    const typeText = lfd.type()?.text || name;
    const checkSumType = lfd._from?.text ?? '';
    const doc = lfd.STRING_LITERAL()?.text?.slice(1, -1) || '';
    const baseType = this.model.getMetaDataType(typeText) || typeText;
    return new Field(name, baseType, undefined, false, undefined, doc, undefined, checkSumType);
  }

  visitInerObjectField(ctx: InerObjectFieldContext): Field {
    const decl = ctx.inerObjectDeclaration();
    const name = decl.IDENTIFIER().text;
    const isRepeat = !!ctx.REPEAT();
    const subFields: Field[] = [];

    for (const sub of decl.fieldDefinition()) {
      let field = this.visitFieldDefinition(sub);
      if (!field) {
        continue;
      }
      subFields.push(field);
    }

    const pkt = new Packet(name, false, subFields);
    return new Field(name, '', undefined, isRepeat, pkt);
  }

  visitMetaDataDeclaration(ctx: MetaDataDeclarationContext): Field {
    const name = ctx._name.text ?? '';
    const typeText = ctx.type()?.text || name;
    const doc = ctx.STRING_LITERAL()?.text?.slice(1, -1) || '';
    const baseType = this.model.getMetaDataType(typeText) || typeText;
    return new Field(name, baseType, undefined, false, undefined, doc);
  }

  visitMatchFieldDeclaration(ctx: MatchFieldDeclarationContext): Field {
    const name = ctx._matchName.text ?? "";
    const matchKey = ctx._matchKey.text ?? "";
    const pairs: MatchPair[] = [];

    for (const pair of ctx.matchPair()) {
      pairs.push(...this.visitMatchPair(pair));
    }

    return new Field(name, 'match', undefined, false, undefined, '', matchKey, undefined, pairs);
  }

  visitMatchPair(ctx: MatchPairContext): MatchPair[] {
    const val = ctx.IDENTIFIER().text;
    const pairs: MatchPair[] = [];
    let position: [number, number, number];
    if (ctx.DIGITS()) {
      position = this.parsePosition(ctx.DIGITS()?.symbol);
      pairs.push(new MatchPair(ctx.DIGITS()!.text, val,
        position[0],
        position[1],
        position[2]));
    } else if (ctx.STRING()) {
      position = this.parsePosition(ctx.DIGITS()?.symbol);
      pairs.push(new MatchPair(ctx.STRING()!.text, val, position[0],
        position[1],
        position[2]));
    } else if (ctx.list()) {
      for (const d of ctx.list()!.DIGITS()) {
        position = this.parsePosition(d.symbol);
        pairs.push(new MatchPair(d.text, val, position[0],
          position[1],
          position[2]));
      }
      for (const s of ctx.list()!.STRING()) {
        position = this.parsePosition(s.symbol);
        pairs.push(new MatchPair(s.text, val, position[0],
          position[1],
          position[2]));
      }
    }
    return pairs;
  }

  parsePosition(symbol: Token | undefined): [number, number, number] {
    if (!symbol) {
      return [0, 0, 0];
    }
    const line = symbol.line;
    const startIndex = symbol.charPositionInLine;
    const stopIndex = startIndex + (symbol.stopIndex ?? symbol.startIndex + 1) - symbol.startIndex;
    return [line, startIndex, stopIndex];
  }

  visitMetaDataDefinition(ctx: MetaDataDefinitionContext): void {
    for (const dec of ctx.metaDataDeclaration()) {
      const name = dec._name.text ?? "";
      const type = dec.type()?.text || name;
      const basicType = type;
      const description = dec.STRING_LITERAL()?.text || '';
      const metadata = new MetaData(
        name,
        type,
        basicType,
        description.slice(1, -1),
        dec.start.line,
        dec.start.charPositionInLine,
        dec.start.charPositionInLine + (dec.stop?.stopIndex ?? dec.start.startIndex + 1) - dec.start.startIndex
      );
      console.log(metadata.name);
      this.model.addMetaData(metadata);
    }
  }

  visitType(_ctx: TypeContext): void {
    // Stub for future type logic
  }
}

export function parsePacketDsl(text: string): BinaryModel {
  const inputStream = CharStreams.fromString(text);
  const lexer = new PacketDslLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new PacketDslParser(tokenStream);
  parser.removeErrorListeners();
  let listener = new SyntaxErrorCollector();
  parser.addErrorListener(listener);
  const tree = parser.packet();
  const visitor = new PacketDslModelParser();
  let binModel = tree.accept(visitor);
  if (listener.errors.length > 0) {
    listener.errors.forEach(e => {
      (binModel as BinaryModel).syntaxErrors.push(e);
    });
    console.info("DSL Syntax Errors:\n" + listener.errors.join("\n"));
  }
  return binModel;
}
