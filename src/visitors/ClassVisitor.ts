import * as ts from 'typescript';
import { FunctionVisitor } from "./FunctionVisitor";
import { MethodVisitor } from "./MethodVisitor";
import { NodeVisitors } from '../NodeVisitors';
import { notEqual } from 'assert';

export class ClassVisitor extends NodeVisitors {
  kind: ts.SyntaxKind = ts.SyntaxKind.ClassDeclaration;
  constructor() {
    super();
    // this.visitors.push(new FunctionVisitor());
    // this.visitors.push(new MethodVisitor());
    let decorators, modifiers, name, typeParameter, heritageClauses, members;

    // const i = ts.createInterfaceDeclaration(decorators, modifiers, name, typeParameter, heritageClauses, members);
  }

/* @internal */   visitNode(node: ts.Node): void {
    const identifier = node as ts.ClassDeclaration;
    node.kind = ts.SyntaxKind.InterfaceDeclaration;
    console.log(`class name: ${identifier.name.text}`);
  }
}
