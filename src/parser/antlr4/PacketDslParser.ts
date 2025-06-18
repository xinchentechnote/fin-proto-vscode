// Generated from antlr4/PacketDsl.g4 by ANTLR 4.9.0-SNAPSHOT


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
	public static readonly UINT8 = 10;
	public static readonly UINT16 = 11;
	public static readonly UINT32 = 12;
	public static readonly UINT64 = 13;
	public static readonly INT8 = 14;
	public static readonly INT16 = 15;
	public static readonly INT32 = 16;
	public static readonly INT64 = 17;
	public static readonly FLOAT32 = 18;
	public static readonly FLOAT64 = 19;
	public static readonly DIGITS = 20;
	public static readonly STRING = 21;
	public static readonly ROOT = 22;
	public static readonly PACKET = 23;
	public static readonly REPEAT = 24;
	public static readonly METADATA = 25;
	public static readonly MATCH = 26;
	public static readonly COLON = 27;
	public static readonly COMMA = 28;
	public static readonly SEMICOLON = 29;
	public static readonly IDENTIFIER = 30;
	public static readonly STRING_LITERAL = 31;
	public static readonly LINE_COMMENT = 32;
	public static readonly WS = 33;
	public static readonly RULE_packet = 0;
	public static readonly RULE_optionDefinition = 1;
	public static readonly RULE_optionDeclaration = 2;
	public static readonly RULE_packetDefinition = 3;
	public static readonly RULE_fieldDefinition = 4;
	public static readonly RULE_metaDataDefinition = 5;
	public static readonly RULE_metaDataDeclaration = 6;
	public static readonly RULE_value = 7;
	public static readonly RULE_type = 8;
	public static readonly RULE_matchFieldDeclaration = 9;
	public static readonly RULE_matchPair = 10;
	public static readonly RULE_inerObjectDeclaration = 11;
	public static readonly RULE_list = 12;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"packet", "optionDefinition", "optionDeclaration", "packetDefinition", 
		"fieldDefinition", "metaDataDefinition", "metaDataDeclaration", "value", 
		"type", "matchFieldDeclaration", "matchPair", "inerObjectDeclaration", 
		"list",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'options'", "'{'", "'}'", "'='", "'string'", "'char'", "'char['", 
		"']'", "'['", undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, "'root'", 
		"'packet'", "'repeat'", "'MetaData'", "'match'", "':'", "','", "';'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "UINT8", "UINT16", "UINT32", "UINT64", 
		"INT8", "INT16", "INT32", "INT64", "FLOAT32", "FLOAT64", "DIGITS", "STRING", 
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
			this.state = 31;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__0) | (1 << PacketDslParser.ROOT) | (1 << PacketDslParser.PACKET) | (1 << PacketDslParser.METADATA))) !== 0)) {
				{
				this.state = 29;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case PacketDslParser.ROOT:
				case PacketDslParser.PACKET:
					{
					this.state = 26;
					this.packetDefinition();
					}
					break;
				case PacketDslParser.METADATA:
					{
					this.state = 27;
					this.metaDataDefinition();
					}
					break;
				case PacketDslParser.T__0:
					{
					this.state = 28;
					this.optionDefinition();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 33;
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
			this.state = 34;
			this.match(PacketDslParser.T__0);
			this.state = 35;
			this.match(PacketDslParser.T__1);
			this.state = 39;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PacketDslParser.IDENTIFIER) {
				{
				{
				this.state = 36;
				this.optionDeclaration();
				}
				}
				this.state = 41;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 42;
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
			this.state = 44;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 45;
			this.match(PacketDslParser.T__3);
			this.state = 46;
			this.value();
			this.state = 48;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.SEMICOLON) {
				{
				this.state = 47;
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
			this.state = 51;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.ROOT) {
				{
				this.state = 50;
				this.match(PacketDslParser.ROOT);
				}
			}

			this.state = 53;
			this.match(PacketDslParser.PACKET);
			this.state = 54;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 55;
			this.match(PacketDslParser.T__1);
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__4) | (1 << PacketDslParser.T__5) | (1 << PacketDslParser.T__6) | (1 << PacketDslParser.UINT8) | (1 << PacketDslParser.UINT16) | (1 << PacketDslParser.UINT32) | (1 << PacketDslParser.UINT64) | (1 << PacketDslParser.INT8) | (1 << PacketDslParser.INT16) | (1 << PacketDslParser.INT32) | (1 << PacketDslParser.INT64) | (1 << PacketDslParser.FLOAT32) | (1 << PacketDslParser.FLOAT64) | (1 << PacketDslParser.REPEAT) | (1 << PacketDslParser.MATCH) | (1 << PacketDslParser.IDENTIFIER))) !== 0)) {
				{
				{
				this.state = 56;
				this.fieldDefinition();
				}
				}
				this.state = 61;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 62;
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
			this.state = 86;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				_localctx = new InerObjectFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 65;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 64;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 67;
				this.inerObjectDeclaration();
				this.state = 69;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.COMMA) {
					{
					this.state = 68;
					this.match(PacketDslParser.COMMA);
					}
				}

				}
				break;

			case 2:
				_localctx = new MetaFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 72;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 71;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 74;
				this.metaDataDeclaration();
				}
				break;

			case 3:
				_localctx = new ObjectFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 76;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.REPEAT) {
					{
					this.state = 75;
					this.match(PacketDslParser.REPEAT);
					}
				}

				this.state = 78;
				this.match(PacketDslParser.IDENTIFIER);
				this.state = 80;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.COMMA) {
					{
					this.state = 79;
					this.match(PacketDslParser.COMMA);
					}
				}

				}
				break;

			case 4:
				_localctx = new MatchFieldContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 82;
				this.matchFieldDeclaration();
				this.state = 84;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.COMMA) {
					{
					this.state = 83;
					this.match(PacketDslParser.COMMA);
					}
				}

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
			this.state = 88;
			this.match(PacketDslParser.METADATA);
			this.state = 89;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 90;
			this.match(PacketDslParser.T__1);
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__4) | (1 << PacketDslParser.T__5) | (1 << PacketDslParser.T__6) | (1 << PacketDslParser.UINT8) | (1 << PacketDslParser.UINT16) | (1 << PacketDslParser.UINT32) | (1 << PacketDslParser.UINT64) | (1 << PacketDslParser.INT8) | (1 << PacketDslParser.INT16) | (1 << PacketDslParser.INT32) | (1 << PacketDslParser.INT64) | (1 << PacketDslParser.FLOAT32) | (1 << PacketDslParser.FLOAT64) | (1 << PacketDslParser.IDENTIFIER))) !== 0)) {
				{
				{
				this.state = 91;
				this.metaDataDeclaration();
				}
				}
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 97;
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
	public metaDataDeclaration(): MetaDataDeclarationContext {
		let _localctx: MetaDataDeclarationContext = new MetaDataDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, PacketDslParser.RULE_metaDataDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 99;
				this.type();
				}
				break;
			}
			this.state = 102;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 104;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.STRING_LITERAL) {
				{
				this.state = 103;
				this.match(PacketDslParser.STRING_LITERAL);
				}
			}

			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.COMMA) {
				{
				this.state = 106;
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
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, PacketDslParser.RULE_value);
		try {
			this.state = 112;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.T__4:
			case PacketDslParser.T__5:
			case PacketDslParser.T__6:
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
				this.state = 109;
				this.type();
				}
				break;
			case PacketDslParser.STRING:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 110;
				this.match(PacketDslParser.STRING);
				}
				break;
			case PacketDslParser.DIGITS:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 111;
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
		this.enterRule(_localctx, 16, PacketDslParser.RULE_type);
		let _la: number;
		try {
			this.state = 132;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 114;
				this.match(PacketDslParser.IDENTIFIER);
				}
				break;
			case PacketDslParser.UINT8:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 115;
				this.match(PacketDslParser.UINT8);
				}
				break;
			case PacketDslParser.UINT16:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 116;
				this.match(PacketDslParser.UINT16);
				}
				break;
			case PacketDslParser.UINT32:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 117;
				this.match(PacketDslParser.UINT32);
				}
				break;
			case PacketDslParser.UINT64:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 118;
				this.match(PacketDslParser.UINT64);
				}
				break;
			case PacketDslParser.INT8:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 119;
				this.match(PacketDslParser.INT8);
				}
				break;
			case PacketDslParser.INT16:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 120;
				this.match(PacketDslParser.INT16);
				}
				break;
			case PacketDslParser.INT32:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 121;
				this.match(PacketDslParser.INT32);
				}
				break;
			case PacketDslParser.INT64:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 122;
				this.match(PacketDslParser.INT64);
				}
				break;
			case PacketDslParser.FLOAT32:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 123;
				this.match(PacketDslParser.FLOAT32);
				}
				break;
			case PacketDslParser.FLOAT64:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 124;
				this.match(PacketDslParser.FLOAT64);
				}
				break;
			case PacketDslParser.T__4:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 125;
				this.match(PacketDslParser.T__4);
				}
				break;
			case PacketDslParser.T__5:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 126;
				this.match(PacketDslParser.T__5);
				}
				break;
			case PacketDslParser.T__6:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 127;
				this.match(PacketDslParser.T__6);
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === PacketDslParser.DIGITS) {
					{
					this.state = 128;
					this.match(PacketDslParser.DIGITS);
					}
				}

				this.state = 131;
				this.match(PacketDslParser.T__7);
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
		this.enterRule(_localctx, 18, PacketDslParser.RULE_matchFieldDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 134;
			this.match(PacketDslParser.MATCH);
			this.state = 135;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 136;
			this.match(PacketDslParser.T__1);
			this.state = 138;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 137;
				this.matchPair();
				}
				}
				this.state = 140;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__8) | (1 << PacketDslParser.DIGITS) | (1 << PacketDslParser.STRING))) !== 0));
			this.state = 142;
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
		this.enterRule(_localctx, 20, PacketDslParser.RULE_matchPair);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case PacketDslParser.DIGITS:
				{
				this.state = 144;
				this.match(PacketDslParser.DIGITS);
				}
				break;
			case PacketDslParser.STRING:
				{
				this.state = 145;
				this.match(PacketDslParser.STRING);
				}
				break;
			case PacketDslParser.T__8:
				{
				this.state = 146;
				this.list();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 149;
			this.match(PacketDslParser.COLON);
			this.state = 150;
			this.match(PacketDslParser.IDENTIFIER);
			this.state = 152;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === PacketDslParser.COMMA) {
				{
				this.state = 151;
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
		this.enterRule(_localctx, 22, PacketDslParser.RULE_inerObjectDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 154;
			this.match(PacketDslParser.IDENTIFIER);
			{
			this.state = 155;
			this.match(PacketDslParser.T__1);
			this.state = 157;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 156;
				this.fieldDefinition();
				}
				}
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << PacketDslParser.T__4) | (1 << PacketDslParser.T__5) | (1 << PacketDslParser.T__6) | (1 << PacketDslParser.UINT8) | (1 << PacketDslParser.UINT16) | (1 << PacketDslParser.UINT32) | (1 << PacketDslParser.UINT64) | (1 << PacketDslParser.INT8) | (1 << PacketDslParser.INT16) | (1 << PacketDslParser.INT32) | (1 << PacketDslParser.INT64) | (1 << PacketDslParser.FLOAT32) | (1 << PacketDslParser.FLOAT64) | (1 << PacketDslParser.REPEAT) | (1 << PacketDslParser.MATCH) | (1 << PacketDslParser.IDENTIFIER))) !== 0));
			this.state = 161;
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
		this.enterRule(_localctx, 24, PacketDslParser.RULE_list);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 163;
			this.match(PacketDslParser.T__8);
			this.state = 164;
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
			this.state = 169;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === PacketDslParser.COMMA) {
				{
				{
				this.state = 165;
				this.match(PacketDslParser.COMMA);
				this.state = 166;
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
				this.state = 171;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 172;
			this.match(PacketDslParser.T__7);
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03#\xB1\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x03\x02\x03\x02\x03\x02\x07\x02 \n\x02\f\x02\x0E\x02#\v\x02" +
		"\x03\x03\x03\x03\x03\x03\x07\x03(\n\x03\f\x03\x0E\x03+\v\x03\x03\x03\x03" +
		"\x03\x03\x04\x03\x04\x03\x04\x03\x04\x05\x043\n\x04\x03\x05\x05\x056\n" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x07\x05<\n\x05\f\x05\x0E\x05?\v\x05" +
		"\x03\x05\x03\x05\x03\x06\x05\x06D\n\x06\x03\x06\x03\x06\x05\x06H\n\x06" +
		"\x03\x06\x05\x06K\n\x06\x03\x06\x03\x06\x05\x06O\n\x06\x03\x06\x03\x06" +
		"\x05\x06S\n\x06\x03\x06\x03\x06\x05\x06W\n\x06\x05\x06Y\n\x06\x03\x07" +
		"\x03\x07\x03\x07\x03\x07\x07\x07_\n\x07\f\x07\x0E\x07b\v\x07\x03\x07\x03" +
		"\x07\x03\b\x05\bg\n\b\x03\b\x03\b\x05\bk\n\b\x03\b\x05\bn\n\b\x03\t\x03" +
		"\t\x03\t\x05\ts\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\x84\n\n\x03\n\x05\n\x87\n" +
		"\n\x03\v\x03\v\x03\v\x03\v\x06\v\x8D\n\v\r\v\x0E\v\x8E\x03\v\x03\v\x03" +
		"\f\x03\f\x03\f\x05\f\x96\n\f\x03\f\x03\f\x03\f\x05\f\x9B\n\f\x03\r\x03" +
		"\r\x03\r\x06\r\xA0\n\r\r\r\x0E\r\xA1\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E" +
		"\x03\x0E\x07\x0E\xAA\n\x0E\f\x0E\x0E\x0E\xAD\v\x0E\x03\x0E\x03\x0E\x03" +
		"\x0E\x02\x02\x02\x0F\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02" +
		"\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x02\x03\x03\x02\x16\x17" +
		"\x02\xCD\x02!\x03\x02\x02\x02\x04$\x03\x02\x02\x02\x06.\x03\x02\x02\x02" +
		"\b5\x03\x02\x02\x02\nX\x03\x02\x02\x02\fZ\x03\x02\x02\x02\x0Ef\x03\x02" +
		"\x02\x02\x10r\x03\x02\x02\x02\x12\x86\x03\x02\x02\x02\x14\x88\x03\x02" +
		"\x02\x02\x16\x95\x03\x02\x02\x02\x18\x9C\x03\x02\x02\x02\x1A\xA5\x03\x02" +
		"\x02\x02\x1C \x05\b\x05\x02\x1D \x05\f\x07\x02\x1E \x05\x04\x03\x02\x1F" +
		"\x1C\x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02\x1F\x1E\x03\x02\x02\x02 " +
		"#\x03\x02\x02\x02!\x1F\x03\x02\x02\x02!\"\x03\x02\x02\x02\"\x03\x03\x02" +
		"\x02\x02#!\x03\x02\x02\x02$%\x07\x03\x02\x02%)\x07\x04\x02\x02&(\x05\x06" +
		"\x04\x02\'&\x03\x02\x02\x02(+\x03\x02\x02\x02)\'\x03\x02\x02\x02)*\x03" +
		"\x02\x02\x02*,\x03\x02\x02\x02+)\x03\x02\x02\x02,-\x07\x05\x02\x02-\x05" +
		"\x03\x02\x02\x02./\x07 \x02\x02/0\x07\x06\x02\x0202\x05\x10\t\x0213\x07" +
		"\x1F\x02\x0221\x03\x02\x02\x0223\x03\x02\x02\x023\x07\x03\x02\x02\x02" +
		"46\x07\x18\x02\x0254\x03\x02\x02\x0256\x03\x02\x02\x0267\x03\x02\x02\x02" +
		"78\x07\x19\x02\x0289\x07 \x02\x029=\x07\x04\x02\x02:<\x05\n\x06\x02;:" +
		"\x03\x02\x02\x02<?\x03\x02\x02\x02=;\x03\x02\x02\x02=>\x03\x02\x02\x02" +
		">@\x03\x02\x02\x02?=\x03\x02\x02\x02@A\x07\x05\x02\x02A\t\x03\x02\x02" +
		"\x02BD\x07\x1A\x02\x02CB\x03\x02\x02\x02CD\x03\x02\x02\x02DE\x03\x02\x02" +
		"\x02EG\x05\x18\r\x02FH\x07\x1E\x02\x02GF\x03\x02\x02\x02GH\x03\x02\x02" +
		"\x02HY\x03\x02\x02\x02IK\x07\x1A\x02\x02JI\x03\x02\x02\x02JK\x03\x02\x02" +
		"\x02KL\x03\x02\x02\x02LY\x05\x0E\b\x02MO\x07\x1A\x02\x02NM\x03\x02\x02" +
		"\x02NO\x03\x02\x02\x02OP\x03\x02\x02\x02PR\x07 \x02\x02QS\x07\x1E\x02" +
		"\x02RQ\x03\x02\x02\x02RS\x03\x02\x02\x02SY\x03\x02\x02\x02TV\x05\x14\v" +
		"\x02UW\x07\x1E\x02\x02VU\x03\x02\x02\x02VW\x03\x02\x02\x02WY\x03\x02\x02" +
		"\x02XC\x03\x02\x02\x02XJ\x03\x02\x02\x02XN\x03\x02\x02\x02XT\x03\x02\x02" +
		"\x02Y\v\x03\x02\x02\x02Z[\x07\x1B\x02\x02[\\\x07 \x02\x02\\`\x07\x04\x02" +
		"\x02]_\x05\x0E\b\x02^]\x03\x02\x02\x02_b\x03\x02\x02\x02`^\x03\x02\x02" +
		"\x02`a\x03\x02\x02\x02ac\x03\x02\x02\x02b`\x03\x02\x02\x02cd\x07\x05\x02" +
		"\x02d\r\x03\x02\x02\x02eg\x05\x12\n\x02fe\x03\x02\x02\x02fg\x03\x02\x02" +
		"\x02gh\x03\x02\x02\x02hj\x07 \x02\x02ik\x07!\x02\x02ji\x03\x02\x02\x02" +
		"jk\x03\x02\x02\x02km\x03\x02\x02\x02ln\x07\x1E\x02\x02ml\x03\x02\x02\x02" +
		"mn\x03\x02\x02\x02n\x0F\x03\x02\x02\x02os\x05\x12\n\x02ps\x07\x17\x02" +
		"\x02qs\x07\x16\x02\x02ro\x03\x02\x02\x02rp\x03\x02\x02\x02rq\x03\x02\x02" +
		"\x02s\x11\x03\x02\x02\x02t\x87\x07 \x02\x02u\x87\x07\f\x02\x02v\x87\x07" +
		"\r\x02\x02w\x87\x07\x0E\x02\x02x\x87\x07\x0F\x02\x02y\x87\x07\x10\x02" +
		"\x02z\x87\x07\x11\x02\x02{\x87\x07\x12\x02\x02|\x87\x07\x13\x02\x02}\x87" +
		"\x07\x14\x02\x02~\x87\x07\x15\x02\x02\x7F\x87\x07\x07\x02\x02\x80\x87" +
		"\x07\b\x02\x02\x81\x83\x07\t\x02\x02\x82\x84\x07\x16\x02\x02\x83\x82\x03" +
		"\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x85\x03\x02\x02\x02\x85\x87\x07" +
		"\n\x02\x02\x86t\x03\x02\x02\x02\x86u\x03\x02\x02\x02\x86v\x03\x02\x02" +
		"\x02\x86w\x03\x02\x02\x02\x86x\x03\x02\x02\x02\x86y\x03\x02\x02\x02\x86" +
		"z\x03\x02\x02\x02\x86{\x03\x02\x02\x02\x86|\x03\x02\x02\x02\x86}\x03\x02" +
		"\x02\x02\x86~\x03\x02\x02\x02\x86\x7F\x03\x02\x02\x02\x86\x80\x03\x02" +
		"\x02\x02\x86\x81\x03\x02\x02\x02\x87\x13\x03\x02\x02\x02\x88\x89\x07\x1C" +
		"\x02\x02\x89\x8A\x07 \x02\x02\x8A\x8C\x07\x04\x02\x02\x8B\x8D\x05\x16" +
		"\f\x02\x8C\x8B\x03\x02\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E\x8C\x03\x02" +
		"\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02\x90\x91\x07\x05" +
		"\x02\x02\x91\x15\x03\x02\x02\x02\x92\x96\x07\x16\x02\x02\x93\x96\x07\x17" +
		"\x02\x02\x94\x96\x05\x1A\x0E\x02\x95\x92\x03\x02\x02\x02\x95\x93\x03\x02" +
		"\x02\x02\x95\x94\x03\x02\x02\x02\x96\x97\x03\x02\x02\x02\x97\x98\x07\x1D" +
		"\x02\x02\x98\x9A\x07 \x02\x02\x99\x9B\x07\x1E\x02\x02\x9A\x99\x03\x02" +
		"\x02\x02\x9A\x9B\x03\x02\x02\x02\x9B\x17\x03\x02\x02\x02\x9C\x9D\x07 " +
		"\x02\x02\x9D\x9F\x07\x04\x02\x02\x9E\xA0\x05\n\x06\x02\x9F\x9E\x03\x02" +
		"\x02\x02\xA0\xA1\x03\x02\x02\x02\xA1\x9F\x03\x02\x02\x02\xA1\xA2\x03\x02" +
		"\x02\x02\xA2\xA3\x03\x02\x02\x02\xA3\xA4\x07\x05\x02\x02\xA4\x19\x03\x02" +
		"\x02\x02\xA5\xA6\x07\v\x02\x02\xA6\xAB\t\x02\x02\x02\xA7\xA8\x07\x1E\x02" +
		"\x02\xA8\xAA\t\x02\x02\x02\xA9\xA7\x03\x02\x02\x02\xAA\xAD\x03\x02\x02" +
		"\x02\xAB\xA9\x03\x02\x02\x02\xAB\xAC\x03\x02\x02\x02\xAC\xAE\x03\x02\x02" +
		"\x02\xAD\xAB\x03\x02\x02\x02\xAE\xAF\x07\n\x02\x02\xAF\x1B\x03\x02\x02" +
		"\x02\x1B\x1F!)25=CGJNRVX`fjmr\x83\x86\x8E\x95\x9A\xA1\xAB";
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
	public REPEAT(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.REPEAT, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.COMMA, 0); }
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
	public REPEAT(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.REPEAT, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.COMMA, 0); }
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
export class MatchFieldContext extends FieldDefinitionContext {
	public matchFieldDeclaration(): MatchFieldDeclarationContext {
		return this.getRuleContext(0, MatchFieldDeclarationContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.COMMA, 0); }
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


export class MetaDataDeclarationContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
	public type(): TypeContext | undefined {
		return this.tryGetRuleContext(0, TypeContext);
	}
	public STRING_LITERAL(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.STRING_LITERAL, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(PacketDslParser.COMMA, 0); }
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
	public MATCH(): TerminalNode { return this.getToken(PacketDslParser.MATCH, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(PacketDslParser.IDENTIFIER, 0); }
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


