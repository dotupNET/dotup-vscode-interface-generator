
import { EmptyClass } from './Class2';
import { InterfaceDeclaration } from "typescript";

describe('Test class EmptyClass', () => {

  it('jo', () => {
    // Arguments
    const p1 = 'Oha';
    const stringi1 = 'Oha';
    const callback1 = undefined;

    // Method call
    const emptyClass = new EmptyClass(p1);
    emptyClass.jo(stringi1, callback1);
  });

  it('opt', () => {
    // Arguments
    const p2 = 'Oha';
    const stringi2 = 'Oha';
    const opti1 = 10;

    // Method call
    const emptyClass = new EmptyClass(p2);
    emptyClass.opt(stringi2, opti1);
  });
});