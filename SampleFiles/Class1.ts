// tslint:disable
import { InterfaceDeclaration } from 'typescript';
// a comment
import { IEmptyInterface, EmptyClass } from './Class2';

/*
 * My class comment on ExtendsOnly
 */
export class ExtendsOnly<A, B extends string> extends EmptyClass {
  /**
   * ExtendsOnly prop1 is nice
   * 
   * https://github.com/dotupNET?tab=repositories
   */
  public prop1: number = 2;
  // normal comment
  public PublicProp1?: string = '';
  /**
   * comment on private property
   */
  private PrivateProp1: string = '';

  private privateMethod() {

  }

  /**
   * My ExtendsOnly Comment on PublicMethod
   */
  public PublicMethod(): string {
    return ';';
  }

  // single line PublicMethodWithoutPublic
  PublicMethodWithoutPublic(arg: InterfaceDeclaration) {

  }

  /* multiline comment on PublicMethodWithoutPublicVoid */
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
   * My ImplementsOnly Comment on PublicMethod
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
   * My ExtendsAndImplements Comment on PublicMethod
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
   * My ExtendsAndImplementsWithoutTypeParameter Comment on PublicMethod
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
