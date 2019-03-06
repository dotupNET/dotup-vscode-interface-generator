import { MethodSignature, PropertySignature, Node, TypeElement, TypeParameterDeclaration, Modifier, HeritageClause, ImportDeclaration } from 'typescript';
import { InterfaceDescriptor } from './InterfaceDescriptor';
export class FileDescriptor {
  // source
  readonly sourceFilePath: string;
  sourceFileContent: string;
  syntaxList: Node;
  classDeclarations: Node[];
  importClause?: Node[];
  // Interface
  importDeclarations: ImportDeclaration[];
  interfaceDescriptors: InterfaceDescriptor[];
  nodes: Node[];

  constructor(sourceFileName: string) {
    // source
    this.sourceFilePath = sourceFileName;
    this.classDeclarations = [];
    // interface
    this.nodes = [];
    this.interfaceDescriptors = [];
  }

  isSourceValid(): boolean {
    if (this.sourceFilePath === undefined || this.sourceFilePath.length < 1) {
      return false;
    }
    if (this.sourceFileContent === undefined || this.sourceFileContent.length < 1) {
      return false;
    }
    if (this.syntaxList === undefined) {
      return false;
    }
    if (this.classDeclarations.length < 1) {
      return false;
    }

    return true;
  }

  isValidInterface(): boolean {
    if (this.nodes.length < 1) {
      return false;
    }
    if (this.interfaceDescriptors.length < 1) {
      return false;
    }

    return true;
  }

}
