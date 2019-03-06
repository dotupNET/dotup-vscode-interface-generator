import * as ts from 'typescript';
import { ClassVisitor } from './ClassVisitor';
import { NodeVisitors } from './NodeVisitors';

export class SourceFileVisitor extends NodeVisitors {
  readonly kind: ts.SyntaxKind = ts.SyntaxKind.SourceFile;
  constructor() {
    super();
    this.visitors.push(new ClassVisitor());
  }
  visitNode(node: ts.Node): void {
    console.log(`source name: ${typeof node}`);
    console.log(node);
  }
}
