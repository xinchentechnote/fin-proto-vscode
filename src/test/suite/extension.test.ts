import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

const EXT_ID = 'xinchentechnote.fin-proto-vscode';

async function openDsl(content: string): Promise<vscode.TextDocument> {
	const file = path.join(os.tmpdir(), `fin-proto-it-${Date.now()}-${Math.floor(Math.random() * 1e6)}.pdsl`);
	fs.writeFileSync(file, content);
	const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(file));
	await vscode.window.showTextDocument(doc);
	return doc;
}

async function waitFor<T>(fn: () => T | undefined, timeoutMs = 6000): Promise<T> {
	const start = Date.now();
	for (;;) {
		const value = fn();
		if (value !== undefined && value !== false) {
			return value as T;
		}
		if (Date.now() - start > timeoutMs) {
			throw new Error('condition not met within timeout');
		}
		await new Promise(resolve => setTimeout(resolve, 100));
	}
}

suite('fin-proto-vscode integration', () => {
	test('extension activates', async () => {
		const extension = vscode.extensions.getExtension(EXT_ID);
		assert.ok(extension, 'extension not found');
		await extension!.activate();
		assert.ok(extension!.isActive);
	});

	test('diagnostics report duplicate packet definitions', async () => {
		const doc = await openDsl('packet A { uint32 x, }\npacket A { uint32 y, }\n');
		const diags = await waitFor(() => {
			const list = vscode.languages.getDiagnostics(doc.uri);
			return list.length > 0 ? list : undefined;
		});
		assert.ok(diags.some(d => d.message.includes('Duplicate packet definition: A')), JSON.stringify(diags.map(d => d.message)));
	});

	test('document symbols provider lists packets', async () => {
		const doc = await openDsl('root packet RootPkt {\n  uint32 id,\n}\n');
		const symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', doc.uri);
		assert.ok(symbols && symbols.length > 0, 'no symbols returned');
		assert.ok(symbols.some(s => s.name === 'RootPkt'));
	});

	test('completion provider suggests types and keywords', async () => {
		const doc = await openDsl('packet C {\n  \n}\n');
		const result = await vscode.commands.executeCommand<vscode.CompletionList>(
			'vscode.executeCompletionItemProvider', doc.uri, new vscode.Position(1, 2)
		);
		const labels = (result?.items ?? []).map(i => String(i.label));
		assert.ok(labels.includes('uint32'), `missing uint32 in [${labels}]`);
		// field-start position inside a packet: 'repeat' is valid, top-level 'packet' is not
		assert.ok(labels.includes('repeat'));
		assert.ok(!labels.includes('packet'));
	});

	test('definition provider resolves match value to packet declaration', async () => {
		const dsl = 'packet Target { uint32 x, }\nroot packet R {\n  uint32 type,\n  match type as Body {\n    1 : Target,\n  },\n}\n';
		const doc = await openDsl(dsl);
		// over "Target" on the match arm line
		const locations = await vscode.commands.executeCommand<vscode.Location[]>(
			'vscode.executeDefinitionProvider', doc.uri, new vscode.Position(4, 9)
		);
		assert.ok(locations && locations.length > 0, 'no definition location');
		assert.strictEqual(locations![0].uri.toString(), doc.uri.toString());
		assert.strictEqual(locations![0].range.start.line, 0);
	});

	test('rename provider edits declaration and references', async () => {
		const dsl = 'packet Logon { uint32 x, }\nroot packet R {\n  match t as Body {\n    1 : Logon,\n  },\n}\n';
		const doc = await openDsl(dsl);
		const edit = (await (vscode.commands as any).executeCommand(
			'vscode.executeDocumentRenameProvider', doc.uri, new vscode.Position(0, 8), 'Signon'
		)) as vscode.WorkspaceEdit;
		assert.ok(edit, 'no rename edit');
		const entries = edit!.entries();
		assert.strictEqual(entries.length, 1, 'expected one uri entry');
		assert.strictEqual(entries[0][1].length, 2, 'expected declaration + match value edits');
	});

	test('format command formats the active document', async function () {
		this.timeout(10000);
		// formatter preserves type alias spelling, but normalizes spacing
		const doc = await openDsl('packet Messy {\n  u32   id,\n}\n');
		await vscode.commands.executeCommand('fin-proto-vscode.format');
		await waitFor(() => (doc.getText().includes('u32 id,') ? doc.getText() : undefined));
		assert.ok(doc.getText().includes('u32 id,'));
	});

	test('workspace symbol provider finds indexed packets', async () => {
		await openDsl('packet WorkspaceFindable { uint32 x, }\n');
		// wait past the diagnostic debounce so the workspace index picks it up
		await new Promise(resolve => setTimeout(resolve, 800));
		const symbols = await (vscode.commands as any).executeCommand(
			'vscode.executeWorkspaceSymbolProvider', 'WorkspaceFindable'
		) as vscode.SymbolInformation[];
		assert.ok(symbols && symbols.some((s: vscode.SymbolInformation) => s.name === 'WorkspaceFindable'), 'packet not found in workspace symbols');
	});

	test('reference provider finds declaration and match values', async () => {
		const dsl = 'packet Logon { uint32 x, }\nroot packet R {\n  uint32 type,\n  match type as Body {\n    1 : Logon,\n  },\n}\n';
		const doc = await openDsl(dsl);
		const refs = await vscode.commands.executeCommand<vscode.Location[]>(
			'vscode.executeReferenceProvider', doc.uri, new vscode.Position(0, 8), { includeDeclaration: true }
		);
		assert.ok(refs && refs.length === 2, `expected declaration + match value, got ${refs?.length}`);
	});

	test('code actions offer MetaData skeleton for unknown field types', async () => {
		const doc = await openDsl('packet P {\n  DataType myDate,\n}\n');
		// wait for diagnostics to be produced, then request code actions at that position
		await waitFor(() => (vscode.languages.getDiagnostics(doc.uri).length > 0 ? true : undefined));
		const actions = await vscode.commands.executeCommand<vscode.CodeAction[]>(
			'vscode.executeCodeActionProvider', doc.uri, new vscode.Range(1, 2, 1, 10)
		);
		assert.ok(actions && actions.some(a => a.title === '创建 MetaData "DataType"'), `got [${actions?.map(a => a.title)}]`);
	});
});
