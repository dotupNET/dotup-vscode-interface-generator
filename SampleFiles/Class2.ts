// tslint:disable
import { InterfaceDeclaration } from 'typescript';

export class EmptyClass {
  p: string;

  constructor(p: string) {
    this.p = p;
  }

  jo(stringi: string): void {
    console.log(stringi);
  }
}
