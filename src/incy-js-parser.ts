import Parser from 'tree-sitter';
import { type IncyWincyCodeParser } from './incy-parser.js';
import { type IncyWincySourceModel } from './incy-wincy-model.js';
import javaScript from 'tree-sitter-javascript';

const parser = new Parser();
parser.setLanguage(javaScript);

const asChildInfo = (child: Parser.SyntaxNode) => {
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
  const nameNode = child.childForFieldName('name');
  const name = nameNode ? nameNode.text : undefined;
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
    name,
  };
  return childInfo;
};

export class IncyWincyJavascriptParser implements IncyWincyCodeParser {
  parse(sourceFilename: string, code: string): IncyWincySourceModel {
    const tree = parser.parse(code);
    const { children } = tree.rootNode;
    const childrenInfo = children.map(asChildInfo);
    console.log(JSON.stringify(childrenInfo));

    const sourceModel: IncyWincySourceModel = {
      programmingLanguage: 'js',
      sourceFilename,
      sections: [],
    };
    return sourceModel;
  }
}
