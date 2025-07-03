// Generated from PacketDsl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { InerObjectFieldContext } from "./PacketDslParser";
import { MetaFieldContext } from "./PacketDslParser";
import { ObjectFieldContext } from "./PacketDslParser";
import { MatchFieldContext } from "./PacketDslParser";
import { PacketContext } from "./PacketDslParser";
import { OptionDefinitionContext } from "./PacketDslParser";
import { OptionDeclarationContext } from "./PacketDslParser";
import { PacketDefinitionContext } from "./PacketDslParser";
import { FieldDefinitionContext } from "./PacketDslParser";
import { MetaDataDefinitionContext } from "./PacketDslParser";
import { MetaDataDeclarationContext } from "./PacketDslParser";
import { ValueContext } from "./PacketDslParser";
import { TypeContext } from "./PacketDslParser";
import { MatchFieldDeclarationContext } from "./PacketDslParser";
import { MatchPairContext } from "./PacketDslParser";
import { InerObjectDeclarationContext } from "./PacketDslParser";
import { ListContext } from "./PacketDslParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `PacketDslParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface PacketDslVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `InerObjectField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInerObjectField?: (ctx: InerObjectFieldContext) => Result;

	/**
	 * Visit a parse tree produced by the `MetaField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetaField?: (ctx: MetaFieldContext) => Result;

	/**
	 * Visit a parse tree produced by the `ObjectField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectField?: (ctx: ObjectFieldContext) => Result;

	/**
	 * Visit a parse tree produced by the `MatchField`
	 * labeled alternative in `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMatchField?: (ctx: MatchFieldContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.packet`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPacket?: (ctx: PacketContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.optionDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptionDefinition?: (ctx: OptionDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.optionDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOptionDeclaration?: (ctx: OptionDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.packetDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPacketDefinition?: (ctx: PacketDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.fieldDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFieldDefinition?: (ctx: FieldDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.metaDataDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetaDataDefinition?: (ctx: MetaDataDefinitionContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.metaDataDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetaDataDeclaration?: (ctx: MetaDataDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitType?: (ctx: TypeContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.matchFieldDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMatchFieldDeclaration?: (ctx: MatchFieldDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.matchPair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMatchPair?: (ctx: MatchPairContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.inerObjectDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInerObjectDeclaration?: (ctx: InerObjectDeclarationContext) => Result;

	/**
	 * Visit a parse tree produced by `PacketDslParser.list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList?: (ctx: ListContext) => Result;
}

