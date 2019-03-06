import * as ts from 'typescript';
import { INodeVisitors } from './INodeVisitors';

export abstract class NodeVisitors implements INodeVisitors {
  protected visitors: NodeVisitors[] = [];
  kind: ts.SyntaxKind;
  protected abstract visitNode(node: ts.Node): void;
  canVisit(node: ts.Node): boolean {
    return node.kind === this.kind;
  }
  visit(node: ts.Node): void {
    // Visit current node
    this.visitNode(node);
    // we ourselves can not treat child node.
    // node.forEachChild(n => {
    //   // Each registered visitor must analyse each children.
    //   this.visitors.forEach(item => {
    //     if (item.canVisit(n)) {
    //       item.visit(n);
    //     }
    //   });
    // });
  }
}
