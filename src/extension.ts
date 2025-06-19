// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { formatDsl } from './parser/PacketDslFormattor';

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
			vscode.window.showErrorMessage(`格式化失败: ${(err as Error).message}`);
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
	context.subscriptions.push(vscode.commands.registerCommand('fin-proto-vscode.compile', () => {
		vscode.window.showInformationMessage('compiling');
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
