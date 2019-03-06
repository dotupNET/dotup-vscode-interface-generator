import * as ts from 'typescript';
import { NodeVisitors } from './NodeVisitors';

export class ClassVisitor extends NodeVisitors {
  kind: ts.SyntaxKind = ts.SyntaxKind.ClassDeclaration;
  constructor() {
    super();
    // this.visitors.push(new FunctionVisitor());
    // this.visitors.push(new MethodVisitor());
    // let decorators, modifiers, name, typeParameter, heritageClauses, members;

    // const i = ts.createInterfaceDeclaration(decorators, modifiers, name, typeParameter, heritageClauses, members);
  }

  visitNode(node: ts.Node): void {
    const identifier = <ts.ClassDeclaration>node;
    node.kind = ts.SyntaxKind.InterfaceDeclaration;
    console.log(`class name: ${identifier.name.text}`);
  }
}
