import { NodeVisitors } from '../NodeVisitors';
import * as ts from 'typescript';

export class FunctionVisitor extends NodeVisitors {
  kind: ts.SyntaxKind = ts.SyntaxKind.FunctionDeclaration;
  visitNode(node: ts.Node): void {
    const identifier = node as ts.FunctionDeclaration;
    console.log(`function name: ${identifier.name.text}`);
  }
}
