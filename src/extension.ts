// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from 'fs';
import * as vscode from 'vscode';
import { FileAnalyser } from './FileAnalyser';

/*
  https://code.visualstudio.com/api/working-with-extensions/publishing-extension
*/

export class ThenablePromise<T> { // extends Promise<T> {
  promise: Promise<T>;

  constructor(ten: Thenable<T>) {
    // super((resolve, reject) => ten.then(resolve, reject));
    this.promise = new Promise<T>((resolve, reject) => ten.then(resolve, reject));
  }

  async await(): Promise<T> {
    return this.promise;
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"dotup-vscode-interface-generator" activated!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('extension.dotupGenerateInterface', async () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;

    if (editor !== undefined) {
      const { document, selection } = editor;

      const out = vscode.window.createOutputChannel('Interface generator');
      out.clear();
      out.show(true);

      // Get path
      const rootPath = vscode.workspace.rootPath;
      const sourceFilePath = document.uri.fsPath;

      const fileAnalyser = new FileAnalyser(rootPath, sourceFilePath, out);

      // Generate interface
      fileAnalyser.analyseFile();

      // Is there a valid source file?
      if (fileAnalyser.fileDescriptor.isSourceValid()) {

        fileAnalyser.buildNodes();

        if (fs.existsSync(fileAnalyser.interfaceFilePath)) {
          // Delete content of existing file
          // fs.unlinkSync(fileAnalyser.interfaceFilePath);
        } else {
          // Create new interface file
          fs.closeSync(fs.openSync(fileAnalyser.interfaceFilePath, 'w'));
        }

        // Create interface file
        const interfaceFile = fileAnalyser.createInterfaceFile();

        fs.writeFileSync(fileAnalyser.interfaceFilePath, interfaceFile.text);

        // Open document
        const doc = await new ThenablePromise(vscode.workspace.openTextDocument(fileAnalyser.interfaceFilePath)).promise;

        await new ThenablePromise(vscode.window.showTextDocument(doc)).promise;

        // Insert interface text
        // const newEditor = await new ThenablePromise(vscode.window.showTextDocument(doc)).await();
        // const newEditor = await new Promise() vscode.window.showTextDocument(doc).then;
        // const endLine = newEditor.document.lineCount;
        // const lastCharIndex = newEditor.document.lineAt(endLine - 1).text.length;

        // newEditor.edit((ed) => {
        //   ed.delete(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(endLine, lastCharIndex)));
        //   ed.insert(doc.positionAt(0), interfaceFile.text);
        // });

        // // And save
        // await new ThenablePromise(doc.save()).await();

        // Display a message box to the user
        out.appendLine('Interface generation completed.');
        // await new ThenablePromise(vscode.window.showInformationMessage('Interface generation completed.')).promise;

      } else {
        vscode.window.showErrorMessage('Invalid source file!');
      }

    }

  });

  context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() { }
