import * as path from 'path';
import * as vscode from 'vscode';

export namespace Path {
  export function getRootPath(file: string): string {
    return vscode.workspace.asRelativePath(file);
  }

  export function getFilePath(file: string): string {
    if (path.isAbsolute(file)) {

    } else {
      return path.join(getRootPath(file));
    }
  }

  export function join(...paths: string[]): string {
    return path.join(...paths);
  }

  export function camelCase(value: string): string {
    return value
      .charAt(0)
      .toLowerCase() + value.substr(1);
  }

  export function getRelativePath(sourceFilePath: string, targetFilePath: string): string {
    const sourceDir = path.normalize(path.dirname(sourceFilePath));
    const targetDir = path.normalize(path.dirname(targetFilePath));

    return path.relative(targetDir, sourceDir);
  }

  export function normalizePath(value: string): string { return value.replace(/\\/g, '/'); }

  export function dirname(value: string): string {
    return path.dirname(value);
  }

  export function basename(value: string, ext?: string): string {
    return path.basename(value, ext);
  }

}
