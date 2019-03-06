// tslint:disable
import { createNodeArray } from '../src/beispiel';
import { InterfaceDeclaration } from 'typescript';

class ABC {

}
export interface abx {

}

export class ExtendsOnly<XY, TG extends string> extends ABC {
  public prop1: number = 2;
  public PublicProp1?: string = '';
  private PrivateProp1: string = '';

  private privateMethod() {

  }

  /**
   * My Comment on PublicMethod
   */
  public PublicMethod(): string {
    return ';';
  }

  PublicMethodWithoutPublic(arg: InterfaceDeclaration) {

  }

  PublicMethodWithoutPublicVoid(arg: string): void {

  }

  PublicMethodWithoutPublicString<T>(arg: string): T {
    return undefined;
  }
}

export class ImplementsOnly<XY, TG extends string> implements abx {
  public prop1: number = 2;
  public PublicProp1?: string = '';
  private PrivateProp1: string = '';

  private privateMethod() {

  }

  /**
   * My Comment on PublicMethod
   */
  public PublicMethod(): string {
    return ';';
  }

  PublicMethodWithoutPublic(arg: InterfaceDeclaration) {

  }

  PublicMethodWithoutPublicVoid(arg: string): void {

  }

  PublicMethodWithoutPublicString<T>(arg: string): T {
    return undefined;
  }
}

export class ExtendsAndImplements<XY, TG extends string> extends ABC implements abx {
  public prop1: number = 2;
  public PublicProp1?: string = '';
  private PrivateProp1: string = '';

  private privateMethod() {

  }

  /**
   * My Comment on PublicMethod
   */
  public PublicMethod(): string {
    return ';';
  }

  PublicMethodWithoutPublic(arg: InterfaceDeclaration) {

  }

  PublicMethodWithoutPublicVoid(arg: string): void {

  }

  PublicMethodWithoutPublicString<T>(arg: string): T {
    return undefined;
  }
}

export class ExtendsAndImplementsWithoutTypeParameter extends ABC implements abx {
  public prop1: number = 2;
  public PublicProp1?: string = '';
  private PrivateProp1: string = '';

  private privateMethod() {

  }

  /**
   * My Comment on PublicMethod
   */
  public PublicMethod(): string {
    return ';';
  }

  PublicMethodWithoutPublic(arg: InterfaceDeclaration) {

  }

  PublicMethodWithoutPublicVoid(arg: string): void {

  }

  PublicMethodWithoutPublicString<T>(arg: string): T {
    return undefined;
  }
}
