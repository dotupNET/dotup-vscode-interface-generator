import * as fs from 'fs';
import * as path from 'path';
// tslint:disable-next-line: max-line-length
import { ClassDeclaration, createIdentifier, createImportDeclaration, createPrinter, createSourceFile, createStringLiteral, createToken, EmitHint, ImportDeclaration, NewLineKind, Node, ScriptKind, ScriptTarget, SourceFile, SyntaxKind } from 'typescript';
import { OutputChannel } from 'vscode';
import { ClassAnalyer } from './ClassAnalyer';
import { FileDescriptor } from './FileDescriptor';
import { InterfaceDescriptor } from './InterfaceDescriptor';

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

    // For each interface
    fd.interfaceDescriptors.forEach(item => {

      this.out.appendLine(`Build nodes for ${item.interfaceName}`);

      // Complete interface
      // const ifg = new InterfaceGenerator();
      // const ifDeclaration = ifg.getInterfaceDeclaration(item);
      // result.push(ifDeclaration);
      // result.push(ts.createIdentifier('interface'));

      // Type parameter
      // const tp = item.typeParameters.map(p => {
      //   return p.name.text;
      // });

      // let typeParameter = '';
      // if (tp.length > 0) {
      //   typeParameter = `<${tp.join(', ')}>`;
      // }
      // // Interface
      // const interfaceStatement = `export interface ${item.interfaceName}${typeParameter} {`;
      const identifier = createIdentifier(this.getInterfaceDeclaration(item));

      result.push(identifier);

      // Properties
      result.push(...item.getPropertiesAsNode());

      // New line
      result.push(createToken(SyntaxKind.NewLineTrivia));

      // Methods
      result.push(...item.getMethodsAsNode());

      // New line
      result.push(createToken(SyntaxKind.NewLineTrivia));

      // Closing brace
      const closeBrace = createToken(SyntaxKind.CloseBraceToken);
      result.push(closeBrace);
    });

    fd.nodes = result;
  }

  getInterfaceDeclaration(item: InterfaceDescriptor): string {
    let result = item.classDeclaration.replace('class', 'interface');
    result = result.replace(item.className, item.interfaceName);
    // export class ExtendsOnly<XY, TG extends string> extends ABC {
    // =>
    // export class ExtendsOnly<XY, TG extends string>
    // const withTypeParameters = result.match(/.+?(?=>)./);
    // if (withTypeParameters !== null) {
    //   return `${withTypeParameters[0]} {`;
    // }

    // 'extends' clause must precede 'implements' clause.ts(1173)
    // const extendsParameters = result.match(/.+?(?=extends)/);
    // if (extendsParameters !== null) {
    //   return `${extendsParameters[0]} {`;
    // }

    const implementsParameters = result.match(/.+?(?=implements)/);
    if (implementsParameters !== null) {
      return `${implementsParameters[0]} {`;
    }

    return result;
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

    const printer = createPrinter({
      newLine: NewLineKind.CarriageReturnLineFeed
    });

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
