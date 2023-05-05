// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "cursornumber" is now active!');

	let disposable = vscode.commands.registerCommand('cursornumber.cursorNumber', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		
		const selections = editor.selections;
		const selection = editor.selection;

		
		if (selections.length > 1) {
			editor.edit((editBuilder) => {
				editor.selections.forEach((selection, index) => {
					const line = selection.active.line;
					const column = selection.active.character;
					const textToInsert = `${index + 1}`;
					const position = new vscode.Position(line, column);
					editBuilder.insert(position, textToInsert);
				});
			});
			return;
		}
		
		editor.edit(editBuilder => {
			let lineNumber=1;
			for (let i = selection.start.line; i <= selection.end.line; i++) {
				editBuilder.insert(new vscode.Position(i, 0), `${lineNumber} `);
				lineNumber++;
			}
		});


	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}


    
