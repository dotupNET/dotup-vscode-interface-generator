// const typescriptParser = require("typescript-parser");
// const parser = new typescriptParser.TypescriptParser();
import * as fs from 'fs';
import * as ts from 'typescript';
import { TypescriptParser } from 'typescript-parser';
import { NodeVisitors } from './NodeVisitors';
import { ClassVisitor } from './visitors/ClassVisitor';
import { MethodVisitor } from './visitors/MethodVisitor';
import { SourceFileVisitor } from './visitors/SourceFileVisitor';
import { SyntaxKind, ScriptTarget, createSourceFile, TypeElement, MethodDeclaration, createTypeParameterDeclaration, createMethodSignature, createInterfaceDeclaration, createModifier, ScriptKind, NewLineKind, EmitHint, createPrinter, ClassDeclaration, createMethod, InterfaceDeclaration, createNode, Node, ImportDeclaration, createToken } from 'typescript';
import { ClassAnalyser } from './ClassAnalyser';
import { setFlagsFromString } from 'v8';

export class InterfaceGenerator {

  resultMessage: string;

  result: string;

  constructor() {
    this.resultMessage = 'No class found.';
    // this.visitors.push(new SourceFileVisitor());
    // this.visitors.push(new ClassVisitor());
    // this.visitors.push(new MethodVisitor());
    // this.visitors.push(new RemoveVisitor());
  }

  async generate(filePath: string): Promise<string> {
    const source = fs.readFileSync(filePath, 'utf-8');
    const sourceFile = createSourceFile(filePath, source, ScriptTarget.Latest, true);

    const syntaxList = sourceFile.getChildren().find(item => item.kind === SyntaxKind.SyntaxList);
    const importClause = syntaxList.getChildren().filter(item => item.kind === SyntaxKind.ImportDeclaration);
    const classDeclarations = syntaxList.getChildren().filter(item => item.kind === SyntaxKind.ClassDeclaration);

    this.visit(classDeclarations[0]);
    const emptyLine = createToken(SyntaxKind.NewLineTrivia);

    let result: string;

    const nodes: Node[] = [];

    if (classDeclarations.length > 0) {

      const ca = new ClassAnalyser();

      // imports
      importClause.forEach(item => {
        const id = <ImportDeclaration>item;
        const name = id.moduleSpecifier.getText().replace(/\'/gm, '').replace(/\"/gm, '');
        const imp = ts.createImportDeclaration(
          id.decorators,
          id.modifiers,
          id.importClause,
          ts.createStringLiteral(name)
        );
        nodes.push(imp);
      });

      nodes.push(createToken(SyntaxKind.NewLineTrivia));

      classDeclarations.forEach(c => {
        const generatedInterface = ca.extractInterface(<any>c as ClassDeclaration);
        nodes.push(<any>generatedInterface);
        nodes.push(createToken(SyntaxKind.NewLineTrivia));
      })

      const list = ts.createNodeArray(nodes);

      const sf = ca.createFile(ca.className, list);
      result = sf.text;
      console.log(sf.text);
      this.resultMessage = 'Interface generated.';
    }

    return result;
    // this.visit(sourceFile);
  }

  visit(node: Node) {
    // this.visitors.forEach(item => {
    //   if (item.canVisit(node)) {
    //     item.visit(node);
    //   }
    // });

    node.forEachChild(child => {
      this.visit(child);
    });
  }

  convertMethod(member: any): TypeElement {
    const x = createMethodSignature(
      member.typeParameters,
      member.parameters,
      member.type,
      'I' + member.name,
      member.questionToken
    );
    return x;

  }

  // extractInterface(classDeclaration: ClassDeclaration): InterfaceDeclaration {

  //   const classMethodsNodes = classDeclaration.members.filter(m => m.kind === SyntaxKind.MethodDeclaration);
  //   const classMethods = <MethodDeclaration[]>classMethodsNodes;

  //   const publicMethods = classMethods
  //     .filter(method => {
  //       if (method.modifiers === undefined) {
  //         return true;
  //       }
  //       const xo = method.modifiers.some(item => item.kind === SyntaxKind.PublicKeyword);
  //       return xo;
  //     });

  //   const methods = publicMethods.map(method => {

  //     const createTypeParameter = (method: MethodDeclaration) => {
  //       if (method.typeParameters === undefined) {
  //         return undefined;
  //       } else {
  //         return method.typeParameters.map(m =>
  //           createTypeParameterDeclaration(
  //             m.name, m.constraint, m.default
  //           )
  //         );

  //       }
  //     }

  //     const x = createMethodSignature(
  //       createTypeParameter(method),
  //       method.parameters,
  //       method.type,
  //       method.name,
  //       method.questionToken
  //     );
  //     return x;

  //   });

  //   const ifaze = createInterfaceDeclaration(
  //     undefined,
  //     [createModifier(SyntaxKind.PublicKeyword)],
  //     'I' + classDeclaration.name.text,
  //     classDeclaration.typeParameters,
  //     classDeclaration.heritageClauses,
  //     methods

  //   );

  //   return ifaze;
  // }

  // createFile(node: Node) {

  //   const resultFile = createSourceFile(
  //     "someFileName.ts",
  //     "",
  //     ScriptTarget.Latest,
  // /*setParentNodes*/ false,
  //     ScriptKind.TS
  //   );
  //   const printer = createPrinter({
  //     newLine: NewLineKind.LineFeed
  //   });

  //   const result = printer.printNode(
  //     EmitHint.Unspecified,
  //     node,
  //     resultFile
  //   );

  //   console.log(result);
  // }

}
