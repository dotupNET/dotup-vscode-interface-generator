# Interface generator for Visual Studio Code

## Description

Interface generator is a VSCode Extension which creates interface files from a typescript class.

`Given class:`

```typescript
export class ExtendsOnly<XY, TG extends string> extends ABC implements DEF {
  public NumberProperty: number = 2;
}
```

Since interfaces can not implement anything, `implements DEF` is omitted.

`Generated interface`

```typescript
export interface IExtendsOnly<XY, TG extends string> extends ABC {
  public NumberProperty: number = 2;
}
```

## Installation

You can browse and install extensions from within VS Code. Press `Ctrl+P` and narrow down the list commands by typing `ext install dotup-vscode-interface-generator`.

## Usage

1. Open a typescript class definition file.

![dotup-vscode-interface-generator Screenshot](https://github.com/dotupNET/dotup-vscode-interface-generator/blob/master/images/1_InterfaceGenerator.png)

2. Press `Ctrl+Shift+P` to see all commands and start typing `Generate interface` and hit `Enter`.

![dotup-vscode-interface-generator Screenshot](https://github.com/dotupNET/dotup-vscode-interface-generator/blob/master/images/2_InterfaceGenerator.png)

The extension creates a new file in the same folder as the source file.
The new file has the name of the source file prefixed with `I`.
Existing files will be overwritten!

![dotup-vscode-interface-generator Screenshot](https://github.com/dotupNET/dotup-vscode-interface-generator/blob/master/images/3_InterfaceGenerator.png)


## Release Notes

### 1.0.0

Initial release of Interface generator.

**Enjoy!**
