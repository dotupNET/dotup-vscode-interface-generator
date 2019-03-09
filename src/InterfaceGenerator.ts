// // tslint:disable-next-line: no-implicit-dependencies
// import { createIdentifier, createInterfaceDeclaration, createToken, InterfaceDeclaration, Node, SyntaxKind } from 'typescript';
// import { InterfaceDescriptor } from './InterfaceDescriptor';

// interface IJsDoc extends Node {
//   jsDoc?: Node[];
// }

// export class InterfaceGenerator {

//   // getInterfaceDeclaration(interfaceDescriptor: InterfaceDescriptor): InterfaceDeclaration {
//   //   // Interface
//   //   return createInterfaceDeclaration(
//   //     undefined,
//   //     interfaceDescriptor.modifiers,
//   //     interfaceDescriptor.interfaceName,
//   //     interfaceDescriptor.typeParameters,
//   //     interfaceDescriptor.heritageClauses,
//   //     interfaceDescriptor.getMembersAsTypeElement()
//   //   );
//   // }

//   buildNodes(interfaceDescriptor: InterfaceDescriptor): Node[] {
//     const result: Node[] = [];

//     if (interfaceDescriptor.jsDoc !== undefined) {
//       interfaceDescriptor.jsDoc.forEach(comment => {
//         result.push(comment);
//       });
//     }

//     const identifier = createIdentifier(this.getInterfaceDeclarationString(interfaceDescriptor));

//     result.push(identifier);

//     // Properties
//     // result.push(...item.getPropertiesAsNode());
//     const props = interfaceDescriptor.getPropertiesAsNode();

//     this.addNodeWithCommentToResult(props, result);

//     // New line
//     result.push(createToken(SyntaxKind.NewLineTrivia));

//     // Methods
//     // result.push(...interfaceDescriptor.getMethodsAsNode());
//     const methods = interfaceDescriptor.getMethodsAsNode();
//     this.addNodeWithCommentToResult(methods, result);

//     // New line
//     result.push(createToken(SyntaxKind.NewLineTrivia));

//     // Closing brace
//     const closeBrace = createToken(SyntaxKind.CloseBraceToken);
//     result.push(closeBrace);

//     return result;

//   }

//   addNodeWithCommentToResult(source: IJsDoc[], target: Node[]): void {
//     source.forEach(p => {
//       if (p.jsDoc !== undefined) {
//         target.push(...p.jsDoc);
//       }
//       target.push(p);
//     });

//   }

//   getInterfaceDeclarationString(item: InterfaceDescriptor): string {
//     let result = item.classDeclaration.replace('class', 'interface');
//     result = result.replace(item.className, item.interfaceName);
//     // export class ExtendsOnly<XY, TG extends string> extends ABC {
//     // =>
//     // export class ExtendsOnly<XY, TG extends string>
//     // const withTypeParameters = result.match(/.+?(?=>)./);
//     // if (withTypeParameters !== null) {
//     //   return `${withTypeParameters[0]} {`;
//     // }

//     // 'extends' clause must precede 'implements' clause.ts(1173)
//     // const extendsParameters = result.match(/.+?(?=extends)/);
//     // if (extendsParameters !== null) {
//     //   return `${extendsParameters[0]} {`;
//     // }

//     const implementsParameters = result.match(/.+?(?=implements)/);
//     if (implementsParameters !== null) {
//       return `${implementsParameters[0]} {`;
//     }

//     return result;

//   }

// }
