import { NodeVisitors } from '../NodeVisitors';
import * as ts from 'typescript';

export class MethodVisitor extends NodeVisitors {
  kind: ts.SyntaxKind = ts.SyntaxKind.MethodDeclaration;
  visitNode(node: ts.Node): void {
    const identifier = node as ts.MethodDeclaration;
    const name = ts.getNameOfDeclaration(identifier);

    const x = ts.createMethodSignature(
      identifier.typeParameters,
      identifier.parameters,
      identifier.type,
      identifier.name,
      identifier.questionToken);
    // this.makeCopy(identifier.type),
    // this.makeCopy(identifier.name),
    // this.makeCopy(identifier.questionToken));

    console.log(x);
    // const modifier = ts.createModifier(identifier.modifiers[0].kind)
    // const n = ts.createFunctionTypeNode((ts.SyntaxKind.MethodSignature);
    // const method = ts.createMethodSignature(undefined, undefined, n, name, undefined);
    console.log(`function name: ${name.getText()}`);
  }

  makeCopy<T extends ts.Node>(item: T): T {
    if (item === undefined) {
      return item;
    }
    if (item.pos) {
      item.pos = -1;
    }
    if (item.end) {
      item.end = -1;
    }
    // if (item.parent) {
    //   item.parent = undefined;
    // }

    item.forEachChild(c => this.makeCopy);
    return item;
  }
}
