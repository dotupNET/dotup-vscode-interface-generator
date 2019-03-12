// tslint:disable
import { InterfaceDeclaration } from 'typescript';

export class EmptyClass {
  p: string;

  constructor(p: string) {
    this.p = p;
  }

  jo(stringi: string, callback: () => void): void {
    console.log(stringi);
  }

  opt(stringi: string, opti?: number): void {
    console.log(stringi);
  }
}
