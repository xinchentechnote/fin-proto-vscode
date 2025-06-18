// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {parsePacketDsl} from "./parser/PacketDslModelParser";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.window.showInformationMessage('hello fin proto');
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "fin-proto-vscode" is now active!');

	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('fin-proto-vscode.format', () => {
		parsePacketDsl("hello");
		vscode.window.showInformationMessage('format fin proto');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('fin-proto-vscode.compile', () => {
		vscode.window.showInformationMessage('compiling');
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
