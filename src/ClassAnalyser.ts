import { ClassDeclaration, SyntaxKind, MethodDeclaration, createTypeParameterDeclaration, createMethodSignature, createInterfaceDeclaration, createModifier, createSourceFile, EmitHint, createPrinter, NewLineKind, ScriptKind, ScriptTarget, MethodSignature, TypeParameterDeclaration, NodeArray, PropertyDeclaration, createPropertySignature, PropertySignature, createLiteral, Node, InterfaceDeclaration, ListFormat, createNode, createNoSubstitutionTemplateLiteral, createToken, SourceFile } from 'typescript';

export class ClassAnalyser {

  className: string;

  extractInterface(classDeclaration: ClassDeclaration): InterfaceDeclaration {

    const methods = <Node[]>this.getMethods(classDeclaration);
    const props = this.getProperties(classDeclaration);
    const members = props.concat(<any>methods);

    this.className = classDeclaration.name.text;

    const ifaze = createInterfaceDeclaration(
      undefined,
      [createModifier(SyntaxKind.ExportKeyword)],
      'I' + classDeclaration.name.text,
      this.createTypeParameter(classDeclaration.typeParameters),
      undefined, // classDeclaration.heritageClauses,
      members
    );

    return ifaze;

  }

  createFile(filename: string, node: NodeArray<any>): SourceFile {
    const result: string[] = [];

    const resultFile = createSourceFile(
      filename,
      '',
      ScriptTarget.Latest,
  /*setParentNodes*/ false,
      ScriptKind.TS
    );
    const printer = createPrinter({
      newLine: NewLineKind.CarriageReturnLineFeed
    });

    // const result = printer.printNode(
    //   EmitHint.Unspecified,
    //   node,
    //   resultFile
    // );

    node.forEach(item => {
      const x = printer.printNode(EmitHint.Unspecified, item, resultFile);
      result.push(x);
      console.log(x);
    });

    console.log('---');
    // const result = printer.printList(
    //   ListFormat.None,
    //   node,
    //   resultFile
    // );
    resultFile.text = result.join('\n');
    return resultFile;

    // console.log(result);
  }

  getMethods(classDeclaration: ClassDeclaration): MethodSignature[] {

    const classMethodsNodes = classDeclaration.members.filter(m => m.kind === SyntaxKind.MethodDeclaration);
    const classMethods = <MethodDeclaration[]>classMethodsNodes;

    const publicMethods = classMethods
      .filter(method => {
        if (method.modifiers === undefined) {
          return true;
        }
        const xo = method.modifiers.some(item => item.kind === SyntaxKind.PublicKeyword);
        return xo;
      });

    const methods = publicMethods.map(method => {

      const x = createMethodSignature(
        this.createTypeParameter(method.typeParameters),
        method.parameters,
        method.type,
        method.name,
        method.questionToken
      );
      // (<any>x).jsDoc = (<any>method).jsDoc;
      // (<any>x).jsDoc.forEach((element: any) => {
      //   element.parent = x;
      // });
      return x
    });

    return methods;
  }

  getProperties(classDeclaration: ClassDeclaration): PropertySignature[] {

    const classPropertyNodes = classDeclaration.members.filter(m => m.kind === SyntaxKind.PropertyDeclaration);
    const classMethods = <PropertyDeclaration[]>classPropertyNodes;

    const publicProperties = classMethods
      .filter(prop => {
        if (prop.modifiers === undefined) {
          return true;
        }
        const xo = prop.modifiers.some(item => item.kind === SyntaxKind.PublicKeyword);
        return xo;
      });

    const props = publicProperties.map(property => {

      const x = createPropertySignature(
        property.modifiers.filter(x => x.kind !== SyntaxKind.PublicKeyword),
        property.name,
        property.questionToken,
        property.type,
        property.initializer
      );
      return x
    });

    return props;
  }

  createTypeParameter(typeParameters: NodeArray<TypeParameterDeclaration>): TypeParameterDeclaration[] {
    if (typeParameters === undefined) {
      return undefined;
    } else {
      return typeParameters.map(m =>
        createTypeParameterDeclaration(
          m.name, m.constraint, m.default
        )
      );

    }
  }

}