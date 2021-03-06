// tslint:disable-next-line: max-line-length
import { IRegisterCommandHandler, NodeGenerator, NodePrinter, SourceFileWriter, TargetFileDescriptor, ThenablePromise, tools } from 'dotup-vscode-api-extensions';
import Project, { SourceFile } from 'ts-morph';
import * as vscode from 'vscode';
import { CommandNames } from './extension';
import { Path } from './Path';

/*
  https://code.visualstudio.com/api/working-with-extensions/publishing-extension
*/

export class InterfaceGeneratorCommand1 implements IRegisterCommandHandler {
  readonly kind: 'IRegisterCommandHandler';

  constructor() {
    this.kind = 'IRegisterCommandHandler';
  }
  kindo: 'IRegisterCommandHandler';

  commandName: string = CommandNames.generateInterface;

  // tslint:disable-next-line: no-any
  async callback(...args: any[]): Promise<void> {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;

    if (editor !== undefined) {
      const { document, selection } = editor;

      const out = vscode.window.createOutputChannel('Interface generator');
      out.clear();
      out.show(true);

      try {
        await this.createInterface(document.uri, out);
      } catch (error) {
        if (error instanceof Error) {
          out.appendLine(error.message);
          vscode.window.showErrorMessage(error.message);
        }
      }

    }

  }

  async createInterface(sourceFilePath: vscode.Uri, out: vscode.OutputChannel): Promise<void> {

    const dir = tools.dirname(sourceFilePath.fsPath);
    // const rootPath = vscode.workspace.getWorkspaceFolder(vscode.Uri.parse(dir));

    const rootPath = Path.dirname(sourceFilePath.fsPath);
    const targetFilePath = Path.join(rootPath, `I${Path.basename(sourceFilePath.fsPath)}`);

    out.appendLine(`Analysing file: ${targetFilePath}`);

    const project = new Project();
    project.addExistingSourceFiles(sourceFilePath.fsPath);
    // project.addExistingSourceFiles(`${dir}/**/*.ts`);

    // Source and target SourceFile
    const sourceSourceFile = project.getSourceFileOrThrow(sourceFilePath.fsPath);
    const targetSourceFile = project.createSourceFile(tools.basename(sourceFilePath.fsPath));

    // Get import declarations from source and add it to target source file
    this.insertImports(sourceSourceFile, targetSourceFile);

    // Get all class declarations
    this.insertInterfaces(sourceSourceFile, targetSourceFile, out);

    // Generated by..
    this.insertHeader(targetSourceFile);

    // Write to disk
    const text = targetSourceFile.getFullText();
    this.writeFiletoDisk(targetFilePath, text);

    // Open document
    await this.openDocument(targetFilePath);

    out.appendLine(`Interface generation completed. File: ${targetFilePath}`);

  }
  insertImports(sourceSourceFile: SourceFile, targetSourceFile: SourceFile): void {
    const imps = sourceSourceFile.getImportDeclarations();
    const importStructure = imps.map(x => x.getStructure());
    targetSourceFile.addImportDeclarations(importStructure);
  }

  insertInterfaces(sourceSourceFile: SourceFile, targetSourceFile: SourceFile, out: vscode.OutputChannel): void {
    const classes = sourceSourceFile.getClasses();

    if (classes.length < 1) {
      throw new Error(`No class declarations in file.`);
    }

    classes.forEach(c => {
      const iname = `I${c.getName()}`;
      const interfaceStructure = c.extractInterface(iname);
      interfaceStructure.isExported = true;
      targetSourceFile.addInterface(interfaceStructure);

      out.appendLine(`Interface ${iname} generated.`);
    });
  }

  insertHeader(targetFile: SourceFile): void {
    const comment = NodeGenerator.getMultiLineComment(
      'File generated by Interface generator (dotup.dotup-vscode-interface-generator)',
      // tslint:disable-next-line: newline-per-chained-call
      `Date: ${tools.getCurrentIsoDate()}`
    );
    const header = NodePrinter.printNode(comment);

    targetFile.insertText(0, writer => {
      writer
        .writeLine(header)
        // .newLine()
        ;
    });
  }

  private async openDocument(targetFilePath: string): Promise<void> {
    const doc = await new ThenablePromise(vscode.workspace.openTextDocument(targetFilePath)).promise;
    await new ThenablePromise(vscode.window.showTextDocument(doc)).promise;
  }

  private writeFiletoDisk(targetFilePath: string, fileContent: string): void {
    const fileWriter = new SourceFileWriter();
    const targetDescriptor = new TargetFileDescriptor(targetFilePath);
    fileWriter.writeString(targetDescriptor, fileContent);
  }

}
