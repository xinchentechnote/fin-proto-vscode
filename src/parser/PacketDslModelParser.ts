import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { PacketDslLexer } from './antlr4/PacketDslLexer';
import {
  FieldDefinitionContext,
  InerObjectDeclarationContext,
  InerObjectFieldContext,
  ListContext,
  MatchFieldContext,
  MatchFieldDeclarationContext,
  MatchPairContext,
  MetaDataDeclarationContext,
  MetaDataDefinitionContext,
  MetaFieldContext,
  ObjectFieldContext,
  OptionDeclarationContext,
  OptionDefinitionContext,
  PacketContext,
  PacketDefinitionContext,
  PacketDslParser,
  TypeContext,
  ValueContext
} from './antlr4/PacketDslParser';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { PacketDslVisitor } from './antlr4/PacketDslVisitor';
import { BinaryModel, Field, MatchPair, MetaData, Packet } from './model';

export class PacketDslModelParser
  extends AbstractParseTreeVisitor<any>
  implements PacketDslVisitor<any>
{
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
        this.model.addOption(name, value);
      }
    }

    for (const pktDef of ctx.packetDefinition()) {
      this.visitPacketDefinition(pktDef);
    }

    return this.model;
  }

  visitPacketDefinition(ctx: PacketDefinitionContext): BinaryModel {
    const name = ctx.IDENTIFIER().text;
    const isRoot = !!ctx.ROOT();
    const fields: Field[] = [];
    const matchFields: Record<string, MatchPair[]> = {};

    for (const fctx of ctx.fieldDefinition()) {
      const field = this.visitFieldDefinition(fctx);
      fields.push(field);
      if (field.type === 'match') {
        matchFields[field.name] = field.matchPairs;
      }
    }

    const pkt = new Packet(name, isRoot, fields, matchFields);
    this.model.addPacket(pkt);
    return this.model;
  }

  visitFieldDefinition(ctx: FieldDefinitionContext): Field {
    if (ctx instanceof ObjectFieldContext) {
      const name = ctx.IDENTIFIER().text;
      const isRepeat = !!ctx.REPEAT();
      const type = this.model.getMetaDataType(name) || name;
      return new Field(name, type,undefined, isRepeat);
    }

    if (ctx instanceof InerObjectFieldContext) {
      return this.visitInerObjectField(ctx);
    }

    if (ctx instanceof MetaFieldContext) {
      const field = this.visitMetaDataDeclaration(ctx.metaDataDeclaration()!);
      if (ctx.REPEAT()) {
        field.isRepeat = true;
      }
      return field;
    }

    if (ctx instanceof MatchFieldContext) {
      return this.visitMatchFieldDeclaration(ctx.matchFieldDeclaration()!);
    }

    throw new Error(`Unknown FieldDefinitionContext type: ${ctx.constructor.name}`);
  }

  visitInerObjectField(ctx: InerObjectFieldContext): Field {
    const decl = ctx.inerObjectDeclaration();
    const name = decl.IDENTIFIER().text;
    const isRepeat = !!ctx.REPEAT();
    const subFields: Field[] = [];

    for (const sub of decl.fieldDefinition()) {
      subFields.push(this.visitFieldDefinition(sub));
    }

    const pkt = new Packet(name, false, subFields);
    return new Field(name, '', undefined, isRepeat, pkt);
  }

  visitMetaDataDeclaration(ctx: MetaDataDeclarationContext): Field {
    const name = ctx._name.text ?? '';
    const lengthOfField = ctx._from?.text ?? '';
    const typeText = ctx.type()?.text || name;
    const doc = ctx.STRING_LITERAL()?.text?.slice(1, -1) || '';
    const baseType = this.model.getMetaDataType(typeText) || typeText;
    return new Field(name, baseType, lengthOfField, false, undefined, doc);
  }

  visitMatchFieldDeclaration(ctx: MatchFieldDeclarationContext): Field {
    const name = ctx._matchKey.text ?? "";
    const pairs: MatchPair[] = [];

    for (const pair of ctx.matchPair()) {
      pairs.push(...this.visitMatchPair(pair));
    }

    return new Field(name, 'match',undefined, false, undefined, '', name, pairs);
  }

  visitMatchPair(ctx: MatchPairContext): MatchPair[] {
    const val = ctx.IDENTIFIER().text;
    const pairs: MatchPair[] = [];

    if (ctx.DIGITS()) {
      pairs.push(new MatchPair(ctx.DIGITS()!.text, val));
    } else if (ctx.STRING()) {
      pairs.push(new MatchPair(ctx.STRING()!.text, val));
    } else if (ctx.list()) {
      for (const d of ctx.list()!.DIGITS()) {
        pairs.push(new MatchPair(d.text, val));
      }
      for (const s of ctx.list()!.STRING()) {
        pairs.push(new MatchPair(s.text, val));
      }
    }

    return pairs;
  }

  visitMetaDataDefinition(ctx: MetaDataDefinitionContext): void {
    for (const dec of ctx.metaDataDeclaration()) {
      const name = dec._name.text??"";
      const type = dec.type()?.text || name;
      const basicType = type;
      const description = dec.STRING_LITERAL()?.text || '';
      this.model.addMetaData(new MetaData(name, type, basicType, description.slice(1, -1)));
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

  const tree = parser.packet();
  const visitor = new PacketDslModelParser();
  return tree.accept(visitor);
}
