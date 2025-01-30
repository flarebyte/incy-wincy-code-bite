import Parser from 'tree-sitter';
import { type IncyWincyCodeParser } from './incy-parser.js';
import { type IncyWincySourceModel } from './incy-wincy-model.js';
import javaScript from 'tree-sitter-javascript';

const parser = new Parser();
parser.setLanguage(javaScript);

export class IncyWincyJavascriptParser implements IncyWincyCodeParser {
  parse(sourceFilename: string, code: string): IncyWincySourceModel {
    const tree = parser.parse(code);
    const { children } = tree.rootNode;
    for (const child of children) {
      const {
        type,
        text,
        hasError,
        isExtra,
        isMissing,
        startIndex,
        startPosition,
        endIndex,
        endPosition,
        descendantCount,
      } = child;
      const childInfo = {
        type,
        text,
        hasError,
        isExtra,
        isMissing,
        startIndex,
        startPosition,
        endIndex,
        endPosition,
        descendantCount,
      };
      console.log(childInfo);
    }

    const sourceModel: IncyWincySourceModel = {
      programmingLanguage: 'js',
      sourceFilename,
      sections: [],
    };
    return sourceModel;
  }
}
