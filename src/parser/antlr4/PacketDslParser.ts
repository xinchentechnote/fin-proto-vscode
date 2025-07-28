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
	public static readonly UINT8 = 14;
	public static readonly UINT16 = 15;
	public static readonly UINT32 = 16;
	public static readonly UINT64 = 17;
	public static readonly INT8 = 18;
	public static readonly INT16 = 19;
	public static readonly INT32 = 20;
	public static readonly INT64 = 21;
	public static readonly FLOAT32 = 22;
	public static readonly FLOAT64 = 23;
	public static readonly DIGITS = 24;
	public static readonly STRING = 25;
	public static readonly ROOT = 26;
	public static readonly PACKET = 27;
	public static readonly REPEAT = 28;
	public static readonly METADATA = 29;
	public static readonly MATCH = 30;
	public static readonly COLON = 31;
	public static readonly COMMA = 32;
	public static readonly SEMICOLON = 33;
	public static readonly IDENTIFIER = 34;
	public static readonly STRING_LITERAL = 35;
	public static readonly LINE_COMMENT = 36;
	public static readonly WS = 37;
	public static readonly RULE_packet = 0;
	public static readonly RULE_optionDefinition = 1;
	public static readonly RULE_optionDeclaration = 2;
	public static readonly RULE_packetDefinition = 3;
	public static readonly RULE_fieldDefinition = 4;
	public static readonly RULE_metaDataDefinition = 5;
	public static readonly RULE_lengthFieldDeclaration = 6;
	public static readonly RULE_checkSumFieldDeclaration = 7;
	public static readonly RULE_metaDataDeclaration = 8;
	public static readonly RULE_value = 9;
	public static readonly RULE_type = 10;
	public static readonly RULE_matchFieldDeclaration = 11;
	public static readonly RULE_matchPair = 12;
	public static readonly RULE_inerObjectDeclaration = 13;
	public static readonly RULE_list = 14;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"packet", "optionDefinition", "optionDeclaration", "packetDefinition", 
		"fieldDefinition", "metaDataDefinition", "lengthFieldDeclaration", "checkSumFieldDeclaration", 
		"metaDataDeclaration", "value", "type", "matchFieldDeclaration", "matchPair", 
		"inerObjectDeclaration", "list",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'options'", "'{'", "'}'", "'='", "'@lengthOf('", "')'", "'@calculatedFrom('", 
		"'string'", "'char'", "'char['", "']'", "'as'", "'['", undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "'root'", "'packet'", "'repeat'", "'MetaData'", 
		"'match'", "':'", "','", "';'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"UINT8", "UINT16", "UINT32", "UINT64", "INT8", "INT16", "INT32", "INT64", 
		"FLOAT32", "FLOAT64", "DIGITS", "STRING", "ROOT", "PACKET", "REPEAT", 
		"METADATA", "MATCH", "COLON", "COMMA", "SEMICOLON", "IDENTIFIER", "STRING_LITERAL", 
		"LINE_COMMENT", "WS",
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
			this.state = 35;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__0) | (1 << PacketDslParser.ROOT) | (1 << PacketDslParser.PACKET) | (1 << PacketDslParser.METADATA))) !== 0)) {
				{
				this.state = 33;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case PacketDslParser.ROOT:
				case PacketDslParser.PACKET:
					{
					this.state = 30;
					this.packetDefinition();
					}
					break;
				case PacketDslParser.METADATA:
					{
					this.state = 31;
					this.metaDataDefinition();
					}
					break;
				case PacketDslParser.T__0:
					{
					this.state = 32;
					this.optionDefinition();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 37;
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
			this.state = 38;
			this.match(PacketDslParser.T__0);
			this.state = 39;
			this.match(PacketDslParser.T__1);
			this.state = 43;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PacketDslParser.IDENTIFIER) {
				{
				{
				this.state = 40;
				this.optionDeclaration();
				}
				}
				this.state = 45;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 46;
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
			this.state = 48;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 49;
			this.match(PacketDslParser.T__3);
			this.state = 50;
			this.value();
			this.state = 52;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.SEMICOLON) {
				{
				this.state = 51;
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
			this.state = 55;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.ROOT) {
				{
				this.state = 54;
				this.match(PacketDslParser.ROOT);
				}
			}

			this.state = 57;
			this.match(PacketDslParser.PACKET);
			this.state = 58;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 59;
			this.match(PacketDslParser.T__1);
			this.state = 63;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & ((1 << (PacketDslParser.T__7 - 8)) | (1 << (PacketDslParser.T__8 - 8)) | (1 << (PacketDslParser.T__9 - 8)) | (1 << (PacketDslParser.UINT8 - 8)) | (1 << (PacketDslParser.UINT16 - 8)) | (1 << (PacketDslParser.UINT32 - 8)) | (1 << (PacketDslParser.UINT64 - 8)) | (1 << (PacketDslParser.INT8 - 8)) | (1 << (PacketDslParser.INT16 - 8)) | (1 << (PacketDslParser.INT32 - 8)) | (1 << (PacketDslParser.INT64 - 8)) | (1 << (PacketDslParser.FLOAT32 - 8)) | (1 << (PacketDslParser.FLOAT64 - 8)) | (1 << (PacketDslParser.REPEAT - 8)) | (1 << (PacketDslParser.MATCH - 8)) | (1 << (PacketDslParser.IDENTIFIER - 8)))) !== 0)) {
				{
				{
				this.state = 60;
				this.fieldDefinition();
				}
				}
				this.state = 65;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 66;
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
	public fieldDefinition(): FieldDefinitionContext {
		let _localctx: FieldDefinitionContext = new FieldDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, PacketDslParser.RULE_fieldDefinition);
		let _la: number;
		try {
			this.state = 88;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				_localctx = new InerObjectFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 69;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 68;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 71;
				this.inerObjectDeclaration();
				this.state = 72;
				this.match(PacketDslParser.COMMA);
				}
				break;

			case 2:
				_localctx = new MetaFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 74;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 77;
				this.metaDataDeclaration();
				}
				break;

			case 3:
				_localctx = new ObjectFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 79;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 78;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 81;
				this.match(PacketDslParser.IDENTIFIER);
				this.state = 82;
				this.match(PacketDslParser.COMMA);
				}
				break;

			case 4:
				_localctx = new LengthFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 83;
				this.lengthFieldDeclaration();
				}
				break;

			case 5:
				_localctx = new CheckSumFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 84;
				this.checkSumFieldDeclaration();
				}
				break;

			case 6:
				_localctx = new MatchFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 85;
				this.matchFieldDeclaration();
				this.state = 86;
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
		this.enterRule(_localctx, 10, PacketDslParser.RULE_metaDataDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 90;
			this.match(PacketDslParser.METADATA);
			this.state = 91;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 92;
			this.match(PacketDslParser.T__1);
			this.state = 96;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & ((1 << (PacketDslParser.T__7 - 8)) | (1 << (PacketDslParser.T__8 - 8)) | (1 << (PacketDslParser.T__9 - 8)) | (1 << (PacketDslParser.UINT8 - 8)) | (1 << (PacketDslParser.UINT16 - 8)) | (1 << (PacketDslParser.UINT32 - 8)) | (1 << (PacketDslParser.UINT64 - 8)) | (1 << (PacketDslParser.INT8 - 8)) | (1 << (PacketDslParser.INT16 - 8)) | (1 << (PacketDslParser.INT32 - 8)) | (1 << (PacketDslParser.INT64 - 8)) | (1 << (PacketDslParser.FLOAT32 - 8)) | (1 << (PacketDslParser.FLOAT64 - 8)) | (1 << (PacketDslParser.IDENTIFIER - 8)))) !== 0)) {
				{
				{
				this.state = 93;
				this.metaDataDeclaration();
				}
				}
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 99;
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
		this.enterRule(_localctx, 12, PacketDslParser.RULE_lengthFieldDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 101;
			this.type();
			this.state = 102;
			_localctx._name = this.match(PacketDslParser.IDENTIFIER);
			{
			this.state = 103;
			this.match(PacketDslParser.T__4);
			this.state = 104;
			_localctx._from = this.match(PacketDslParser.IDENTIFIER);
			this.state = 105;
			this.match(PacketDslParser.T__5);
			}
			this.state = 108;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.STRING_LITERAL) {
				{
				this.state = 107;
				this.match(PacketDslParser.STRING_LITERAL);
				}
			}

			this.state = 110;
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
		this.enterRule(_localctx, 14, PacketDslParser.RULE_checkSumFieldDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 112;
			this.type();
			this.state = 113;
			_localctx._name = this.match(PacketDslParser.IDENTIFIER);
			{
			this.state = 114;
			this.match(PacketDslParser.T__6);
			this.state = 115;
			_localctx._from = this.match(PacketDslParser.STRING);
			this.state = 116;
			this.match(PacketDslParser.T__5);
			}
			this.state = 119;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.STRING_LITERAL) {
				{
				this.state = 118;
				this.match(PacketDslParser.STRING_LITERAL);
				}
			}

			this.state = 121;
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
	public metaDataDeclaration(): MetaDataDeclarationContext {
		let _localctx: MetaDataDeclarationContext = new MetaDataDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, PacketDslParser.RULE_metaDataDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 124;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				this.state = 123;
				this.type();
				}
				break;
			}
			this.state = 126;
			_localctx._name = this.match(PacketDslParser.IDENTIFIER);
			this.state = 128;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.STRING_LITERAL) {
				{
				this.state = 127;
				this.match(PacketDslParser.STRING_LITERAL);
				}
			}

			this.state = 130;
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
		this.enterRule(_localctx, 18, PacketDslParser.RULE_value);
		try {
			this.state = 135;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.T__7:
			case PacketDslParser.T__8:
			case PacketDslParser.T__9:
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
				this.state = 132;
				this.type();
				}
				break;
			case PacketDslParser.STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 133;
				this.match(PacketDslParser.STRING);
				}
				break;
			case PacketDslParser.DIGITS:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 134;
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
		this.enterRule(_localctx, 20, PacketDslParser.RULE_type);
		let _la: number;
		try {
			this.state = 155;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 137;
				this.match(PacketDslParser.IDENTIFIER);
				}
				break;
			case PacketDslParser.UINT8:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 138;
				this.match(PacketDslParser.UINT8);
				}
				break;
			case PacketDslParser.UINT16:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 139;
				this.match(PacketDslParser.UINT16);
				}
				break;
			case PacketDslParser.UINT32:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 140;
				this.match(PacketDslParser.UINT32);
				}
				break;
			case PacketDslParser.UINT64:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 141;
				this.match(PacketDslParser.UINT64);
				}
				break;
			case PacketDslParser.INT8:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 142;
				this.match(PacketDslParser.INT8);
				}
				break;
			case PacketDslParser.INT16:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 143;
				this.match(PacketDslParser.INT16);
				}
				break;
			case PacketDslParser.INT32:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 144;
				this.match(PacketDslParser.INT32);
				}
				break;
			case PacketDslParser.INT64:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 145;
				this.match(PacketDslParser.INT64);
				}
				break;
			case PacketDslParser.FLOAT32:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 146;
				this.match(PacketDslParser.FLOAT32);
				}
				break;
			case PacketDslParser.FLOAT64:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 147;
				this.match(PacketDslParser.FLOAT64);
				}
				break;
			case PacketDslParser.T__7:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 148;
				this.match(PacketDslParser.T__7);
				}
				break;
			case PacketDslParser.T__8:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 149;
				this.match(PacketDslParser.T__8);
				}
				break;
			case PacketDslParser.T__9:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 150;
				this.match(PacketDslParser.T__9);
				this.state = 152;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.DIGITS) {
					{
					this.state = 151;
					this.match(PacketDslParser.DIGITS);
					}
				}

				this.state = 154;
				this.match(PacketDslParser.T__10);
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
		this.enterRule(_localctx, 22, PacketDslParser.RULE_matchFieldDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 157;
			this.match(PacketDslParser.MATCH);
			this.state = 158;
			_localctx._matchKey = this.match(PacketDslParser.IDENTIFIER);
			this.state = 159;
			this.match(PacketDslParser.T__11);
			this.state = 160;
			_localctx._matchName = this.match(PacketDslParser.IDENTIFIER);
			this.state = 161;
			this.match(PacketDslParser.T__1);
			this.state = 163;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 162;
				this.matchPair();
				}
				}
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__12) | (1 << PacketDslParser.DIGITS) | (1 << PacketDslParser.STRING))) !== 0));
			this.state = 167;
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
		this.enterRule(_localctx, 24, PacketDslParser.RULE_matchPair);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 172;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.DIGITS:
				{
				this.state = 169;
				this.match(PacketDslParser.DIGITS);
				}
				break;
			case PacketDslParser.STRING:
				{
				this.state = 170;
				this.match(PacketDslParser.STRING);
				}
				break;
			case PacketDslParser.T__12:
				{
				this.state = 171;
				this.list();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 174;
			this.match(PacketDslParser.COLON);
			this.state = 175;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 177;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.COMMA) {
				{
				this.state = 176;
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
		this.enterRule(_localctx, 26, PacketDslParser.RULE_inerObjectDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 179;
			this.match(PacketDslParser.IDENTIFIER);
			{
			this.state = 180;
			this.match(PacketDslParser.T__1);
			this.state = 182;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 181;
				this.fieldDefinition();
				}
				}
				this.state = 184;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 8)) & ~0x1F) === 0 && ((1 << (_la - 8)) & ((1 << (PacketDslParser.T__7 - 8)) | (1 << (PacketDslParser.T__8 - 8)) | (1 << (PacketDslParser.T__9 - 8)) | (1 << (PacketDslParser.UINT8 - 8)) | (1 << (PacketDslParser.UINT16 - 8)) | (1 << (PacketDslParser.UINT32 - 8)) | (1 << (PacketDslParser.UINT64 - 8)) | (1 << (PacketDslParser.INT8 - 8)) | (1 << (PacketDslParser.INT16 - 8)) | (1 << (PacketDslParser.INT32 - 8)) | (1 << (PacketDslParser.INT64 - 8)) | (1 << (PacketDslParser.FLOAT32 - 8)) | (1 << (PacketDslParser.FLOAT64 - 8)) | (1 << (PacketDslParser.REPEAT - 8)) | (1 << (PacketDslParser.MATCH - 8)) | (1 << (PacketDslParser.IDENTIFIER - 8)))) !== 0));
			this.state = 186;
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
		this.enterRule(_localctx, 28, PacketDslParser.RULE_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 188;
			this.match(PacketDslParser.T__12);
			this.state = 189;
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
			this.state = 194;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PacketDslParser.COMMA) {
				{
				{
				this.state = 190;
				this.match(PacketDslParser.COMMA);
				this.state = 191;
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
				this.state = 196;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 197;
			this.match(PacketDslParser.T__10);
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\'\xCA\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x03\x02\x03\x02\x03\x02\x07\x02" +
		"$\n\x02\f\x02\x0E\x02\'\v\x02\x03\x03\x03\x03\x03\x03\x07\x03,\n\x03\f" +
		"\x03\x0E\x03/\v\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x05" +
		"\x047\n\x04\x03\x05\x05\x05:\n\x05\x03\x05\x03\x05\x03\x05\x03\x05\x07" +
		"\x05@\n\x05\f\x05\x0E\x05C\v\x05\x03\x05\x03\x05\x03\x06\x05\x06H\n\x06" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06N\n\x06\x03\x06\x03\x06\x05\x06" +
		"R\n\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06" +
		"[\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07a\n\x07\f\x07\x0E\x07d" +
		"\v\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b" +
		"o\n\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05\tz\n\t" +
		"\x03\t\x03\t\x03\n\x05\n\x7F\n\n\x03\n\x03\n\x05\n\x83\n\n\x03\n\x03\n" +
		"\x03\v\x03\v\x03\v\x05\v\x8A\n\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03" +
		"\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\x9B\n\f\x03\f" +
		"\x05\f\x9E\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x06\r\xA6\n\r\r\r\x0E" +
		"\r\xA7\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xAF\n\x0E\x03\x0E\x03" +
		"\x0E\x03\x0E\x05\x0E\xB4\n\x0E\x03\x0F\x03\x0F\x03\x0F\x06\x0F\xB9\n\x0F" +
		"\r\x0F\x0E\x0F\xBA\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x07" +
		"\x10\xC3\n\x10\f\x10\x0E\x10\xC6\v\x10\x03\x10\x03\x10\x03\x10\x02\x02" +
		"\x02\x11\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12" +
		"\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02\x02\x03\x03\x02\x1A" +
		"\x1B\x02\xE4\x02%\x03\x02\x02\x02\x04(\x03\x02\x02\x02\x062\x03\x02\x02" +
		"\x02\b9\x03\x02\x02\x02\nZ\x03\x02\x02\x02\f\\\x03\x02\x02\x02\x0Eg\x03" +
		"\x02\x02\x02\x10r\x03\x02\x02\x02\x12~\x03\x02\x02\x02\x14\x89\x03\x02" +
		"\x02\x02\x16\x9D\x03\x02\x02\x02\x18\x9F\x03\x02\x02\x02\x1A\xAE\x03\x02" +
		"\x02\x02\x1C\xB5\x03\x02\x02\x02\x1E\xBE\x03\x02\x02\x02 $\x05\b\x05\x02" +
		"!$\x05\f\x07\x02\"$\x05\x04\x03\x02# \x03\x02\x02\x02#!\x03\x02\x02\x02" +
		"#\"\x03\x02\x02\x02$\'\x03\x02\x02\x02%#\x03\x02\x02\x02%&\x03\x02\x02" +
		"\x02&\x03\x03\x02\x02\x02\'%\x03\x02\x02\x02()\x07\x03\x02\x02)-\x07\x04" +
		"\x02\x02*,\x05\x06\x04\x02+*\x03\x02\x02\x02,/\x03\x02\x02\x02-+\x03\x02" +
		"\x02\x02-.\x03\x02\x02\x02.0\x03\x02\x02\x02/-\x03\x02\x02\x0201\x07\x05" +
		"\x02\x021\x05\x03\x02\x02\x0223\x07$\x02\x0234\x07\x06\x02\x0246\x05\x14" +
		"\v\x0257\x07#\x02\x0265\x03\x02\x02\x0267\x03\x02\x02\x027\x07\x03\x02" +
		"\x02\x028:\x07\x1C\x02\x0298\x03\x02\x02\x029:\x03\x02\x02\x02:;\x03\x02" +
		"\x02\x02;<\x07\x1D\x02\x02<=\x07$\x02\x02=A\x07\x04\x02\x02>@\x05\n\x06" +
		"\x02?>\x03\x02\x02\x02@C\x03\x02\x02\x02A?\x03\x02\x02\x02AB\x03\x02\x02" +
		"\x02BD\x03\x02\x02\x02CA\x03\x02\x02\x02DE\x07\x05\x02\x02E\t\x03\x02" +
		"\x02\x02FH\x07\x1E\x02\x02GF\x03\x02\x02\x02GH\x03\x02\x02\x02HI\x03\x02" +
		"\x02\x02IJ\x05\x1C\x0F\x02JK\x07\"\x02\x02K[\x03\x02\x02\x02LN\x07\x1E" +
		"\x02\x02ML\x03\x02\x02\x02MN\x03\x02\x02\x02NO\x03\x02\x02\x02O[\x05\x12" +
		"\n\x02PR\x07\x1E\x02\x02QP\x03\x02\x02\x02QR\x03\x02\x02\x02RS\x03\x02" +
		"\x02\x02ST\x07$\x02\x02T[\x07\"\x02\x02U[\x05\x0E\b\x02V[\x05\x10\t\x02" +
		"WX\x05\x18\r\x02XY\x07\"\x02\x02Y[\x03\x02\x02\x02ZG\x03\x02\x02\x02Z" +
		"M\x03\x02\x02\x02ZQ\x03\x02\x02\x02ZU\x03\x02\x02\x02ZV\x03\x02\x02\x02" +
		"ZW\x03\x02\x02\x02[\v\x03\x02\x02\x02\\]\x07\x1F\x02\x02]^\x07$\x02\x02" +
		"^b\x07\x04\x02\x02_a\x05\x12\n\x02`_\x03\x02\x02\x02ad\x03\x02\x02\x02" +
		"b`\x03\x02\x02\x02bc\x03\x02\x02\x02ce\x03\x02\x02\x02db\x03\x02\x02\x02" +
		"ef\x07\x05\x02\x02f\r\x03\x02\x02\x02gh\x05\x16\f\x02hi\x07$\x02\x02i" +
		"j\x07\x07\x02\x02jk\x07$\x02\x02kl\x07\b\x02\x02ln\x03\x02\x02\x02mo\x07" +
		"%\x02\x02nm\x03\x02\x02\x02no\x03\x02\x02\x02op\x03\x02\x02\x02pq\x07" +
		"\"\x02\x02q\x0F\x03\x02\x02\x02rs\x05\x16\f\x02st\x07$\x02\x02tu\x07\t" +
		"\x02\x02uv\x07\x1B\x02\x02vw\x07\b\x02\x02wy\x03\x02\x02\x02xz\x07%\x02" +
		"\x02yx\x03\x02\x02\x02yz\x03\x02\x02\x02z{\x03\x02\x02\x02{|\x07\"\x02" +
		"\x02|\x11\x03\x02\x02\x02}\x7F\x05\x16\f\x02~}\x03\x02\x02\x02~\x7F\x03" +
		"\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x80\x82\x07$\x02\x02\x81\x83\x07" +
		"%\x02\x02\x82\x81\x03\x02\x02\x02\x82\x83\x03\x02\x02\x02\x83\x84\x03" +
		"\x02\x02\x02\x84\x85\x07\"\x02\x02\x85\x13\x03\x02\x02\x02\x86\x8A\x05" +
		"\x16\f\x02\x87\x8A\x07\x1B\x02\x02\x88\x8A\x07\x1A\x02\x02\x89\x86\x03" +
		"\x02\x02\x02\x89\x87\x03\x02\x02\x02\x89\x88\x03\x02\x02\x02\x8A\x15\x03" +
		"\x02\x02\x02\x8B\x9E\x07$\x02\x02\x8C\x9E\x07\x10\x02\x02\x8D\x9E\x07" +
		"\x11\x02\x02\x8E\x9E\x07\x12\x02\x02\x8F\x9E\x07\x13\x02\x02\x90\x9E\x07" +
		"\x14\x02\x02\x91\x9E\x07\x15\x02\x02\x92\x9E\x07\x16\x02\x02\x93\x9E\x07" +
		"\x17\x02\x02\x94\x9E\x07\x18\x02\x02\x95\x9E\x07\x19\x02\x02\x96\x9E\x07" +
		"\n\x02\x02\x97\x9E\x07\v\x02\x02\x98\x9A\x07\f\x02\x02\x99\x9B\x07\x1A" +
		"\x02\x02\x9A\x99\x03\x02\x02\x02\x9A\x9B\x03\x02\x02\x02\x9B\x9C\x03\x02" +
		"\x02\x02\x9C\x9E\x07\r\x02\x02\x9D\x8B\x03\x02\x02\x02\x9D\x8C\x03\x02" +
		"\x02\x02\x9D\x8D\x03\x02\x02\x02\x9D\x8E\x03\x02\x02\x02\x9D\x8F\x03\x02" +
		"\x02\x02\x9D\x90\x03\x02\x02\x02\x9D\x91\x03\x02\x02\x02\x9D\x92\x03\x02" +
		"\x02\x02\x9D\x93\x03\x02\x02\x02\x9D\x94\x03\x02\x02\x02\x9D\x95\x03\x02" +
		"\x02\x02\x9D\x96\x03\x02\x02\x02\x9D\x97\x03\x02\x02\x02\x9D\x98\x03\x02" +
		"\x02\x02\x9E\x17\x03\x02\x02\x02\x9F\xA0\x07 \x02\x02\xA0\xA1\x07$\x02" +
		"\x02\xA1\xA2\x07\x0E\x02\x02\xA2\xA3\x07$\x02\x02\xA3\xA5\x07\x04\x02" +
		"\x02\xA4\xA6\x05\x1A\x0E\x02\xA5\xA4\x03\x02\x02\x02\xA6\xA7\x03\x02\x02" +
		"\x02\xA7\xA5\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA8\xA9\x03\x02\x02" +
		"\x02\xA9\xAA\x07\x05\x02\x02\xAA\x19\x03\x02\x02\x02\xAB\xAF\x07\x1A\x02" +
		"\x02\xAC\xAF\x07\x1B\x02\x02\xAD\xAF\x05\x1E\x10\x02\xAE\xAB\x03\x02\x02" +
		"\x02\xAE\xAC\x03\x02\x02\x02\xAE\xAD\x03\x02\x02\x02\xAF\xB0\x03\x02\x02" +
		"\x02\xB0\xB1\x07!\x02\x02\xB1\xB3\x07$\x02\x02\xB2\xB4\x07\"\x02\x02\xB3" +
		"\xB2\x03\x02\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4\x1B\x03\x02\x02\x02\xB5" +
		"\xB6\x07$\x02\x02\xB6\xB8\x07\x04\x02\x02\xB7\xB9\x05\n\x06\x02\xB8\xB7" +
		"\x03\x02\x02\x02\xB9\xBA\x03\x02\x02\x02\xBA\xB8\x03\x02\x02\x02\xBA\xBB" +
		"\x03\x02\x02\x02\xBB\xBC\x03\x02\x02\x02\xBC\xBD\x07\x05\x02\x02\xBD\x1D" +
		"\x03\x02\x02\x02\xBE\xBF\x07\x0F\x02\x02\xBF\xC4\t\x02\x02\x02\xC0\xC1" +
		"\x07\"\x02\x02\xC1\xC3\t\x02\x02\x02\xC2\xC0\x03\x02\x02\x02\xC3\xC6\x03" +
		"\x02\x02\x02\xC4\xC2\x03\x02\x02\x02\xC4\xC5\x03\x02\x02\x02\xC5\xC7\x03" +
		"\x02\x02\x02\xC6\xC4\x03\x02\x02\x02\xC7\xC8\x07\r\x02\x02\xC8\x1F\x03" +
		"\x02\x02\x02\x19#%-69AGMQZbny~\x82\x89\x9A\x9D\xA7\xAE\xB3\xBA\xC4";
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
	public _from!: Token;
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(PacketDslParser.IDENTIFIER);
		} else {
			return this.getToken(PacketDslParser.IDENTIFIER, i);
		}
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
	public _from!: Token;
	public type(): TypeContext {
		return this.getRuleContext(0, TypeContext);
	}
	public COMMA(): TerminalNode { return this.getToken(PacketDslParser.COMMA, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.STRING, 0); }
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


