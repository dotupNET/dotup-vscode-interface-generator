// tslint:disable-next-line: max-line-length
import { FileAnalyser, InterfaceGenerator, IRegisterCommandHandler, SourceFileWriter, SourceToTargetFileConverter, ThenablePromise } from 'dotup-vscode-api-extensions';
import * as path from 'path';
import { OutputChannel, window, workspace } from 'vscode';

/*
  https://code.visualstudio.com/api/working-with-extensions/publishing-extension
*/

export class InterfaceGeneratorCommand implements IRegisterCommandHandler {
  readonly kind: 'IRegisterCommandHandler';

  constructor() {
    this.kind = 'IRegisterCommandHandler';
  }
  kindo: 'IRegisterCommandHandler';

  commandName: string = 'extension.dotupGenerateInterface';

  // tslint:disable-next-line: no-any
  async callback(...args: any[]): Promise<void> {
    // The code you place here will be executed every time your command is executed
    const editor = window.activeTextEditor;

    if (editor !== undefined) {
      const { document, selection } = editor;

      const out = window.createOutputChannel('Interface generator');
      out.clear();
      out.show(true);

      await this.createInterface(document.uri.fsPath, out);

    }

  }

  async createInterface(sourceFilePath: string, out: OutputChannel): Promise<void> {

    // Analyse source file
    const fileAnalyser = new FileAnalyser();
    const sourceDescriptor = fileAnalyser.analyseFile(sourceFilePath, out);

    // Is there a valid source file?
    if (sourceDescriptor.isSourceValid()) {

      // get some path
      const rootPath = path.dirname(sourceFilePath);
      const interfaceFilePath = path.join(rootPath, `I${path.basename(sourceFilePath)}`);

      // create our builder and source to target converter
      const builder = new InterfaceGenerator();
      const converter = new SourceToTargetFileConverter();

      const generatedNames = sourceDescriptor.classDescriptors.map(item => item.interfaceName);

      // Do some output
      generatedNames.forEach(item => out.appendLine(`Interface ${item} generated.`));

      // build nodes from source
      const targetDescriptor = converter.buildNodes(interfaceFilePath, sourceDescriptor, builder);

      // fileAnalyser.buildNodes();
      const fileWriter = new SourceFileWriter();
      fileWriter.write(targetDescriptor);

      // Open document
      const doc = await new ThenablePromise(workspace.openTextDocument(targetDescriptor.targetFilePath)).promise;

      await new ThenablePromise(window.showTextDocument(doc)).promise;

      // Insert interface text
      // const newEditor = await new ThenablePromise(window.showTextDocument(doc)).await();
      // const newEditor = await new Promise() window.showTextDocument(doc).then;
      // const endLine = newEditor.document.lineCount;
      // const lastCharIndex = newEditor.document.lineAt(endLine - 1).text.length;

      // newEditor.edit((ed) => {
      //   ed.delete(new Range(new Position(0, 0), new Position(endLine, lastCharIndex)));
      //   ed.insert(doc.positionAt(0), interfaceFile.text);
      // });

      // // And save
      // await new ThenablePromise(doc.save()).await();

      // Display a message box to the user
      out.appendLine(`Interface generation completed. File: ${path.basename(interfaceFilePath)}`);
      // await new ThenablePromise(window.showInformationMessage('Interface generation completed.')).promise;

    } else {
      window.showErrorMessage('Invalid source file!');
    }
  }

}
