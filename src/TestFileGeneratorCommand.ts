// tslint:disable-next-line: max-line-length
import { FileAnalyser, IRegisterCommandHandler, SourceFileWriter, TargetFileDescriptor, TestGenerator, ThenablePromise } from 'dotup-vscode-api-extensions';
import * as path from 'path';
import { OutputChannel, Uri, window, workspace } from 'vscode';
import { CommandNames } from './extension';

/*
  https://code.visualstudio.com/api/working-with-extensions/publishing-extension
*/

export class TestFileGeneratorCommand implements IRegisterCommandHandler {
  readonly kind: 'IRegisterCommandHandler';

  constructor() {
    this.kind = 'IRegisterCommandHandler';
  }
  kindo: 'IRegisterCommandHandler';

  commandName: string = CommandNames.generateTestFile;

  // tslint:disable-next-line: no-any
  async callback(sourceFile: Uri): Promise<void> {
    // The code you place here will be executed every time your command is executed

    const out = window.createOutputChannel('Testfile generator');
    out.clear();
    out.show(true);

    try {
      const editor = window.activeTextEditor;

      if (editor !== undefined) {
        const { document, selection } = editor;
        await this.createTestFile(document.uri.fsPath, out);
      }

    } catch (error) {
      // tslint:disable-next-line: no-unsafe-any
      out.appendLine(error.message);
      console.error(error);
    }
  }

  async createTestFile(sourceFilePath: string, out: OutputChannel): Promise<void> {

    // Analyse source file
    const fileAnalyser = new FileAnalyser();
    const sourceDescriptor = fileAnalyser.analyseFile(sourceFilePath, out);

    // Is there a valid source file?
    if (sourceDescriptor.isSourceValid()) {

      // get some path
      const rootPath = path.dirname(sourceFilePath);
      const targetFilePath = path.join(rootPath, `${path.basename(sourceFilePath, '.ts')}.test.ts`);

      // create our test generator
      const tg = new TestGenerator();
      const nodes = tg.generateClassMethodCalls(sourceDescriptor.classDescriptors[0]);

      // Create target
      const targetDescriptor = new TargetFileDescriptor(targetFilePath);
      targetDescriptor.nodes = nodes;

      // Write to file
      const fileWriter = new SourceFileWriter();
      fileWriter.write(targetDescriptor);

      // Open document
      const doc = await new ThenablePromise(workspace.openTextDocument(targetDescriptor.targetFilePath)).promise;

      // Show document
      await new ThenablePromise(window.showTextDocument(doc)).promise;

      // Display a message box to the user
      out.appendLine(`Test file generated. File: ${path.basename(targetFilePath)}`);

    } else {
      window.showErrorMessage('Invalid source file!');
    }
  }

}
