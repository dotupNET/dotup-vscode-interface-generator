import { createNodeArray } from "../src/beispiel";

export interface Itest {
  Prop1: number;
  PublicProp1: string;
  PublicMethod();
  PublicMethodWithoutPublic(arg: string);
  PublicMethodWithoutPublicVoid(arg: string): void;
  PublicMethodWithoutPublicString<T>(arg: string): T;
}
