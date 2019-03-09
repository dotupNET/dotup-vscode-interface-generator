import { InterfaceDeclaration } from "typescript";
import { IEmptyInterface, EmptyClass } from "./Class2";

/**
 * My comment on ExtendsOnly */
export interface IExtendsOnly<A, B extends string> extends EmptyClass {
  /**
   * ExtendsOnly prop1 is nice
   * 
   * https://github.com/dotupNET?tab=repositories */
  prop1: number;
  PublicProp1?: string;

  /**
   * My ExtendsOnly Comment on PublicMethod */
  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IImplementsOnly<C, D extends string> {
  prop1: number;
  PublicProp1?: string;

  /**
   * My ImplementsOnly Comment on PublicMethod */
  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IExtendsAndImplements<E, F extends string> extends EmptyClass {
  prop1: number;
  PublicProp1?: string;

  /**
   * My ExtendsAndImplements Comment on PublicMethod */
  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IExtendsAndImplementsWithoutTypeParameter extends EmptyClass {
  prop1: number;
  PublicProp1?: string;

  /**
   * My ExtendsAndImplementsWithoutTypeParameter Comment on PublicMethod */
  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}