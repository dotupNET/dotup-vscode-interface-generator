// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { InterfaceGenerator } from './InterfaceGenerator';
import * as path from 'path';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "dotup-vscode-interface-generator" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.dotupGenerateInterface', async () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;
    const generator = new InterfaceGenerator();
    if (editor !== undefined) {
      const { document, selection } = editor;

      const rootPath = vscode.workspace.rootPath;
      const filePath = document.uri.fsPath;
      const fileName = `I${path.basename(filePath)}`;
      const newFileName = path.join(rootPath, fileName);

      fs.closeSync(fs.openSync(newFileName, 'w'))
      const newInterface = await generator.generate(filePath);

      const doc = await vscode.workspace.openTextDocument(newFileName);
      // const doc = await vscode.workspace.openTextDocument(
      //   {
      //     content: newInterface,
      //     language: 'typescript'
      //   }
      // );


      const newEditor = await vscode.window.showTextDocument(doc);
      newEditor.edit((ed) => {
        ed.insert(doc.positionAt(0), newInterface);
      });
      await doc.save()
      // Display a message box to the user
      vscode.window.showInformationMessage(generator.resultMessage);
    }

  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
