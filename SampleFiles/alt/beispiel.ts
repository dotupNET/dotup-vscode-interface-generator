// tslint:disable
// import * as ts from 'typescript';

// function makeFactorialFunction() {
//   const functionName = ts.createIdentifier("factorial");
//   const paramName = ts.createIdentifier("n");
//   const parameter = ts.createParameter(
//     /*decorators*/ undefined,
//     /*modifiers*/ undefined,
//     /*dotDotDotToken*/ undefined,
//     paramName
//   );

//   const condition = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.LessThanEqualsToken,
//     ts.createLiteral(1)
//   );

//   const ifBody = ts.createBlock(
//     [ts.createReturn(ts.createLiteral(1))],
//     /*multiline*/ true
//   );
//   const decrementedArg = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.MinusToken,
//     ts.createLiteral(1)
//   );
//   const recurse = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.AsteriskToken,
//     ts.createCall(functionName, /*typeArgs*/ undefined, [decrementedArg])
//   );
//   const statements = [ts.createIf(condition, ifBody), ts.createReturn(recurse)];

//   return ts.createInterfaceDeclaration(
//     /*decorators*/ undefined,
//     /*modifiers*/[ts.createToken(ts.SyntaxKind.ExportKeyword)],
//     functionName,
//     /*typeParameters*/ undefined,
//     undefined,
//     [makeFunction()]
//   );
// }

// function makeFunction() {

//   // const result: ts.TypeElement= {};
//   let result: ts.MethodSignature;
//   const x = ts.createMethodSignature(
//     undefined,
//     undefined,
//     ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
//     'name',
//     undefined
//   );
//   return x; // result;
//   // return ts.createMethodSignature
//   // return ts.createCallSignature(
//   //   undefined,
//   //   undefined,
//   //   ts.createTypeLiteralNode(undefined)
//   // );
// }

// function makeFunction1() {
//   // const result: ts.TypeElement= {};

//   return ts.createMethodSignature(
//     undefined,
//     undefined,
//     undefined,//    ts.createTypeNode(ts.SyntaxKind.MethodSignature),
//     'df',
//     undefined);
//   const functionName = ts.createIdentifier("factorial");
//   const paramName = ts.createIdentifier("n");
//   const parameter = ts.createParameter(
//     /*decorators*/ undefined,
//     /*modifiers*/ undefined,
//     /*dotDotDotToken*/ undefined,
//     paramName
//   );

//   const condition = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.LessThanEqualsToken,
//     ts.createLiteral(1)
//   );

//   const ifBody = ts.createBlock(
//     [ts.createReturn(ts.createLiteral(1))],
//     /*multiline*/ true
//   );
//   const decrementedArg = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.MinusToken,
//     ts.createLiteral(1)
//   );
//   const recurse = ts.createBinary(
//     paramName,
//     ts.SyntaxKind.AsteriskToken,
//     ts.createCall(functionName, /*typeArgs*/ undefined, [decrementedArg])
//   );
//   const statements = [ts.createIf(condition, ifBody), ts.createReturn(recurse)];

//   return ts.createFunctionExpression(
//     /*modifiers*/[ts.createToken(ts.SyntaxKind.ExportKeyword)],
//     /*asteriskToken*/ undefined,
//     functionName,
//     /*typeParameters*/ undefined,
//     [parameter],
//     /*returnType*/ ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
//     undefined
//   );
// }

// function createSynthesizedNode(kind: ts.SyntaxKind): ts.Node {
//   const node = ts.createNode(kind, -1, -1);
//   node.flags |= ts.NodeFlags.Synthesized;
//   return node;
// }

// export function createInterfaceDeclaration(
//   decorators: ReadonlyArray<ts.Decorator> | undefined,
//   modifiers: ReadonlyArray<ts.Modifier> | undefined,
//   name: string | ts.Identifier,
//   typeParameters: ReadonlyArray<ts.TypeParameterDeclaration> | undefined,
//   heritageClauses: ReadonlyArray<ts.HeritageClause> | undefined,
//   members: ReadonlyArray<ts.TypeElement>) {

//   const node = <ts.InterfaceDeclaration>createSynthesizedNode(ts.SyntaxKind.InterfaceDeclaration);
//   node.decorators = asNodeArray(decorators);
//   node.modifiers = asNodeArray(modifiers);
//   node.name = asName(name);
//   node.typeParameters = asNodeArray(typeParameters);
//   node.heritageClauses = asNodeArray(heritageClauses);
//   node.members = createNodeArray(members);
//   return node;
// }

// export function createInterfaceDeclaration1() {

//   const resultFile = ts.createSourceFile(
//     "someFileName.ts",
//     "",
//     ts.ScriptTarget.Latest,
//   /*setParentNodes*/ false,
//     ts.ScriptKind.TS
//   );
//   const printer = ts.createPrinter({
//     newLine: ts.NewLineKind.LineFeed
//   });

//   const result = printer.printNode(
//     ts.EmitHint.Unspecified,
//     makeFactorialFunction(),
//     resultFile
//   );

//   console.log(result);
// }


// function asName<T extends ts.Identifier | ts.BindingName | ts.PropertyName | ts.EntityName | ts.ThisTypeNode | undefined>(name: string | T): T | ts.Identifier {
//   return typeof name === 'string' ? ts.createIdentifier(name) : name;
// }

// function asNodeArray<T extends ts.Node>(array: ReadonlyArray<T>): ts.NodeArray<T>;
// function asNodeArray<T extends ts.Node>(array: ReadonlyArray<T> | undefined): ts.NodeArray<T> | undefined;
// function asNodeArray<T extends ts.Node>(array: ReadonlyArray<T> | undefined): ts.NodeArray<T> | undefined {
//   return array ? createNodeArray(array) : undefined;
// }

// export function createNodeArray<T extends ts.Node>(elements?: ReadonlyArray<T>, hasTrailingComma?: boolean): ts.NodeArray<T>;
// /**
//  * Make `elements` into a `NodeArray<T>`. If `elements` is `undefined`, returns an empty `NodeArray<T>`.
//  */
// export function createNodeArray<T extends ts.Node>(elements?: ReadonlyArray<T>, hasTrailingComma?: boolean): ts.NodeArray<T> {
//   if (!elements) {
//     elements = [];
//   }

//   const array = <ts.NodeArray<T>>elements;
//   array.pos = -1;
//   array.end = -1;
//   array.hasTrailingComma = hasTrailingComma;
//   return array;
// }


// const xy1 = createInterfaceDeclaration1();
// const xy = createInterfaceDeclaration(
//   undefined,
//   [ts.createModifier(ts.SyntaxKind.PublicKeyword)],
//   'MaNiceInterface',
//   undefined,
//   undefined,
//   undefined
// );
// console.log(xy);
