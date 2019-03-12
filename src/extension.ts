// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { VsCodeExtensions } from 'dotup-vscode-api-extensions';
import { ExtensionContext } from 'vscode';
import { InterfaceGeneratorCommand } from './InterfaceGeneratorCommand';
import { InterfaceGeneratorCommand1 } from './InterfaceGeneratorCommand.1';
/*
  https://code.visualstudio.com/api/working-with-extensions/publishing-extension
*/

export enum CommandNames {
  generateInterface = 'extension.dotupGenerateInterface',
  generateTestFile = 'extension.dotupGenerateTestFile'
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// tslint:disable-next-line: max-func-body-length
export function activate(context: ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('"dotup-vscode-interface-generator" activated!');

  const ex = new VsCodeExtensions(context);
  ex.addCommand(new InterfaceGeneratorCommand1());
  ex.registerCommands();

  // // The command has been defined in the package.json file
  // // Now provide the implementation of the command with registerCommand
  // // The commandId parameter must match the command field in package.json
  // const disposable = commands.registerCommand('extension.dotupGenerateInterface', async () => {
  //   // The code you place here will be executed every time your command is executed
  //   const editor = window.activeTextEditor;

  //   if (editor !== undefined) {
  //     const { document, selection } = editor;

  //     const out = window.createOutputChannel('Interface generator');
  //     out.clear();
  //     out.show(true);

  //     // Get path
  //     //      const rootPath = workspace.rootPath;
  //     const sourceFilePath = document.uri.fsPath;

  //     const fileAnalyser = new FileAnalyser(sourceFilePath, out);

  //     // Generate interface
  //     fileAnalyser.analyseFile();

  //     // Is there a valid source file?
  //     if (fileAnalyser.fileDescriptor.isSourceValid()) {

  //       fileAnalyser.buildNodes();

  //       if (fs.existsSync(fileAnalyser.interfaceFilePath)) {
  //         // Delete content of existing file
  //         // fs.unlinkSync(fileAnalyser.interfaceFilePath);
  //       } else {
  //         // Create new interface file
  //         fs.closeSync(fs.openSync(fileAnalyser.interfaceFilePath, 'w'));
  //       }

  //       // Create interface file
  //       const interfaceFile = fileAnalyser.createInterfaceFile();

  //       fs.writeFileSync(fileAnalyser.interfaceFilePath, interfaceFile.text);

  //       // Open document
  //       const doc = await new ThenablePromise(workspace.openTextDocument(fileAnalyser.interfaceFilePath)).promise;

  //       await new ThenablePromise(window.showTextDocument(doc)).promise;

  //       // Insert interface text
  //       // const newEditor = await new ThenablePromise(window.showTextDocument(doc)).await();
  //       // const newEditor = await new Promise() window.showTextDocument(doc).then;
  //       // const endLine = newEditor.document.lineCount;
  //       // const lastCharIndex = newEditor.document.lineAt(endLine - 1).text.length;

  //       // newEditor.edit((ed) => {
  //       //   ed.delete(new Range(new Position(0, 0), new Position(endLine, lastCharIndex)));
  //       //   ed.insert(doc.positionAt(0), interfaceFile.text);
  //       // });

  //       // // And save
  //       // await new ThenablePromise(doc.save()).await();

  //       // Display a message box to the user
  //       out.appendLine('Interface generation completed.');
  //       // await new ThenablePromise(window.showInformationMessage('Interface generation completed.')).promise;

  //     } else {
  //       window.showErrorMessage('Invalid source file!');
  //     }

  //   }

  // });

  // context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() { }
