import { createNodeArray } from '../src/beispiel';

export interface abx {

}

export class test implements abx {
  public Prop1: number = 2;
  public PublicProp1: string = '';
  private PrivateProp1: string = '';

  private privateMethod() {

  }

  /**
   * My Comment on PublicMethod
   */
  public PublicMethod() {

  }

  PublicMethodWithoutPublic(arg: string) {

  }

  PublicMethodWithoutPublicVoid(arg: string): void {

  }

  PublicMethodWithoutPublicString<T>(arg: string): T {
    return undefined;
  }
}
