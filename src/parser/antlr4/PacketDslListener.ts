// Generated from PacketDsl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { InerObjectFieldContext } from "./PacketDslParser";
import { MetaFieldContext } from "./PacketDslParser";
import { ObjectFieldContext } from "./PacketDslParser";
import { LengthFieldContext } from "./PacketDslParser";
import { CheckSumFieldContext } from "./PacketDslParser";
import { MatchFieldContext } from "./PacketDslParser";
import { PacketContext } from "./PacketDslParser";
import { OptionDefinitionContext } from "./PacketDslParser";
import { OptionDeclarationContext } from "./PacketDslParser";
import { PacketDefinitionContext } from "./PacketDslParser";
import { FieldDefinitionWithAttributeContext } from "./PacketDslParser";
import { FieldDefinitionContext } from "./PacketDslParser";
import { MetaDataDefinitionContext } from "./PacketDslParser";
import { LengthFieldDeclarationContext } from "./PacketDslParser";
import { CheckSumFieldDeclarationContext } from "./PacketDslParser";
import { FieldAttributeContext } from "./PacketDslParser";
import { LengthOfAttributeContext } from "./PacketDslParser";
import { CalculatedFromAttributeContext } from "./PacketDslParser";
import { PaddingAttributeContext } from "./PacketDslParser";
import { MetaDataDeclarationContext } from "./PacketDslParser";
import { ValueContext } from "./PacketDslParser";
import { TypeContext } from "./PacketDslParser";
import { MatchFieldDeclarationContext } from "./PacketDslParser";
import { MatchPairContext } from "./PacketDslParser";
import { InerObjectDeclarationContext } from "./PacketDslParser";
import { ListContext } from "./PacketDslParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `PacketDslParser`.
 */
export interface PacketDslListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `InerObjectField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	enterInerObjectField?: (ctx: InerObjectFieldContext) => void;
	/**
	 * Exit a parse tree produced by the `InerObjectField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	exitInerObjectField?: (ctx: InerObjectFieldContext) => void;

	/**
	 * Enter a parse tree produced by the `MetaField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	enterMetaField?: (ctx: MetaFieldContext) => void;
	/**
	 * Exit a parse tree produced by the `MetaField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	exitMetaField?: (ctx: MetaFieldContext) => void;

	/**
	 * Enter a parse tree produced by the `ObjectField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	enterObjectField?: (ctx: ObjectFieldContext) => void;
	/**
	 * Exit a parse tree produced by the `ObjectField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	exitObjectField?: (ctx: ObjectFieldContext) => void;

	/**
	 * Enter a parse tree produced by the `LengthField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	enterLengthField?: (ctx: LengthFieldContext) => void;
	/**
	 * Exit a parse tree produced by the `LengthField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	exitLengthField?: (ctx: LengthFieldContext) => void;

	/**
	 * Enter a parse tree produced by the `CheckSumField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	enterCheckSumField?: (ctx: CheckSumFieldContext) => void;
	/**
	 * Exit a parse tree produced by the `CheckSumField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	exitCheckSumField?: (ctx: CheckSumFieldContext) => void;

	/**
	 * Enter a parse tree produced by the `MatchField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	enterMatchField?: (ctx: MatchFieldContext) => void;
	/**
	 * Exit a parse tree produced by the `MatchField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	exitMatchField?: (ctx: MatchFieldContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.packet`.
	 * @param ctx the parse tree
	 */
	enterPacket?: (ctx: PacketContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.packet`.
	 * @param ctx the parse tree
	 */
	exitPacket?: (ctx: PacketContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.optionDefinition`.
	 * @param ctx the parse tree
	 */
	enterOptionDefinition?: (ctx: OptionDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.optionDefinition`.
	 * @param ctx the parse tree
	 */
	exitOptionDefinition?: (ctx: OptionDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.optionDeclaration`.
	 * @param ctx the parse tree
	 */
	enterOptionDeclaration?: (ctx: OptionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.optionDeclaration`.
	 * @param ctx the parse tree
	 */
	exitOptionDeclaration?: (ctx: OptionDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.packetDefinition`.
	 * @param ctx the parse tree
	 */
	enterPacketDefinition?: (ctx: PacketDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.packetDefinition`.
	 * @param ctx the parse tree
	 */
	exitPacketDefinition?: (ctx: PacketDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.fieldDefinitionWithAttribute`.
	 * @param ctx the parse tree
	 */
	enterFieldDefinitionWithAttribute?: (ctx: FieldDefinitionWithAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.fieldDefinitionWithAttribute`.
	 * @param ctx the parse tree
	 */
	exitFieldDefinitionWithAttribute?: (ctx: FieldDefinitionWithAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	enterFieldDefinition?: (ctx: FieldDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 */
	exitFieldDefinition?: (ctx: FieldDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.metaDataDefinition`.
	 * @param ctx the parse tree
	 */
	enterMetaDataDefinition?: (ctx: MetaDataDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.metaDataDefinition`.
	 * @param ctx the parse tree
	 */
	exitMetaDataDefinition?: (ctx: MetaDataDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.lengthFieldDeclaration`.
	 * @param ctx the parse tree
	 */
	enterLengthFieldDeclaration?: (ctx: LengthFieldDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.lengthFieldDeclaration`.
	 * @param ctx the parse tree
	 */
	exitLengthFieldDeclaration?: (ctx: LengthFieldDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.checkSumFieldDeclaration`.
	 * @param ctx the parse tree
	 */
	enterCheckSumFieldDeclaration?: (ctx: CheckSumFieldDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.checkSumFieldDeclaration`.
	 * @param ctx the parse tree
	 */
	exitCheckSumFieldDeclaration?: (ctx: CheckSumFieldDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.fieldAttribute`.
	 * @param ctx the parse tree
	 */
	enterFieldAttribute?: (ctx: FieldAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.fieldAttribute`.
	 * @param ctx the parse tree
	 */
	exitFieldAttribute?: (ctx: FieldAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.lengthOfAttribute`.
	 * @param ctx the parse tree
	 */
	enterLengthOfAttribute?: (ctx: LengthOfAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.lengthOfAttribute`.
	 * @param ctx the parse tree
	 */
	exitLengthOfAttribute?: (ctx: LengthOfAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.calculatedFromAttribute`.
	 * @param ctx the parse tree
	 */
	enterCalculatedFromAttribute?: (ctx: CalculatedFromAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.calculatedFromAttribute`.
	 * @param ctx the parse tree
	 */
	exitCalculatedFromAttribute?: (ctx: CalculatedFromAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.paddingAttribute`.
	 * @param ctx the parse tree
	 */
	enterPaddingAttribute?: (ctx: PaddingAttributeContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.paddingAttribute`.
	 * @param ctx the parse tree
	 */
	exitPaddingAttribute?: (ctx: PaddingAttributeContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.metaDataDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMetaDataDeclaration?: (ctx: MetaDataDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.metaDataDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMetaDataDeclaration?: (ctx: MetaDataDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.matchFieldDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMatchFieldDeclaration?: (ctx: MatchFieldDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.matchFieldDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMatchFieldDeclaration?: (ctx: MatchFieldDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.matchPair`.
	 * @param ctx the parse tree
	 */
	enterMatchPair?: (ctx: MatchPairContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.matchPair`.
	 * @param ctx the parse tree
	 */
	exitMatchPair?: (ctx: MatchPairContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.inerObjectDeclaration`.
	 * @param ctx the parse tree
	 */
	enterInerObjectDeclaration?: (ctx: InerObjectDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.inerObjectDeclaration`.
	 * @param ctx the parse tree
	 */
	exitInerObjectDeclaration?: (ctx: InerObjectDeclarationContext) => void;

	/**
	 * Enter a parse tree produced by `PacketDslParser.list`.
	 * @param ctx the parse tree
	 */
	enterList?: (ctx: ListContext) => void;
	/**
	 * Exit a parse tree produced by `PacketDslParser.list`.
	 * @param ctx the parse tree
	 */
	exitList?: (ctx: ListContext) => void;
}

