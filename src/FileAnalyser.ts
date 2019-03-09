import * as fs from 'fs';
import * as path from 'path';
// tslint:disable-next-line: max-line-length
import { ClassDeclaration, createIdentifier, createImportDeclaration, createPrinter, createSourceFile, createStringLiteral, createToken, EmitHint, ImportDeclaration, NewLineKind, Node, ScriptKind, ScriptTarget, SourceFile, SyntaxKind } from 'typescript';
import { OutputChannel } from 'vscode';
import { ClassAnalyer } from './ClassAnalyer';
import { FileDescriptor } from './FileDescriptor';
import { InterfaceDescriptor } from './InterfaceDescriptor';
import { InterfaceGenerator } from './InterfaceGenerator';

// https://medium.com/@marvin_78330/creating-typescript-with-the-typescript-compiler-ac3370701d7f

export class FileAnalyser {

  // resultMessage: string;

  fileDescriptor: FileDescriptor;
  readonly rootPath: string;
  interfaceFilePath: string;
  out: OutputChannel;

  constructor(sourceFilePath: string, out: OutputChannel) {
    this.rootPath = path.dirname(sourceFilePath);
    this.interfaceFilePath = path.join(this.rootPath, `I${path.basename(sourceFilePath)}`);
    this.fileDescriptor = new FileDescriptor(sourceFilePath);
    this.out = out;
  }

  analyseFile(): void {
    const fd = this.fileDescriptor;

    this.out.appendLine(`Analysing file ${fd.sourceFilePath}`);

    // tslint:disable-next-line: non-literal-fs-path
    fd.sourceFileContent = fs.readFileSync(fd.sourceFilePath, 'utf-8');
    const sourceFile = createSourceFile(fd.sourceFilePath, fd.sourceFileContent, ScriptTarget.Latest, true);

    const syntaxList = sourceFile
      .getChildren()
      .find(item => item.kind === SyntaxKind.SyntaxList);

    fd.syntaxList = syntaxList;

    fd.importClause = syntaxList
      .getChildren()
      .filter(item => item.kind === SyntaxKind.ImportDeclaration);

    fd.classDeclarations = syntaxList
      .getChildren()
      .filter(item => item.kind === SyntaxKind.ClassDeclaration);

    if (fd.isSourceValid()) {

      // imports
      const imports = this.getImports(fd.importClause);
      fd.importDeclarations = imports;

      // Get all class declarations
      fd.classDeclarations.forEach(c => {

        const ca = new ClassAnalyer();
        const ifd = ca.getInterfaceDescriptor(<ClassDeclaration>c);
        fd.interfaceDescriptors.push(ifd);

      });

    } else {
      this.out.appendLine('Invalid source file!');
    }

    // this.visit(sourceFile);
  }

  buildNodes(): void {
    const result: Node[] = [];

    const fd = this.fileDescriptor;

    // Imports
    if (fd.importDeclarations.length >= 0) {

      fd.importDeclarations.forEach(item => result.push(item));

      // New line
      result.push(createToken(SyntaxKind.NewLineTrivia));

    }

    const generator = new InterfaceGenerator();

    // For each interface
    fd.interfaceDescriptors.forEach(item => {

      this.out.appendLine(`Build nodes for ${item.interfaceName}`);

      const interfaceNodes = generator.buildNodes(item);
      result.push(...interfaceNodes);

    });

    fd.nodes = result;
  }

  createInterfaceFile(): SourceFile {
    const result: string[] = [];

    const resultFile = createSourceFile(
      this.interfaceFilePath,
      '',
      ScriptTarget.Latest,
      false,
      ScriptKind.TS
    );

    const printer = createPrinter(
      {
        newLine: NewLineKind.CarriageReturnLineFeed
      },
      {
        substituteNode(hint, node) {
          // perform substitution if necessary...
          return node;
        }
      }
    );

    // const result = printer.printNode(
    //   EmitHint.Unspecified,
    //   node,
    //   resultFile
    // );

    if (this.fileDescriptor.nodes.length > 0) {
      this.out.appendLine(`Printing nodes`);

      this.fileDescriptor.nodes.forEach(item => {
        const x = printer.printNode(EmitHint.Unspecified, item, resultFile);
        result.push(x);
        console.log(x);
      });

      resultFile.text = result.join('\n');
    } else {
      this.out.appendLine('No nodes to print!');
    }

    return resultFile;
  }

  getImports(importClause: Node[]): ImportDeclaration[] {
    return importClause.map(item => {
      const id = <ImportDeclaration>item;
      const name = id.moduleSpecifier
        .getText()
        .replace(/\'/gm, '')
        .replace(/\"/gm, '');

      return createImportDeclaration(
        id.decorators,
        id.modifiers,
        id.importClause,
        createStringLiteral(name)
      );
    });
  }

}
