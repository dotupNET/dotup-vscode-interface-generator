import * as ts from 'typescript';

export interface INodeVisitors {
  kind: ts.SyntaxKind;
  canVisit(node: ts.Node): boolean;
  visit(node: ts.Node): void;
}
