// tslint:disable-next-line: max-line-length
import { ClassDeclaration, createMethodSignature, createModifier, createPropertySignature, createTypeParameterDeclaration, MethodDeclaration, MethodSignature, NodeArray, PropertyDeclaration, PropertySignature, SyntaxKind, TypeParameterDeclaration } from 'typescript';
import { InterfaceDescriptor } from './InterfaceDescriptor';

export class ClassAnalyer {

  getInterfaceDescriptor(classDeclaration: ClassDeclaration): InterfaceDescriptor {

    const descriptor = new InterfaceDescriptor(classDeclaration.name.text);
    descriptor.classDeclaration = classDeclaration
      .getText()
      .split('\n')[0];
    descriptor.modifiers = [createModifier(SyntaxKind.ExportKeyword)];

    descriptor.methods = this.getMethods(classDeclaration);
    descriptor.properties = this.getProperties(classDeclaration);
    descriptor.typeParameters = this.createTypeParameter(classDeclaration.typeParameters);
    // tslint:disable-next-line: no-any : no-unsafe-any
    descriptor.jsDoc = (<any>classDeclaration).jsDoc;

    return descriptor;

  }

  getMethods(classDeclaration: ClassDeclaration): MethodSignature[] {

    const classMethodsNodes = classDeclaration.members.filter(m => m.kind === SyntaxKind.MethodDeclaration);
    const classMethods = <MethodDeclaration[]>classMethodsNodes;

    // Filter to public methods
    const publicMethods = classMethods
      .filter(method => {
        if (method.modifiers === undefined) {
          return true;
        }

        return method.modifiers.some(item => item.kind === SyntaxKind.PublicKeyword);
      });

    // create method signatures
    return publicMethods.map(method => {
      const m = createMethodSignature(
        this.createTypeParameter(method.typeParameters),
        method.parameters,
        method.type,
        method.name,
        method.questionToken
      );

      this.addComments(method, m);

      return m;
    });
  }

  getProperties(classDeclaration: ClassDeclaration): PropertySignature[] {

    const classPropertyNodes = classDeclaration.members.filter(m => m.kind === SyntaxKind.PropertyDeclaration);
    const classProperties = <PropertyDeclaration[]>classPropertyNodes;

    // Filter to public properties
    const publicProperties = classProperties
      .filter(prop => {
        if (prop.modifiers === undefined) {
          return true;
        }

        return prop.modifiers.some(item => item.kind === SyntaxKind.PublicKeyword);
      });

    // create property signatures
    return publicProperties.map(property => {

      const p = createPropertySignature(
        property.modifiers.filter(x => x.kind !== SyntaxKind.PublicKeyword),
        property.name,
        property.questionToken,
        property.type,
        property.initializer
      );

      this.addComments(property, p);

      return p;
    });

  }

  // tslint:disable
  addComments<TSource, TTarget>(source: TSource, target: TTarget): void {
    const anySource = <any>source;
    const anyTarget = <any>target;
    if (anySource.jsDoc !== undefined) {
      anyTarget.jsDoc = anySource.jsDoc;
      // anyTarget.jsDoc[0].parent = anyTarget;
    }
  }
  // tslint:enable

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
