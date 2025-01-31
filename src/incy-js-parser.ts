import Parser from 'tree-sitter';
import { type IncyWincyCodeParser } from './incy-parser.js';
import { type IncyWincySourceModel } from './incy-wincy-model.js';
import javaScript from 'tree-sitter-javascript';

const parser = new Parser();
parser.setLanguage(javaScript);

const asType = (child: Parser.SyntaxNode) => {
  const { type } = child;
  return type;
};

const asText = (child: Parser.SyntaxNode) => {
  const { text } = child;
  return text;
};

const asTypes = (children: Parser.SyntaxNode[]) => {
  return children.map(asType);
};

const findTextByName = (
  child: Parser.SyntaxNode,
  name: string
): string | undefined => {
  const node = child.childForFieldName(name);
  return node ? node.text : undefined;
};

const findTextByChildName = (
  child: Parser.SyntaxNode,
  name: string,
  childName: string
): string | undefined => {
  const parentNode = child.childForFieldName(name);
  if (parentNode) {
    const childNode = parentNode.childForFieldName(childName);
    return childNode ? childNode.text : undefined;
  }
};

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
  const name = findTextByName(child, 'name');
  const parameters = findTextByName(child, 'parameters');
  const source = findTextByName(child, 'source');
  const constName = findTextByChildName(child, 'let', 'name');
  const types = asTypes(child.children);
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
    parameters,
    source,
    types,
    constName,
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
