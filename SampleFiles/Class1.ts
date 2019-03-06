// tslint:disable
import { InterfaceDeclaration } from 'typescript';
import { IEmptyInterface, EmptyClass } from './Class2';

export class ExtendsOnly<A, B extends string> extends EmptyClass {
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

export class ImplementsOnly<C, D extends string> implements IEmptyInterface {
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

export class ExtendsAndImplements<E, F extends string> extends EmptyClass implements IEmptyInterface {
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

export class ExtendsAndImplementsWithoutTypeParameter extends EmptyClass implements IEmptyInterface {
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
