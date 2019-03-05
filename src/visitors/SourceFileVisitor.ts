import { NodeVisitors } from '../NodeVisitors';
import { ClassVisitor } from "./ClassVisitor";
import * as ts from 'typescript';

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
