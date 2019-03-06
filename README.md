# Interface generator for Visual Studio Code

## Description

Interface generator is a VSCode Extension which creates interface files from a typescript class.

`Given class:`

```typescript
export class ExtendsOnly<XY, TG extends string> extends ABC implements DEF {
  public NumberProperty: number = 2;
  OptionalStringProperty?: string;
}
```

Since interfaces can not implement anything, `implements DEF` is omitted.

`Generated interface`

```typescript
export interface IExtendsOnly<XY, TG extends string> extends ABC {
  NumberProperty: number;
  OptionalStringProperty?: string;
}
```

## Installation

You can browse and install extensions from within VS Code. Press `Ctrl+P` and narrow down the list commands by typing `ext install dotup-vscode-interface-generator`.

## Usage

1. Open a typescript class definition file.

![dotup-vscode-interface-generator Screenshot](https://raw.githubusercontent.com/dotupNET/dotup-vscode-interface-generator/master/images/1_InterfaceGenerator.png)

2. Press `Ctrl+Shift+P` to see all commands and start typing `Generate interface` and hit `Enter`.

![dotup-vscode-interface-generator Screenshot](https://raw.githubusercontent.com/dotupNET/dotup-vscode-interface-generator/master/images/2_InterfaceGenerator.png)

The extension creates a new file in the same folder as the source file.
The new file has the name of the source file prefixed with `I`.
Existing files will be overwritten!

![dotup-vscode-interface-generator Screenshot](https://raw.githubusercontent.com/dotupNET/dotup-vscode-interface-generator/master/images/3_InterfaceGenerator.png)


## Release Notes

### 1.0.3

Initial release of Interface generator.

TODO:
- take over comments ( For classes, methods and properties )

### 1.0.4

Fixed:
- Readme: pictures not shown.
- Readme: Wrong 'Generate interface' example

TODO:
- take over comments ( For classes, methods and properties )

**Enjoy!**
