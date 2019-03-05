import * as ts from 'typescript';
import { FunctionVisitor } from "./FunctionVisitor";
import { MethodVisitor } from "./MethodVisitor";
import { NodeVisitors } from '../NodeVisitors';

export class RemoveVisitor extends NodeVisitors {
  kind: ts.SyntaxKind = ts.SyntaxKind.ClassDeclaration;
  constructor() {
    super();
  }

  canVisit(node: ts.Node): boolean {
    return true;
  }

  visitNode(node: ts.Node): void {
    const identifier = node as ts.ClassDeclaration;
    node.end = -1;
    node.pos = -1;

  }
}
