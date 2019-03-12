
import { ExtendsOnly } from './Class1';
import { ImplementsOnly } from './Class1';
import { ExtendsAndImplements } from './Class1';
import { ExtendsAndImplementsWithoutTypeParameter } from './Class1';
import { InterfaceDeclaration } from "typescript";
import { IEmptyInterface } from "./IEmptyInterface";
import { EmptyClass } from "./Class2";

describe('Test class ExtendsOnly', () => {

  it('PublicMethod', () => {

    const extendsOnly = new ExtendsOnly();
    extendsOnly.PublicMethod();
  });

  it('PublicMethodWithoutPublic', () => {
    const arg1 = undefined;
    const extendsOnly = new ExtendsOnly();
    extendsOnly.PublicMethodWithoutPublic(arg1);
  });

  it('PublicMethodWithoutPublicVoid', () => {
    const arg2 = 'Oha';
    const extendsOnly = new ExtendsOnly();
    extendsOnly.PublicMethodWithoutPublicVoid(arg2);
  });

  it('PublicMethodWithoutPublicString', () => {
    const arg3 = 'Oha';
    const extendsOnly = new ExtendsOnly();
    extendsOnly.PublicMethodWithoutPublicString(arg3);
  });
});

describe('Test class ImplementsOnly', () => {

  it('PublicMethod', () => {

    const implementsOnly = new ImplementsOnly();
    implementsOnly.PublicMethod();
  });

  it('PublicMethodWithoutPublic', () => {
    const arg4 = undefined;
    const implementsOnly = new ImplementsOnly();
    implementsOnly.PublicMethodWithoutPublic(arg4);
  });

  it('PublicMethodWithoutPublicVoid', () => {
    const arg5 = 'Oha';
    const implementsOnly = new ImplementsOnly();
    implementsOnly.PublicMethodWithoutPublicVoid(arg5);
  });

  it('PublicMethodWithoutPublicString', () => {
    const arg6 = 'Oha';
    const implementsOnly = new ImplementsOnly();
    implementsOnly.PublicMethodWithoutPublicString(arg6);
  });
});

describe('Test class ExtendsAndImplements', () => {

  it('PublicMethod', () => {

    const extendsAndImplements = new ExtendsAndImplements();
    extendsAndImplements.PublicMethod();
  });

  it('PublicMethodWithoutPublic', () => {
    const arg7 = undefined;
    const extendsAndImplements = new ExtendsAndImplements();
    extendsAndImplements.PublicMethodWithoutPublic(arg7);
  });

  it('PublicMethodWithoutPublicVoid', () => {
    const arg8 = 'Oha';
    const extendsAndImplements = new ExtendsAndImplements();
    extendsAndImplements.PublicMethodWithoutPublicVoid(arg8);
  });

  it('PublicMethodWithoutPublicString', () => {
    const arg9 = 'Oha';
    const extendsAndImplements = new ExtendsAndImplements();
    extendsAndImplements.PublicMethodWithoutPublicString(arg9);
  });
});

describe('Test class ExtendsAndImplementsWithoutTypeParameter', () => {

  it('PublicMethod', () => {

    const extendsAndImplementsWithoutTypeParameter = new ExtendsAndImplementsWithoutTypeParameter();
    extendsAndImplementsWithoutTypeParameter.PublicMethod();
  });

  it('PublicMethodWithoutPublic', () => {
    const arg10 = undefined;
    const extendsAndImplementsWithoutTypeParameter = new ExtendsAndImplementsWithoutTypeParameter();
    extendsAndImplementsWithoutTypeParameter.PublicMethodWithoutPublic(arg10);
  });

  it('PublicMethodWithoutPublicVoid', () => {
    const arg11 = 'Oha';
    const extendsAndImplementsWithoutTypeParameter = new ExtendsAndImplementsWithoutTypeParameter();
    extendsAndImplementsWithoutTypeParameter.PublicMethodWithoutPublicVoid(arg11);
  });

  it('PublicMethodWithoutPublicString', () => {
    const arg12 = 'Oha';
    const extendsAndImplementsWithoutTypeParameter = new ExtendsAndImplementsWithoutTypeParameter();
    extendsAndImplementsWithoutTypeParameter.PublicMethodWithoutPublicString(arg12);
  });
});