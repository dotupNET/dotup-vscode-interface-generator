import { InterfaceDeclaration } from "typescript";
import { IEmptyInterface, EmptyClass } from "./Class2";

export interface IExtendsOnly<A, B extends string> extends EmptyClass {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IImplementsOnly<C, D extends string> {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IExtendsAndImplements<E, F extends string> extends EmptyClass {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IExtendsAndImplementsWithoutTypeParameter extends EmptyClass {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}