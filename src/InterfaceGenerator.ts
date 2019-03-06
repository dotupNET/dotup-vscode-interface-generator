// tslint:disable-next-line: no-implicit-dependencies
import { createInterfaceDeclaration, InterfaceDeclaration } from 'typescript';
import { InterfaceDescriptor } from './InterfaceDescriptor';

export class InterfaceGenerator {

  getInterfaceDeclaration(interfaceDescriptor: InterfaceDescriptor): InterfaceDeclaration {
    // Interface
    return createInterfaceDeclaration(
      undefined,
      interfaceDescriptor.modifiers,
      interfaceDescriptor.interfaceName,
      interfaceDescriptor.typeParameters,
      interfaceDescriptor.heritageClauses,
      interfaceDescriptor.getMembersAsTypeElement()
    );
  }

}
