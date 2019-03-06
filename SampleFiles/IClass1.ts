import { InterfaceDeclaration } from "typescript";

interface IABC {


}
export interface IExtendsOnly<XY, TG extends string> extends IABC {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IImplementsOnly<XY, TG extends string> {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IExtendsAndImplements<XY, TG extends string> extends IABC {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface IExtendsAndImplementsWithoutTypeParameter extends IABC {
  prop1: number;
  PublicProp1?: string;

  PublicMethod(): string;
  PublicMethodWithoutPublic(arg: InterfaceDeclaration);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;

}