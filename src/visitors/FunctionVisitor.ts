import * as ts from 'typescript';
import { NodeVisitors } from './NodeVisitors';

export class FunctionVisitor extends NodeVisitors {
  kind: ts.SyntaxKind = ts.SyntaxKind.FunctionDeclaration;
  visitNode(node: ts.Node): void {
    const identifier = <ts.FunctionDeclaration>node;
    console.log(`function name: ${identifier.name.text}`);
  }
}
