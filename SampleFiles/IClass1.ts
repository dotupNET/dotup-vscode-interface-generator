import { InterfaceDeclaration } from "typescript";

interface ABC {


}
export interface ExtendsOnly<XY, TG extends string> extends ABC {
prop1: number;
PublicProp1?: string;

PublicMethod(): string;
PublicMethodWithoutPublic(arg: InterfaceDeclaration);
PublicMethodWithoutPublicVoid(arg: string): void;
PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface ImplementsOnly<XY, TG extends string>  {
prop1: number;
PublicProp1?: string;

PublicMethod(): string;
PublicMethodWithoutPublic(arg: InterfaceDeclaration);
PublicMethodWithoutPublicVoid(arg: string): void;
PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface ExtendsAndImplements<XY, TG extends string> extends ABC  {
prop1: number;
PublicProp1?: string;

PublicMethod(): string;
PublicMethodWithoutPublic(arg: InterfaceDeclaration);
PublicMethodWithoutPublicVoid(arg: string): void;
PublicMethodWithoutPublicString<T>(arg: string): T;

}
export interface ExtendsAndImplementsWithoutTypeParameter extends ABC  {
prop1: number;
PublicProp1?: string;

PublicMethod(): string;
PublicMethodWithoutPublic(arg: InterfaceDeclaration);
PublicMethodWithoutPublicVoid(arg: string): void;
PublicMethodWithoutPublicString<T>(arg: string): T;

}