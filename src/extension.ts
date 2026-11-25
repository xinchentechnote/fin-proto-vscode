import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { formatDsl } from './parser/PacketDslFormattor';
import { parsePacketDsl } from './parser/PacketDslModelParser';
import { computeCompletions, snippetBodies, DslCompletionItem } from './parser/PacketDslCompletion';
import { BinaryModel } from './parser/model';
import { buildDocumentSymbols, computeFoldingRanges, resolveDefinition, FlatSymbol } from './parser/PacketDslNavigation';

const PACKETDSL = { language: 'packetdsl' };
const DIAGNOSTIC_DEBOUNCE_MS = 300;
const COMPILE_TARGETS = [
  { label: 'Go', flag: '-g' },
  { label: 'Java', flag: '-j' },
  { label: 'Rust', flag: '-r' },
  { label: 'Lua', flag: '-l' },
  { label: 'Python', flag: '-p' },
  { label: 'C++', flag: '-c' },
];

export function activate(context: vscode.ExtensionContext) {
	const diagnosticCollection = vscode.languages.createDiagnosticCollection('fin-proto');
	const outputChannel = vscode.window.createOutputChannel('fin-proto');
	context.subscriptions.push(diagnosticCollection, outputChannel);

	// parsed models keyed by document uri, reused by completions between edits
	const modelCache = new Map<string, { version: number; model: BinaryModel }>();

	const getModel = (document: vscode.TextDocument): BinaryModel => {
		const cached = modelCache.get(document.uri.toString());
		if (cached && cached.version === document.version) {
			return cached.model;
		}
		const model = parsePacketDsl(document.getText());
		modelCache.set(document.uri.toString(), { version: document.version, model });
		return model;
	};

	const formatDocument = (document: vscode.TextDocument): string => {
		try {
			return formatDsl(document.getText());
		} catch (err) {
			const error = err as Error;
			vscode.window.showErrorMessage(`格式化失败: ${error.message}`);
			outputChannel.appendLine(`format error: ${error.stack ?? error.message}`);
			return document.getText();
		}
	};

	context.subscriptions.push(
		vscode.commands.registerCommand('fin-proto-vscode.format', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showErrorMessage('未打开任何文件');
				return;
			}
			const formatted = formatDocument(editor.document);
			const original = editor.document.getText();
			if (formatted === original) {
				return;
			}
			await editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(original.length)),
					formatted
				);
			});
		}),
		vscode.languages.registerDocumentFormattingEditProvider(PACKETDSL, {
			provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
				const formatted = formatDocument(document);
				const original = document.getText();
				if (formatted === original) {
					return [];
				}
				return [
					vscode.TextEdit.replace(
						new vscode.Range(document.positionAt(0), document.positionAt(original.length)),
						formatted
					)
				];
			}
		})
	);

	// diagnostics with debounce so every keystroke does not trigger a full reparse
	const pending = new Map<string, ReturnType<typeof setTimeout>>();
	const scheduleParse = (document: vscode.TextDocument) => {
		if (document.languageId !== PACKETDSL.language) {
			return;
		}
		const key = document.uri.toString();
		const existing = pending.get(key);
		if (existing) {
			clearTimeout(existing);
		}
		pending.set(key, setTimeout(() => {
			pending.delete(key);
			if (document.isClosed) {
				return;
			}
			const model = getModel(document);
			const diagnostics = model.syntaxErrors.map(error =>
				new vscode.Diagnostic(
					new vscode.Range(new vscode.Position(error.line - 1, error.startIndex), new vscode.Position(error.line - 1, error.stopIndex)),
					error.msg
				)
			);
			diagnosticCollection.set(document.uri, diagnostics);
		}, DIAGNOSTIC_DEBOUNCE_MS));
	};

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => scheduleParse(e.document)),
		vscode.workspace.onDidOpenTextDocument(scheduleParse),
		vscode.workspace.onDidCloseTextDocument(document => {
			const key = document.uri.toString();
			const timer = pending.get(key);
			if (timer) {
				clearTimeout(timer);
				pending.delete(key);
			}
			modelCache.delete(key);
			diagnosticCollection.delete(document.uri);
		})
	);
	vscode.workspace.textDocuments.forEach(scheduleParse);

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			PACKETDSL,
			{
				provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
					const model = getModel(document);
					const textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
					const items = computeCompletions(textBeforeCursor, model);
					return items.map(item => toVscodeCompletionItem(item));
				}
			},
			'@', '='
		),
		vscode.languages.registerDefinitionProvider(PACKETDSL, {
			provideDefinition(document: vscode.TextDocument, position: vscode.Position): vscode.Location[] {
				const wordRange = document.getWordRangeAtPosition(position);
				if (!wordRange) {
					return [];
				}
				const word = document.getText(wordRange);
				const model = getModel(document);
				const target = resolveDefinition(model, word, position.line + 1);
				if (!target) {
					return [];
				}
				return [
					new vscode.Location(
						document.uri,
						new vscode.Range(new vscode.Position(target.line - 1, target.col), new vscode.Position(target.line - 1, target.col + target.name.length))
					)
				];
			}
		}),
		vscode.languages.registerHoverProvider(PACKETDSL, {
			provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
				const wordRange = document.getWordRangeAtPosition(position);
				if (!wordRange) {
					return undefined;
				}
				const word = document.getText(wordRange);
				const model = getModel(document);
				const target = resolveDefinition(model, word, position.line + 1);
				if (!target) {
					return undefined;
				}
				const kindLabel = { metaBlock: 'MetaData', meta: 'MetaData 字段', packet: 'Packet', field: 'Field' }[target.kind];
				const md = new vscode.MarkdownString(`**${kindLabel}** \`${target.name}\``);
				if (target.detail) {
					md.appendText(`\n\n${target.detail}`);
				}
				return new vscode.Hover(md, wordRange);
			}
		}),
		vscode.languages.registerDocumentSymbolProvider(PACKETDSL, {
			provideDocumentSymbols(document: vscode.TextDocument): vscode.DocumentSymbol[] {
				const model = getModel(document);
				const flat = buildDocumentSymbols(model, document.getText());
				return flat.map(toDocumentSymbol);
			}
		}),
		vscode.languages.registerFoldingRangeProvider(PACKETDSL, {
			provideFoldingRanges(document: vscode.TextDocument): vscode.FoldingRange[] {
				return computeFoldingRanges(document.getText()).map(r =>
					new vscode.FoldingRange(r.startLine, r.endLine)
				);
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('fin-proto-vscode.compile', () => compileActiveDocument(outputChannel))
	);
}

function toDocumentSymbol(flat: FlatSymbol): vscode.DocumentSymbol {
	const range = new vscode.Range(new vscode.Position(Math.max(flat.line - 1, 0), flat.col), new vscode.Position(Math.max(flat.line - 1, 0), flat.col + flat.name.length));
	const symbol = new vscode.DocumentSymbol(
		flat.name,
		flat.detail ?? '',
		symbolKind(flat.kind),
		range,
		range
	);
	for (const child of flat.children) {
		symbol.children.push(toDocumentSymbol(child));
	}
	return symbol;
}

function symbolKind(kind: FlatSymbol['kind']): vscode.SymbolKind {
	switch (kind) {
		case 'packet': return vscode.SymbolKind.Class;
		case 'metadata': return vscode.SymbolKind.Struct;
		case 'match': return vscode.SymbolKind.Enum;
		case 'matchPair': return vscode.SymbolKind.EnumMember;
		case 'innerObject': return vscode.SymbolKind.Object;
		case 'options': return vscode.SymbolKind.Namespace;
		default: return vscode.SymbolKind.Field;
	}
}

function toVscodeCompletionItem(item: DslCompletionItem): vscode.CompletionItem {
	const completion = new vscode.CompletionItem(item.label, completionKind(item.kind));
	completion.detail = item.detail;
	const body = snippetBodies[item.label];
	if (body) {
		completion.insertText = new vscode.SnippetString(body);
		completion.kind = vscode.CompletionItemKind.Snippet;
	}
	return completion;
}

function completionKind(kind: DslCompletionItem['kind']): vscode.CompletionItemKind {
	switch (kind) {
		case 'keyword': return vscode.CompletionItemKind.Keyword;
		case 'type': return vscode.CompletionItemKind.Unit;
		case 'attribute': return vscode.CompletionItemKind.Property;
		case 'metadata': return vscode.CompletionItemKind.Struct;
		case 'packet': return vscode.CompletionItemKind.Class;
		case 'field': return vscode.CompletionItemKind.Field;
		case 'option': return vscode.CompletionItemKind.Enum;
		case 'optionValue': return vscode.CompletionItemKind.EnumMember;
		default: return vscode.CompletionItemKind.Text;
	}
}

/**
 * Compile the active DSL file by invoking the fin-protoc CLI.
 * The binary location can be configured via the `finProto.protocPath` setting.
 */
async function compileActiveDocument(outputChannel: vscode.OutputChannel) {
	const editor = vscode.window.activeTextEditor;
	if (!editor || editor.document.languageId !== PACKETDSL.language) {
		vscode.window.showErrorMessage('请先打开一个 packetdsl 文件');
		return;
	}
	const document = editor.document;
	if (document.isUntitled) {
		vscode.window.showErrorMessage('请先保存文件后再编译');
		return;
	}

	const targets = await vscode.window.showQuickPick(COMPILE_TARGETS, {
		canPickMany: true,
		placeHolder: '选择编译目标语言'
	});
	if (!targets || targets.length === 0) {
		return;
	}

	const config = vscode.workspace.getConfiguration('finProto');
	const binary = config.get<string>('protocPath', 'fin-protoc');
	const configuredOutDir = config.get<string>('outputDir', '').trim();
	const outDir = configuredOutDir || path.join(path.dirname(document.fileName), 'gen');
	const dslPath = document.fileName;

	outputChannel.show(true);
	outputChannel.appendLine(`> ${binary} compile -f ${dslPath}`);
	document.save();

	const args = ['compile', '-f', dslPath];
	for (const target of targets) {
		const dir = path.join(outDir, target.label.toLowerCase());
		fs.mkdirSync(dir, { recursive: true });
		args.push(target.flag, dir);
	}

	const child = spawn(binary, args, { shell: process.platform === 'win32' });
	let output = '';
	child.stdout.on('data', data => { output += data; });
	child.stderr.on('data', data => { output += data; });
	child.on('error', err => {
		outputChannel.appendLine(String(err));
		vscode.window.showErrorMessage(`无法启动 ${binary}，请通过 finProto.protocPath 配置编译器路径。详情见 fin-proto 输出通道。`);
	});
	child.on('close', code => {
		if (output) {
			outputChannel.appendLine(output);
		}
		if (code === 0) {
			vscode.window.showInformationMessage(`编译成功: ${targets.map(t => t.label).join(', ')} → ${outDir}`);
		} else {
			vscode.window.showErrorMessage(`编译失败 (exit ${code})，详情见 fin-proto 输出通道。`);
		}
	});
}

export function deactivate() { }
