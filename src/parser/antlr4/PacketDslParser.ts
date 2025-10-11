// Generated from PacketDsl.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { PacketDslListener } from "./PacketDslListener";
import { PacketDslVisitor } from "./PacketDslVisitor";


export class PacketDslParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly UINT8 = 15;
	public static readonly UINT16 = 16;
	public static readonly UINT32 = 17;
	public static readonly UINT64 = 18;
	public static readonly INT8 = 19;
	public static readonly INT16 = 20;
	public static readonly INT32 = 21;
	public static readonly INT64 = 22;
	public static readonly FLOAT32 = 23;
	public static readonly FLOAT64 = 24;
	public static readonly DIGITS = 25;
	public static readonly STRING = 26;
	public static readonly PADDING_ATTR = 27;
	public static readonly PADDING_CHAR = 28;
	public static readonly ROOT = 29;
	public static readonly PACKET = 30;
	public static readonly REPEAT = 31;
	public static readonly METADATA = 32;
	public static readonly MATCH = 33;
	public static readonly COLON = 34;
	public static readonly COMMA = 35;
	public static readonly SEMICOLON = 36;
	public static readonly IDENTIFIER = 37;
	public static readonly STRING_LITERAL = 38;
	public static readonly LINE_COMMENT = 39;
	public static readonly WS = 40;
	public static readonly RULE_packet = 0;
	public static readonly RULE_optionDefinition = 1;
	public static readonly RULE_optionDeclaration = 2;
	public static readonly RULE_packetDefinition = 3;
	public static readonly RULE_fieldDefinitionWithAttribute = 4;
	public static readonly RULE_fieldDefinition = 5;
	public static readonly RULE_metaDataDefinition = 6;
	public static readonly RULE_lengthFieldDeclaration = 7;
	public static readonly RULE_checkSumFieldDeclaration = 8;
	public static readonly RULE_fieldAttribute = 9;
	public static readonly RULE_calculatedFromAttribute = 10;
	public static readonly RULE_lengthOfAttribute = 11;
	public static readonly RULE_paddingAttribute = 12;
	public static readonly RULE_metaDataDeclaration = 13;
	public static readonly RULE_value = 14;
	public static readonly RULE_type = 15;
	public static readonly RULE_matchFieldDeclaration = 16;
	public static readonly RULE_matchPair = 17;
	public static readonly RULE_inerObjectDeclaration = 18;
	public static readonly RULE_list = 19;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"packet", "optionDefinition", "optionDeclaration", "packetDefinition", 
		"fieldDefinitionWithAttribute", "fieldDefinition", "metaDataDefinition", 
		"lengthFieldDeclaration", "checkSumFieldDeclaration", "fieldAttribute", 
		"calculatedFromAttribute", "lengthOfAttribute", "paddingAttribute", "metaDataDeclaration", 
		"value", "type", "matchFieldDeclaration", "matchPair", "inerObjectDeclaration", 
		"list",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'options'", "'{'", "'}'", "'='", "'@calculatedFrom('", "')'", 
		"'@lengthOf('", "'('", "'string'", "'char'", "'char['", "']'", "'as'", 
		"'['", undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "'root'", "'packet'", "'repeat'", "'MetaData'", "'match'", 
		"':'", "','", "';'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "UINT8", "UINT16", "UINT32", "UINT64", "INT8", "INT16", "INT32", 
		"INT64", "FLOAT32", "FLOAT64", "DIGITS", "STRING", "PADDING_ATTR", "PADDING_CHAR", 
		"ROOT", "PACKET", "REPEAT", "METADATA", "MATCH", "COLON", "COMMA", "SEMICOLON", 
		"IDENTIFIER", "STRING_LITERAL", "LINE_COMMENT", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(PacketDslParser._LITERAL_NAMES, PacketDslParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return PacketDslParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "PacketDsl.g4"; }

	// @Override
	public get ruleNames(): string[] { return PacketDslParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return PacketDslParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(PacketDslParser._ATN, this);
	}
	// @RuleVersion(0)
	public packet(): PacketContext {
		let _localctx: PacketContext = new PacketContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, PacketDslParser.RULE_packet);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 45;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & ((1 << (PacketDslParser.T__0 - 1)) | (1 << (PacketDslParser.ROOT - 1)) | (1 << (PacketDslParser.PACKET - 1)) | (1 << (PacketDslParser.METADATA - 1)))) !== 0)) {
				{
				this.state = 43;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case PacketDslParser.ROOT:
				case PacketDslParser.PACKET:
					{
					this.state = 40;
					this.packetDefinition();
					}
					break;
				case PacketDslParser.METADATA:
					{
					this.state = 41;
					this.metaDataDefinition();
					}
					break;
				case PacketDslParser.T__0:
					{
					this.state = 42;
					this.optionDefinition();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 47;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optionDefinition(): OptionDefinitionContext {
		let _localctx: OptionDefinitionContext = new OptionDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, PacketDslParser.RULE_optionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 48;
			this.match(PacketDslParser.T__0);
			this.state = 49;
			this.match(PacketDslParser.T__1);
			this.state = 53;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PacketDslParser.IDENTIFIER) {
				{
				{
				this.state = 50;
				this.optionDeclaration();
				}
				}
				this.state = 55;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 56;
			this.match(PacketDslParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public optionDeclaration(): OptionDeclarationContext {
		let _localctx: OptionDeclarationContext = new OptionDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, PacketDslParser.RULE_optionDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 58;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 59;
			this.match(PacketDslParser.T__3);
			this.state = 60;
			this.value();
			this.state = 62;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.SEMICOLON) {
				{
				this.state = 61;
				this.match(PacketDslParser.SEMICOLON);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public packetDefinition(): PacketDefinitionContext {
		let _localctx: PacketDefinitionContext = new PacketDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, PacketDslParser.RULE_packetDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.ROOT) {
				{
				this.state = 64;
				this.match(PacketDslParser.ROOT);
				}
			}

			this.state = 67;
			this.match(PacketDslParser.PACKET);
			this.state = 68;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 69;
			this.match(PacketDslParser.T__1);
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__4) | (1 << PacketDslParser.T__6) | (1 << PacketDslParser.T__8) | (1 << PacketDslParser.T__9) | (1 << PacketDslParser.T__10) | (1 << PacketDslParser.UINT8) | (1 << PacketDslParser.UINT16) | (1 << PacketDslParser.UINT32) | (1 << PacketDslParser.UINT64) | (1 << PacketDslParser.INT8) | (1 << PacketDslParser.INT16) | (1 << PacketDslParser.INT32) | (1 << PacketDslParser.INT64) | (1 << PacketDslParser.FLOAT32) | (1 << PacketDslParser.FLOAT64) | (1 << PacketDslParser.PADDING_ATTR) | (1 << PacketDslParser.REPEAT))) !== 0) || _la === PacketDslParser.MATCH || _la === PacketDslParser.IDENTIFIER) {
				{
				{
				this.state = 70;
				this.fieldDefinitionWithAttribute();
				}
				}
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 76;
			this.match(PacketDslParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldDefinitionWithAttribute(): FieldDefinitionWithAttributeContext {
		let _localctx: FieldDefinitionWithAttributeContext = new FieldDefinitionWithAttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, PacketDslParser.RULE_fieldDefinitionWithAttribute);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__4) | (1 << PacketDslParser.T__6) | (1 << PacketDslParser.PADDING_ATTR))) !== 0)) {
				{
				{
				this.state = 78;
				this.fieldAttribute();
				}
				}
				this.state = 83;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 84;
			this.fieldDefinition();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldDefinition(): FieldDefinitionContext {
		let _localctx: FieldDefinitionContext = new FieldDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, PacketDslParser.RULE_fieldDefinition);
		let _la: number;
		try {
			this.state = 106;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				_localctx = new InerObjectFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 87;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 86;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 89;
				this.inerObjectDeclaration();
				this.state = 90;
				this.match(PacketDslParser.COMMA);
				}
				break;

			case 2:
				_localctx = new MetaFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 93;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 92;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 95;
				this.metaDataDeclaration();
				}
				break;

			case 3:
				_localctx = new ObjectFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 97;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 96;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 99;
				this.match(PacketDslParser.IDENTIFIER);
				this.state = 100;
				this.match(PacketDslParser.COMMA);
				}
				break;

			case 4:
				_localctx = new LengthFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 101;
				this.lengthFieldDeclaration();
				}
				break;

			case 5:
				_localctx = new CheckSumFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 102;
				this.checkSumFieldDeclaration();
				}
				break;

			case 6:
				_localctx = new MatchFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 103;
				this.matchFieldDeclaration();
				this.state = 104;
				this.match(PacketDslParser.COMMA);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public metaDataDefinition(): MetaDataDefinitionContext {
		let _localctx: MetaDataDefinitionContext = new MetaDataDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, PacketDslParser.RULE_metaDataDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 108;
			this.match(PacketDslParser.METADATA);
			this.state = 109;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 110;
			this.match(PacketDslParser.T__1);
			this.state = 114;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & ((1 << (PacketDslParser.T__8 - 9)) | (1 << (PacketDslParser.T__9 - 9)) | (1 << (PacketDslParser.T__10 - 9)) | (1 << (PacketDslParser.UINT8 - 9)) | (1 << (PacketDslParser.UINT16 - 9)) | (1 << (PacketDslParser.UINT32 - 9)) | (1 << (PacketDslParser.UINT64 - 9)) | (1 << (PacketDslParser.INT8 - 9)) | (1 << (PacketDslParser.INT16 - 9)) | (1 << (PacketDslParser.INT32 - 9)) | (1 << (PacketDslParser.INT64 - 9)) | (1 << (PacketDslParser.FLOAT32 - 9)) | (1 << (PacketDslParser.FLOAT64 - 9)) | (1 << (PacketDslParser.IDENTIFIER - 9)))) !== 0)) {
				{
				{
				this.state = 111;
				this.metaDataDeclaration();
				}
				}
				this.state = 116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 117;
			this.match(PacketDslParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lengthFieldDeclaration(): LengthFieldDeclarationContext {
		let _localctx: LengthFieldDeclarationContext = new LengthFieldDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, PacketDslParser.RULE_lengthFieldDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 120;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				{
				this.state = 119;
				this.type();
				}
				break;
			}
			this.state = 122;
			_localctx._name = this.match(PacketDslParser.IDENTIFIER);
			this.state = 123;
			this.lengthOfAttribute();
			this.state = 125;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.STRING_LITERAL) {
				{
				this.state = 124;
				this.match(PacketDslParser.STRING_LITERAL);
				}
			}

			this.state = 127;
			this.match(PacketDslParser.COMMA);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public checkSumFieldDeclaration(): CheckSumFieldDeclarationContext {
		let _localctx: CheckSumFieldDeclarationContext = new CheckSumFieldDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, PacketDslParser.RULE_checkSumFieldDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 130;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 129;
				this.type();
				}
				break;
			}
			this.state = 132;
			_localctx._name = this.match(PacketDslParser.IDENTIFIER);
			this.state = 133;
			this.calculatedFromAttribute();
			this.state = 135;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.STRING_LITERAL) {
				{
				this.state = 134;
				this.match(PacketDslParser.STRING_LITERAL);
				}
			}

			this.state = 137;
			this.match(PacketDslParser.COMMA);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldAttribute(): FieldAttributeContext {
		let _localctx: FieldAttributeContext = new FieldAttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, PacketDslParser.RULE_fieldAttribute);
		try {
			this.state = 142;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.T__6:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 139;
				this.lengthOfAttribute();
				}
				break;
			case PacketDslParser.T__4:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 140;
				this.calculatedFromAttribute();
				}
				break;
			case PacketDslParser.PADDING_ATTR:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 141;
				this.paddingAttribute();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public calculatedFromAttribute(): CalculatedFromAttributeContext {
		let _localctx: CalculatedFromAttributeContext = new CalculatedFromAttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, PacketDslParser.RULE_calculatedFromAttribute);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 144;
			this.match(PacketDslParser.T__4);
			this.state = 145;
			_localctx._from = this.match(PacketDslParser.STRING);
			this.state = 146;
			this.match(PacketDslParser.T__5);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lengthOfAttribute(): LengthOfAttributeContext {
		let _localctx: LengthOfAttributeContext = new LengthOfAttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, PacketDslParser.RULE_lengthOfAttribute);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 148;
			this.match(PacketDslParser.T__6);
			this.state = 149;
			_localctx._from = this.match(PacketDslParser.IDENTIFIER);
			this.state = 150;
			this.match(PacketDslParser.T__5);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public paddingAttribute(): PaddingAttributeContext {
		let _localctx: PaddingAttributeContext = new PaddingAttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, PacketDslParser.RULE_paddingAttribute);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 152;
			this.match(PacketDslParser.PADDING_ATTR);
			this.state = 153;
			this.match(PacketDslParser.T__7);
			this.state = 154;
			_localctx._padding = this.match(PacketDslParser.PADDING_CHAR);
			this.state = 155;
			this.match(PacketDslParser.T__5);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public metaDataDeclaration(): MetaDataDeclarationContext {
		let _localctx: MetaDataDeclarationContext = new MetaDataDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, PacketDslParser.RULE_metaDataDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				this.state = 157;
				this.type();
				}
				break;
			}
			this.state = 160;
			_localctx._name = this.match(PacketDslParser.IDENTIFIER);
			this.state = 162;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.STRING_LITERAL) {
				{
				this.state = 161;
				this.match(PacketDslParser.STRING_LITERAL);
				}
			}

			this.state = 164;
			this.match(PacketDslParser.COMMA);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, PacketDslParser.RULE_value);
		try {
			this.state = 169;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.T__8:
			case PacketDslParser.T__9:
			case PacketDslParser.T__10:
			case PacketDslParser.UINT8:
			case PacketDslParser.UINT16:
			case PacketDslParser.UINT32:
			case PacketDslParser.UINT64:
			case PacketDslParser.INT8:
			case PacketDslParser.INT16:
			case PacketDslParser.INT32:
			case PacketDslParser.INT64:
			case PacketDslParser.FLOAT32:
			case PacketDslParser.FLOAT64:
			case PacketDslParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 166;
				this.type();
				}
				break;
			case PacketDslParser.STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 167;
				this.match(PacketDslParser.STRING);
				}
				break;
			case PacketDslParser.DIGITS:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 168;
				this.match(PacketDslParser.DIGITS);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public type(): TypeContext {
		let _localctx: TypeContext = new TypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, PacketDslParser.RULE_type);
		let _la: number;
		try {
			this.state = 189;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 171;
				this.match(PacketDslParser.IDENTIFIER);
				}
				break;
			case PacketDslParser.UINT8:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 172;
				this.match(PacketDslParser.UINT8);
				}
				break;
			case PacketDslParser.UINT16:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 173;
				this.match(PacketDslParser.UINT16);
				}
				break;
			case PacketDslParser.UINT32:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 174;
				this.match(PacketDslParser.UINT32);
				}
				break;
			case PacketDslParser.UINT64:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 175;
				this.match(PacketDslParser.UINT64);
				}
				break;
			case PacketDslParser.INT8:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 176;
				this.match(PacketDslParser.INT8);
				}
				break;
			case PacketDslParser.INT16:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 177;
				this.match(PacketDslParser.INT16);
				}
				break;
			case PacketDslParser.INT32:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 178;
				this.match(PacketDslParser.INT32);
				}
				break;
			case PacketDslParser.INT64:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 179;
				this.match(PacketDslParser.INT64);
				}
				break;
			case PacketDslParser.FLOAT32:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 180;
				this.match(PacketDslParser.FLOAT32);
				}
				break;
			case PacketDslParser.FLOAT64:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 181;
				this.match(PacketDslParser.FLOAT64);
				}
				break;
			case PacketDslParser.T__8:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 182;
				this.match(PacketDslParser.T__8);
				}
				break;
			case PacketDslParser.T__9:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 183;
				this.match(PacketDslParser.T__9);
				}
				break;
			case PacketDslParser.T__10:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 184;
				this.match(PacketDslParser.T__10);
				this.state = 186;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.DIGITS) {
					{
					this.state = 185;
					this.match(PacketDslParser.DIGITS);
					}
				}

				this.state = 188;
				this.match(PacketDslParser.T__11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchFieldDeclaration(): MatchFieldDeclarationContext {
		let _localctx: MatchFieldDeclarationContext = new MatchFieldDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, PacketDslParser.RULE_matchFieldDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			this.match(PacketDslParser.MATCH);
			this.state = 192;
			_localctx._matchKey = this.match(PacketDslParser.IDENTIFIER);
			this.state = 193;
			this.match(PacketDslParser.T__12);
			this.state = 194;
			_localctx._matchName = this.match(PacketDslParser.IDENTIFIER);
			this.state = 195;
			this.match(PacketDslParser.T__1);
			this.state = 197;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 196;
				this.matchPair();
				}
				}
				this.state = 199;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__13) | (1 << PacketDslParser.DIGITS) | (1 << PacketDslParser.STRING))) !== 0));
			this.state = 201;
			this.match(PacketDslParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public matchPair(): MatchPairContext {
		let _localctx: MatchPairContext = new MatchPairContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, PacketDslParser.RULE_matchPair);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 206;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.DIGITS:
				{
				this.state = 203;
				this.match(PacketDslParser.DIGITS);
				}
				break;
			case PacketDslParser.STRING:
				{
				this.state = 204;
				this.match(PacketDslParser.STRING);
				}
				break;
			case PacketDslParser.T__13:
				{
				this.state = 205;
				this.list();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 208;
			this.match(PacketDslParser.COLON);
			this.state = 209;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 211;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.COMMA) {
				{
				this.state = 210;
				this.match(PacketDslParser.COMMA);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public inerObjectDeclaration(): InerObjectDeclarationContext {
		let _localctx: InerObjectDeclarationContext = new InerObjectDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, PacketDslParser.RULE_inerObjectDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 213;
			this.match(PacketDslParser.IDENTIFIER);
			{
			this.state = 214;
			this.match(PacketDslParser.T__1);
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 215;
				this.fieldDefinition();
				}
				}
				this.state = 218;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 9)) & ~0x1F) === 0 && ((1 << (_la - 9)) & ((1 << (PacketDslParser.T__8 - 9)) | (1 << (PacketDslParser.T__9 - 9)) | (1 << (PacketDslParser.T__10 - 9)) | (1 << (PacketDslParser.UINT8 - 9)) | (1 << (PacketDslParser.UINT16 - 9)) | (1 << (PacketDslParser.UINT32 - 9)) | (1 << (PacketDslParser.UINT64 - 9)) | (1 << (PacketDslParser.INT8 - 9)) | (1 << (PacketDslParser.INT16 - 9)) | (1 << (PacketDslParser.INT32 - 9)) | (1 << (PacketDslParser.INT64 - 9)) | (1 << (PacketDslParser.FLOAT32 - 9)) | (1 << (PacketDslParser.FLOAT64 - 9)) | (1 << (PacketDslParser.REPEAT - 9)) | (1 << (PacketDslParser.MATCH - 9)) | (1 << (PacketDslParser.IDENTIFIER - 9)))) !== 0));
			this.state = 220;
			this.match(PacketDslParser.T__2);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public list(): ListContext {
		let _localctx: ListContext = new ListContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, PacketDslParser.RULE_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 222;
			this.match(PacketDslParser.T__13);
			this.state = 223;
			_la = this._input.LA(1);
			if (!(_la === PacketDslParser.DIGITS || _la === PacketDslParser.STRING)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 228;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PacketDslParser.COMMA) {
				{
				{
				this.state = 224;
				this.match(PacketDslParser.COMMA);
				this.state = 225;
				_la = this._input.LA(1);
				if (!(_la === PacketDslParser.DIGITS || _la === PacketDslParser.STRING)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				}
				this.state = 230;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 231;
			this.match(PacketDslParser.T__11);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03*\xEC\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x03\x02\x03\x02\x03\x02\x07\x02" +
		".\n\x02\f\x02\x0E\x021\v\x02\x03\x03\x03\x03\x03\x03\x07\x036\n\x03\f" +
		"\x03\x0E\x039\v\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x05" +
		"\x04A\n\x04\x03\x05\x05\x05D\n\x05\x03\x05\x03\x05\x03\x05\x03\x05\x07" +
		"\x05J\n\x05\f\x05\x0E\x05M\v\x05\x03\x05\x03\x05\x03\x06\x07\x06R\n\x06" +
		"\f\x06\x0E\x06U\v\x06\x03\x06\x03\x06\x03\x07\x05\x07Z\n\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x05\x07`\n\x07\x03\x07\x03\x07\x05\x07d\n\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07m\n\x07\x03" +
		"\b\x03\b\x03\b\x03\b\x07\bs\n\b\f\b\x0E\bv\v\b\x03\b\x03\b\x03\t\x05\t" +
		"{\n\t\x03\t\x03\t\x03\t\x05\t\x80\n\t\x03\t\x03\t\x03\n\x05\n\x85\n\n" +
		"\x03\n\x03\n\x03\n\x05\n\x8A\n\n\x03\n\x03\n\x03\v\x03\v\x03\v\x05\v\x91" +
		"\n\v\x03\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0E\x03\x0E\x03\x0F\x05\x0F\xA1\n\x0F\x03\x0F\x03\x0F\x05\x0F" +
		"\xA5\n\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x05\x10\xAC\n\x10\x03" +
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x05\x11\xBD\n\x11\x03\x11" +
		"\x05\x11\xC0\n\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x06" +
		"\x12\xC8\n\x12\r\x12\x0E\x12\xC9\x03\x12\x03\x12\x03\x13\x03\x13\x03\x13" +
		"\x05\x13\xD1\n\x13\x03\x13\x03\x13\x03\x13\x05\x13\xD6\n\x13\x03\x14\x03" +
		"\x14\x03\x14\x06\x14\xDB\n\x14\r\x14\x0E\x14\xDC\x03\x14\x03\x14\x03\x15" +
		"\x03\x15\x03\x15\x03\x15\x07\x15\xE5\n\x15\f\x15\x0E\x15\xE8\v\x15\x03" +
		"\x15\x03\x15\x03\x15\x02\x02\x02\x16\x02\x02\x04\x02\x06\x02\b\x02\n\x02" +
		"\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02" +
		"\x1E\x02 \x02\"\x02$\x02&\x02(\x02\x02\x03\x03\x02\x1B\x1C\x02\u0106\x02" +
		"/\x03\x02\x02\x02\x042\x03\x02\x02\x02\x06<\x03\x02\x02\x02\bC\x03\x02" +
		"\x02\x02\nS\x03\x02\x02\x02\fl\x03\x02\x02\x02\x0En\x03\x02\x02\x02\x10" +
		"z\x03\x02\x02\x02\x12\x84\x03\x02\x02\x02\x14\x90\x03\x02\x02\x02\x16" +
		"\x92\x03\x02\x02\x02\x18\x96\x03\x02\x02\x02\x1A\x9A\x03\x02\x02\x02\x1C" +
		"\xA0\x03\x02\x02\x02\x1E\xAB\x03\x02\x02\x02 \xBF\x03\x02\x02\x02\"\xC1" +
		"\x03\x02\x02\x02$\xD0\x03\x02\x02\x02&\xD7\x03\x02\x02\x02(\xE0\x03\x02" +
		"\x02\x02*.\x05\b\x05\x02+.\x05\x0E\b\x02,.\x05\x04\x03\x02-*\x03\x02\x02" +
		"\x02-+\x03\x02\x02\x02-,\x03\x02\x02\x02.1\x03\x02\x02\x02/-\x03\x02\x02" +
		"\x02/0\x03\x02\x02\x020\x03\x03\x02\x02\x021/\x03\x02\x02\x0223\x07\x03" +
		"\x02\x0237\x07\x04\x02\x0246\x05\x06\x04\x0254\x03\x02\x02\x0269\x03\x02" +
		"\x02\x0275\x03\x02\x02\x0278\x03\x02\x02\x028:\x03\x02\x02\x0297\x03\x02" +
		"\x02\x02:;\x07\x05\x02\x02;\x05\x03\x02\x02\x02<=\x07\'\x02\x02=>\x07" +
		"\x06\x02\x02>@\x05\x1E\x10\x02?A\x07&\x02\x02@?\x03\x02\x02\x02@A\x03" +
		"\x02\x02\x02A\x07\x03\x02\x02\x02BD\x07\x1F\x02\x02CB\x03\x02\x02\x02" +
		"CD\x03\x02\x02\x02DE\x03\x02\x02\x02EF\x07 \x02\x02FG\x07\'\x02\x02GK" +
		"\x07\x04\x02\x02HJ\x05\n\x06\x02IH\x03\x02\x02\x02JM\x03\x02\x02\x02K" +
		"I\x03\x02\x02\x02KL\x03\x02\x02\x02LN\x03\x02\x02\x02MK\x03\x02\x02\x02" +
		"NO\x07\x05\x02\x02O\t\x03\x02\x02\x02PR\x05\x14\v\x02QP\x03\x02\x02\x02" +
		"RU\x03\x02\x02\x02SQ\x03\x02\x02\x02ST\x03\x02\x02\x02TV\x03\x02\x02\x02" +
		"US\x03\x02\x02\x02VW\x05\f\x07\x02W\v\x03\x02\x02\x02XZ\x07!\x02\x02Y" +
		"X\x03\x02\x02\x02YZ\x03\x02\x02\x02Z[\x03\x02\x02\x02[\\\x05&\x14\x02" +
		"\\]\x07%\x02\x02]m\x03\x02\x02\x02^`\x07!\x02\x02_^\x03\x02\x02\x02_`" +
		"\x03\x02\x02\x02`a\x03\x02\x02\x02am\x05\x1C\x0F\x02bd\x07!\x02\x02cb" +
		"\x03\x02\x02\x02cd\x03\x02\x02\x02de\x03\x02\x02\x02ef\x07\'\x02\x02f" +
		"m\x07%\x02\x02gm\x05\x10\t\x02hm\x05\x12\n\x02ij\x05\"\x12\x02jk\x07%" +
		"\x02\x02km\x03\x02\x02\x02lY\x03\x02\x02\x02l_\x03\x02\x02\x02lc\x03\x02" +
		"\x02\x02lg\x03\x02\x02\x02lh\x03\x02\x02\x02li\x03\x02\x02\x02m\r\x03" +
		"\x02\x02\x02no\x07\"\x02\x02op\x07\'\x02\x02pt\x07\x04\x02\x02qs\x05\x1C" +
		"\x0F\x02rq\x03\x02\x02\x02sv\x03\x02\x02\x02tr\x03\x02\x02\x02tu\x03\x02" +
		"\x02\x02uw\x03\x02\x02\x02vt\x03\x02\x02\x02wx\x07\x05\x02\x02x\x0F\x03" +
		"\x02\x02\x02y{\x05 \x11\x02zy\x03\x02\x02\x02z{\x03\x02\x02\x02{|\x03" +
		"\x02\x02\x02|}\x07\'\x02\x02}\x7F\x05\x18\r\x02~\x80\x07(\x02\x02\x7F" +
		"~\x03\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x80\x81\x03\x02\x02\x02\x81" +
		"\x82\x07%\x02\x02\x82\x11\x03\x02\x02\x02\x83\x85\x05 \x11\x02\x84\x83" +
		"\x03\x02\x02\x02\x84\x85\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86\x87" +
		"\x07\'\x02\x02\x87\x89\x05\x16\f\x02\x88\x8A\x07(\x02\x02\x89\x88\x03" +
		"\x02\x02\x02\x89\x8A\x03\x02\x02\x02\x8A\x8B\x03\x02\x02\x02\x8B\x8C\x07" +
		"%\x02\x02\x8C\x13\x03\x02\x02\x02\x8D\x91\x05\x18\r\x02\x8E\x91\x05\x16" +
		"\f\x02\x8F\x91\x05\x1A\x0E\x02\x90\x8D\x03\x02\x02\x02\x90\x8E\x03\x02" +
		"\x02\x02\x90\x8F\x03\x02\x02\x02\x91\x15\x03\x02\x02\x02\x92\x93\x07\x07" +
		"\x02\x02\x93\x94\x07\x1C\x02\x02\x94\x95\x07\b\x02\x02\x95\x17\x03\x02" +
		"\x02\x02\x96\x97\x07\t\x02\x02\x97\x98\x07\'\x02\x02\x98\x99\x07\b\x02" +
		"\x02\x99\x19\x03\x02\x02\x02\x9A\x9B\x07\x1D\x02\x02\x9B\x9C\x07\n\x02" +
		"\x02\x9C\x9D\x07\x1E\x02\x02\x9D\x9E\x07\b\x02\x02\x9E\x1B\x03\x02\x02" +
		"\x02\x9F\xA1\x05 \x11\x02\xA0\x9F\x03\x02\x02\x02\xA0\xA1\x03\x02\x02" +
		"\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA4\x07\'\x02\x02\xA3\xA5\x07(\x02\x02" +
		"\xA4\xA3\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA6\x03\x02\x02\x02" +
		"\xA6\xA7\x07%\x02\x02\xA7\x1D\x03\x02\x02\x02\xA8\xAC\x05 \x11\x02\xA9" +
		"\xAC\x07\x1C\x02\x02\xAA\xAC\x07\x1B\x02\x02\xAB\xA8\x03\x02\x02\x02\xAB" +
		"\xA9\x03\x02\x02\x02\xAB\xAA\x03\x02\x02\x02\xAC\x1F\x03\x02\x02\x02\xAD" +
		"\xC0\x07\'\x02\x02\xAE\xC0\x07\x11\x02\x02\xAF\xC0\x07\x12\x02\x02\xB0" +
		"\xC0\x07\x13\x02\x02\xB1\xC0\x07\x14\x02\x02\xB2\xC0\x07\x15\x02\x02\xB3" +
		"\xC0\x07\x16\x02\x02\xB4\xC0\x07\x17\x02\x02\xB5\xC0\x07\x18\x02\x02\xB6" +
		"\xC0\x07\x19\x02\x02\xB7\xC0\x07\x1A\x02\x02\xB8\xC0\x07\v\x02\x02\xB9" +
		"\xC0\x07\f\x02\x02\xBA\xBC\x07\r\x02\x02\xBB\xBD\x07\x1B\x02\x02\xBC\xBB" +
		"\x03\x02\x02\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02\xBE\xC0" +
		"\x07\x0E\x02\x02\xBF\xAD\x03\x02\x02\x02\xBF\xAE\x03\x02\x02\x02\xBF\xAF" +
		"\x03\x02\x02\x02\xBF\xB0\x03\x02\x02\x02\xBF\xB1\x03\x02\x02\x02\xBF\xB2" +
		"\x03\x02\x02\x02\xBF\xB3\x03\x02\x02\x02\xBF\xB4\x03\x02\x02\x02\xBF\xB5" +
		"\x03\x02\x02\x02\xBF\xB6\x03\x02\x02\x02\xBF\xB7\x03\x02\x02\x02\xBF\xB8" +
		"\x03\x02\x02\x02\xBF\xB9\x03\x02\x02\x02\xBF\xBA\x03\x02\x02\x02\xC0!" +
		"\x03\x02\x02\x02\xC1\xC2\x07#\x02\x02\xC2\xC3\x07\'\x02\x02\xC3\xC4\x07" +
		"\x0F\x02\x02\xC4\xC5\x07\'\x02\x02\xC5\xC7\x07\x04\x02\x02\xC6\xC8\x05" +
		"$\x13\x02\xC7\xC6\x03\x02\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xC7\x03" +
		"\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA\xCB\x03\x02\x02\x02\xCB\xCC\x07" +
		"\x05\x02\x02\xCC#\x03\x02\x02\x02\xCD\xD1\x07\x1B\x02\x02\xCE\xD1\x07" +
		"\x1C\x02\x02\xCF\xD1\x05(\x15\x02\xD0\xCD\x03\x02\x02\x02\xD0\xCE\x03" +
		"\x02\x02\x02\xD0\xCF\x03\x02\x02\x02\xD1\xD2\x03\x02\x02\x02\xD2\xD3\x07" +
		"$\x02\x02\xD3\xD5\x07\'\x02\x02\xD4\xD6\x07%\x02\x02\xD5\xD4\x03\x02\x02" +
		"\x02\xD5\xD6\x03\x02\x02\x02\xD6%\x03\x02\x02\x02\xD7\xD8\x07\'\x02\x02" +
		"\xD8\xDA\x07\x04\x02\x02\xD9\xDB\x05\f\x07\x02\xDA\xD9\x03\x02\x02\x02" +
		"\xDB\xDC\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDC\xDD\x03\x02\x02\x02" +
		"\xDD\xDE\x03\x02\x02\x02\xDE\xDF\x07\x05\x02\x02\xDF\'\x03\x02\x02\x02" +
		"\xE0\xE1\x07\x10\x02\x02\xE1\xE6\t\x02\x02\x02\xE2\xE3\x07%\x02\x02\xE3" +
		"\xE5\t\x02\x02\x02\xE4\xE2\x03\x02\x02\x02\xE5\xE8\x03\x02\x02\x02\xE6" +
		"\xE4\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02\xE7\xE9\x03\x02\x02\x02\xE8" +
		"\xE6\x03\x02\x02\x02\xE9\xEA\x07\x0E\x02\x02\xEA)\x03\x02\x02\x02\x1D" +
		"-/7@CKSY_cltz\x7F\x84\x89\x90\xA0\xA4\xAB\xBC\xBF\xC9\xD0\xD5\xDC\xE6";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!PacketDslParser.__ATN) {
			PacketDslParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(PacketDslParser._serializedATN));
		}

		return PacketDslParser.__ATN;
	}

}

export class PacketContext extends ParserRuleContext {
	public packetDefinition(): PacketDefinitionContext[];
	public packetDefinition(i: number): PacketDefinitionContext;
	public packetDefinition(i?: number): PacketDefinitionContext | PacketDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PacketDefinitionContext);
		} else {
			return this.getRuleContext(i, PacketDefinitionContext);
		}
	}
	public metaDataDefinition(): MetaDataDefinitionContext[];
	public metaDataDefinition(i: number): MetaDataDefinitionContext;
	public metaDataDefinition(i?: number): MetaDataDefinitionContext | MetaDataDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MetaDataDefinitionContext);
		} else {
			return this.getRuleContext(i, MetaDataDefinitionContext);
		}
	}
	public optionDefinition(): OptionDefinitionContext[];
	public optionDefinition(i: number): OptionDefinitionContext;
	public optionDefinition(i?: number): OptionDefinitionContext | OptionDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(OptionDefinitionContext);
		} else {
			return this.getRuleContext(i, OptionDefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_packet; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterPacket) {
			listener.enterPacket(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitPacket) {
			listener.exitPacket(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitPacket) {
			return visitor.visitPacket(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptionDefinitionContext extends ParserRuleContext {
	public optionDeclaration(): OptionDeclarationContext[];
	public optionDeclaration(i: number): OptionDeclarationContext;
	public optionDeclaration(i?: number): OptionDeclarationContext | OptionDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(OptionDeclarationContext);
		} else {
			return this.getRuleContext(i, OptionDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_optionDefinition; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterOptionDefinition) {
			listener.enterOptionDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitOptionDefinition) {
			listener.exitOptionDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitOptionDefinition) {
			return visitor.visitOptionDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptionDeclarationContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_optionDeclaration; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterOptionDeclaration) {
			listener.enterOptionDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitOptionDeclaration) {
			listener.exitOptionDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitOptionDeclaration) {
			return visitor.visitOptionDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PacketDefinitionContext extends ParserRuleContext {
	public PACKET(): TerminalNode { return this.getToken(PacketDslParser.PACKET, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public ROOT(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.ROOT, 0); }
	public fieldDefinitionWithAttribute(): FieldDefinitionWithAttributeContext[];
	public fieldDefinitionWithAttribute(i: number): FieldDefinitionWithAttributeContext;
	public fieldDefinitionWithAttribute(i?: number): FieldDefinitionWithAttributeContext | FieldDefinitionWithAttributeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FieldDefinitionWithAttributeContext);
		} else {
			return this.getRuleContext(i, FieldDefinitionWithAttributeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_packetDefinition; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterPacketDefinition) {
			listener.enterPacketDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitPacketDefinition) {
			listener.exitPacketDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitPacketDefinition) {
			return visitor.visitPacketDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldDefinitionWithAttributeContext extends ParserRuleContext {
	public fieldDefinition(): FieldDefinitionContext {
		return this.getRuleContext(0, FieldDefinitionContext);
	}
	public fieldAttribute(): FieldAttributeContext[];
	public fieldAttribute(i: number): FieldAttributeContext;
	public fieldAttribute(i?: number): FieldAttributeContext | FieldAttributeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FieldAttributeContext);
		} else {
			return this.getRuleContext(i, FieldAttributeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_fieldDefinitionWithAttribute; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterFieldDefinitionWithAttribute) {
			listener.enterFieldDefinitionWithAttribute(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitFieldDefinitionWithAttribute) {
			listener.exitFieldDefinitionWithAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitFieldDefinitionWithAttribute) {
			return visitor.visitFieldDefinitionWithAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldDefinitionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_fieldDefinition; }
	public copyFrom(ctx: FieldDefinitionContext): void {
		super.copyFrom(ctx);
	}
}
export class InerObjectFieldContext extends FieldDefinitionContext {
	public inerObjectDeclaration(): InerObjectDeclarationContext {
		return this.getRuleContext(0, InerObjectDeclarationContext);
	}
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	public REPEAT(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.REPEAT, 0); }
	constructor(ctx: FieldDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterInerObjectField) {
			listener.enterInerObjectField(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitInerObjectField) {
			listener.exitInerObjectField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitInerObjectField) {
			return visitor.visitInerObjectField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MetaFieldContext extends FieldDefinitionContext {
	public metaDataDeclaration(): MetaDataDeclarationContext {
		return this.getRuleContext(0, MetaDataDeclarationContext);
	}
	public REPEAT(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.REPEAT, 0); }
	constructor(ctx: FieldDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterMetaField) {
			listener.enterMetaField(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitMetaField) {
			listener.exitMetaField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitMetaField) {
			return visitor.visitMetaField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ObjectFieldContext extends FieldDefinitionContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	public REPEAT(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.REPEAT, 0); }
	constructor(ctx: FieldDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterObjectField) {
			listener.enterObjectField(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitObjectField) {
			listener.exitObjectField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitObjectField) {
			return visitor.visitObjectField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LengthFieldContext extends FieldDefinitionContext {
	public lengthFieldDeclaration(): LengthFieldDeclarationContext {
		return this.getRuleContext(0, LengthFieldDeclarationContext);
	}
	constructor(ctx: FieldDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterLengthField) {
			listener.enterLengthField(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitLengthField) {
			listener.exitLengthField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitLengthField) {
			return visitor.visitLengthField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CheckSumFieldContext extends FieldDefinitionContext {
	public checkSumFieldDeclaration(): CheckSumFieldDeclarationContext {
		return this.getRuleContext(0, CheckSumFieldDeclarationContext);
	}
	constructor(ctx: FieldDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterCheckSumField) {
			listener.enterCheckSumField(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitCheckSumField) {
			listener.exitCheckSumField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitCheckSumField) {
			return visitor.visitCheckSumField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MatchFieldContext extends FieldDefinitionContext {
	public matchFieldDeclaration(): MatchFieldDeclarationContext {
		return this.getRuleContext(0, MatchFieldDeclarationContext);
	}
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	constructor(ctx: FieldDefinitionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterMatchField) {
			listener.enterMatchField(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitMatchField) {
			listener.exitMatchField(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitMatchField) {
			return visitor.visitMatchField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MetaDataDefinitionContext extends ParserRuleContext {
	public METADATA(): TerminalNode { return this.getToken(PacketDslParser.METADATA, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public metaDataDeclaration(): MetaDataDeclarationContext[];
	public metaDataDeclaration(i: number): MetaDataDeclarationContext;
	public metaDataDeclaration(i?: number): MetaDataDeclarationContext | MetaDataDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MetaDataDeclarationContext);
		} else {
			return this.getRuleContext(i, MetaDataDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_metaDataDefinition; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterMetaDataDefinition) {
			listener.enterMetaDataDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitMetaDataDefinition) {
			listener.exitMetaDataDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitMetaDataDefinition) {
			return visitor.visitMetaDataDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LengthFieldDeclarationContext extends ParserRuleContext {
	public _name!: Token;
	public lengthOfAttribute(): LengthOfAttributeContext {
		return this.getRuleContext(0, LengthOfAttributeContext);
	}
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_lengthFieldDeclaration; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterLengthFieldDeclaration) {
			listener.enterLengthFieldDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitLengthFieldDeclaration) {
			listener.exitLengthFieldDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitLengthFieldDeclaration) {
			return visitor.visitLengthFieldDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CheckSumFieldDeclarationContext extends ParserRuleContext {
	public _name!: Token;
	public calculatedFromAttribute(): CalculatedFromAttributeContext {
		return this.getRuleContext(0, CalculatedFromAttributeContext);
	}
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_checkSumFieldDeclaration; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterCheckSumFieldDeclaration) {
			listener.enterCheckSumFieldDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitCheckSumFieldDeclaration) {
			listener.exitCheckSumFieldDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitCheckSumFieldDeclaration) {
			return visitor.visitCheckSumFieldDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldAttributeContext extends ParserRuleContext {
	public lengthOfAttribute(): LengthOfAttributeContext | undefined {
		return this.tryGetRuleContext(0, LengthOfAttributeContext);
	}
	public calculatedFromAttribute(): CalculatedFromAttributeContext | undefined {
		return this.tryGetRuleContext(0, CalculatedFromAttributeContext);
	}
	public paddingAttribute(): PaddingAttributeContext | undefined {
		return this.tryGetRuleContext(0, PaddingAttributeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_fieldAttribute; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterFieldAttribute) {
			listener.enterFieldAttribute(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitFieldAttribute) {
			listener.exitFieldAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitFieldAttribute) {
			return visitor.visitFieldAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CalculatedFromAttributeContext extends ParserRuleContext {
	public _from!: Token;
	public STRING(): TerminalNode { return this.getToken(PacketDslParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_calculatedFromAttribute; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterCalculatedFromAttribute) {
			listener.enterCalculatedFromAttribute(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitCalculatedFromAttribute) {
			listener.exitCalculatedFromAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitCalculatedFromAttribute) {
			return visitor.visitCalculatedFromAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LengthOfAttributeContext extends ParserRuleContext {
	public _from!: Token;
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_lengthOfAttribute; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterLengthOfAttribute) {
			listener.enterLengthOfAttribute(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitLengthOfAttribute) {
			listener.exitLengthOfAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitLengthOfAttribute) {
			return visitor.visitLengthOfAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PaddingAttributeContext extends ParserRuleContext {
	public _padding!: Token;
	public PADDING_ATTR(): TerminalNode { return this.getToken(PacketDslParser.PADDING_ATTR, 0); }
	public PADDING_CHAR(): TerminalNode { return this.getToken(PacketDslParser.PADDING_CHAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_paddingAttribute; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterPaddingAttribute) {
			listener.enterPaddingAttribute(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitPaddingAttribute) {
			listener.exitPaddingAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitPaddingAttribute) {
			return visitor.visitPaddingAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MetaDataDeclarationContext extends ParserRuleContext {
	public _name!: Token;
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_metaDataDeclaration; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterMetaDataDeclaration) {
			listener.enterMetaDataDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitMetaDataDeclaration) {
			listener.exitMetaDataDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitMetaDataDeclaration) {
			return visitor.visitMetaDataDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public STRING(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.STRING, 0); }
	public DIGITS(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.DIGITS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_value; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.IDENTIFIER, 0); }
	public UINT8(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.UINT8, 0); }
	public UINT16(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.UINT16, 0); }
	public UINT32(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.UINT32, 0); }
	public UINT64(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.UINT64, 0); }
	public INT8(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.INT8, 0); }
	public INT16(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.INT16, 0); }
	public INT32(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.INT32, 0); }
	public INT64(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.INT64, 0); }
	public FLOAT32(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.FLOAT32, 0); }
	public FLOAT64(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.FLOAT64, 0); }
	public DIGITS(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.DIGITS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_type; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterType) {
			listener.enterType(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitType) {
			listener.exitType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitType) {
			return visitor.visitType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchFieldDeclarationContext extends ParserRuleContext {
	public _matchKey!: Token;
	public _matchName!: Token;
	public MATCH(): TerminalNode { return this.getToken(PacketDslParser.MATCH, 0); }
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PacketDslParser.IDENTIFIER);
		} else {
			return this.getToken(PacketDslParser.IDENTIFIER, i);
		}
	}
	public matchPair(): MatchPairContext[];
	public matchPair(i: number): MatchPairContext;
	public matchPair(i?: number): MatchPairContext | MatchPairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MatchPairContext);
		} else {
			return this.getRuleContext(i, MatchPairContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_matchFieldDeclaration; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterMatchFieldDeclaration) {
			listener.enterMatchFieldDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitMatchFieldDeclaration) {
			listener.exitMatchFieldDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitMatchFieldDeclaration) {
			return visitor.visitMatchFieldDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MatchPairContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(PacketDslParser.COLON, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public DIGITS(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.DIGITS, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.STRING, 0); }
	public list(): ListContext | undefined {
		return this.tryGetRuleContext(0, ListContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_matchPair; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterMatchPair) {
			listener.enterMatchPair(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitMatchPair) {
			listener.exitMatchPair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitMatchPair) {
			return visitor.visitMatchPair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InerObjectDeclarationContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public fieldDefinition(): FieldDefinitionContext[];
	public fieldDefinition(i: number): FieldDefinitionContext;
	public fieldDefinition(i?: number): FieldDefinitionContext | FieldDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FieldDefinitionContext);
		} else {
			return this.getRuleContext(i, FieldDefinitionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_inerObjectDeclaration; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterInerObjectDeclaration) {
			listener.enterInerObjectDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitInerObjectDeclaration) {
			listener.exitInerObjectDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitInerObjectDeclaration) {
			return visitor.visitInerObjectDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListContext extends ParserRuleContext {
	public DIGITS(): TerminalNode[];
	public DIGITS(i: number): TerminalNode;
	public DIGITS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PacketDslParser.DIGITS);
		} else {
			return this.getToken(PacketDslParser.DIGITS, i);
		}
	}
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PacketDslParser.STRING);
		} else {
			return this.getToken(PacketDslParser.STRING, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PacketDslParser.COMMA);
		} else {
			return this.getToken(PacketDslParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return PacketDslParser.RULE_list; }
	// @Override
	public enterRule(listener: PacketDslListener): void {
		if (listener.enterList) {
			listener.enterList(this);
		}
	}
	// @Override
	public exitRule(listener: PacketDslListener): void {
		if (listener.exitList) {
			listener.exitList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: PacketDslVisitor<Result>): Result {
		if (visitor.visitList) {
			return visitor.visitList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


