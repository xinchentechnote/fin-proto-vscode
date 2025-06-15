import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { PacketDslLexer } from './antlr4/PacketDslLexer';
import { PacketDslParser } from './antlr4/PacketDslParser';

export function parseInput(text: string) {
    const inputStream = CharStreams.fromString(text);
    const lexer = new PacketDslLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new PacketDslParser(tokenStream);

    const tree = parser.packet(); // packet 是 entry rule
    console.log('Parsed:', tree.toStringTree(parser.ruleNames));
}
