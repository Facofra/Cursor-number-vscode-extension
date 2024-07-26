// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function obtenerValores(value:string) {
	const valores = value.split(",");
	if (valores.length <= 2) {
		return valores;
	}
	
	const firstTwo = valores.splice(0, 2);
	const result = [...firstTwo, valores.join(",")];
	return result;

}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('cursornumber.cursorNumber', () => {
		// The code you place here will be executed every time your command is executed

		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}
		
		const selections = editor.selections;
		
		// Si hay multicursor, en cada cursos poner numero de cursor
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

		
		const selection = editor.selection;
		const cursorLine = editor.document.lineAt(selection.active.line);

		// si hay seleccion, indicar numero al principio de cada linea
		if(! selection.start.isEqual(selection.end) ){

			editor.edit(editBuilder => {
				let lineNumber=1;
				for (let i = selection.start.line; i <= selection.end.line; i++) {
					editBuilder.insert(new vscode.Position(i, 0), `${lineNumber} `);
					lineNumber++;
				}
			});
			return;
		}

		// si el cursor está en una linea no vacía, pedir cuantas copias quiero
		if(cursorLine.text.length != 0){
			vscode.window.showInputBox({
				prompt: "n° de copias requeridas",
				placeHolder: "10",
				value: ""
			}).then(function (value:string='1') {
				const numeroDeCopias = parseInt(value);
				const lineText = cursorLine.text;
				
				let textToInsert='';
				for (let i = 1; i < numeroDeCopias; i++) {
					textToInsert += `\n${lineText}`;
				}

				// solo copiar si queremos mas de 1 copia
				if (numeroDeCopias > 1) {
					editor.edit(editBuilder => {
						editBuilder.insert(new vscode.Position(selection.active.line, lineText.length), `${textToInsert}`);
					});
				}
				
	
			});
		}



		
		
		// si el cursor esta en una linea vacia, pedir cuantas lineas insertar, si insertar numero, y texto a agregar
		if(cursorLine.text.length == 0){
			vscode.window.showInputBox({
				prompt: "n° de líneas a insertar,(t|f) insertamos número de línea?,texto",
				placeHolder: "10,t,ejemplo",
				value: ""
			}).then(function (value) {
				let valores = obtenerValores(`${value}`);
				
				let numberOfLines = parseInt(valores[0]) || 0;
				let printNumbers = valores[1] || 't';
				let texto = valores[2] || '';
	
				let lineNumber=1;
				let textToInsert ="";
				for (let i = selection.start.line; i < selection.start.line + numberOfLines; i++) {
					if (printNumbers.toLowerCase() == 't') {
						textToInsert += `${lineNumber} `;
					}
					
					if (texto != '') {
						textToInsert += texto;
					}
	
					textToInsert += `\n`;
					lineNumber++;
				}
				
				editor.edit(editBuilder => {
					editBuilder.insert(selection.start, textToInsert);
				});
	
			});
		
		}




	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}


    
