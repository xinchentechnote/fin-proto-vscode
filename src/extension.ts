// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { formatDsl } from './parser/PacketDslFormattor';
import { parsePacketDsl } from './parser/PacketDslModelParser';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('hello fin proto');
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fin-proto-vscode" is now active!');

	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('fin-proto-vscode.format', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('未打开任何文件');
			return;
		}
		const document = editor.document;
		const originalText = document.getText();
		let formattedText: string;
		try {
			formattedText = formatDsl(originalText);
		} catch (err) {
			const error = err as Error;
			vscode.window.showErrorMessage(`格式化失败: ${error.message}`);
			console.error('Stack trace:', error.stack);
			return;
		}
		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(originalText.length)
		);

		await editor.edit(editBuilder => {
			editBuilder.replace(fullRange, formattedText);
		});
	}));
	const diagnosticCollection = vscode.languages.createDiagnosticCollection("fin-proto");
	context.subscriptions.push(diagnosticCollection);

	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => {
		parseDsl(e.document, diagnosticCollection);
	}));
	context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(document => {
		parseDsl(document, diagnosticCollection);
	}));
	//iterate all dsl file
	setTimeout(() => {
		vscode.workspace.textDocuments.forEach(doc => {
			parseDsl(doc, diagnosticCollection);
		});
	}, 3000);
	context.subscriptions.push(vscode.commands.registerCommand('fin-proto-vscode.compile', () => {
		vscode.window.showInformationMessage('compiling');
	}));
}

// This method is called when your extension is deactivated
export function deactivate() { }

// parse dsl and check
function parseDsl(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection) {
	console.log(document.languageId);
	if (document.languageId !== "packetdsl") {
		return;
	}
	diagnosticCollection.delete(document.uri);
	let binModel = parsePacketDsl(document.getText());
	let diagnostics: vscode.Diagnostic[] = [];
	binModel.syntaxErrors.forEach(error => {
		console.info(error);
		diagnostics.push(new vscode.Diagnostic(
			new vscode.Range(
				new vscode.Position(error.line - 1, error.startIndex),
				new vscode.Position(error.line - 1, error.stopIndex)
			), error.msg));
	});
	diagnosticCollection.set(document.uri, diagnostics);
}

