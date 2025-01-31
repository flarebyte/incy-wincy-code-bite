import Parser from 'tree-sitter';
import { type IncyWincyCodeParser } from './incy-parser.js';
import { type IncyWincySourceModel } from './incy-wincy-model.js';
import javaScript from 'tree-sitter-javascript';

const parser = new Parser();
parser.setLanguage(javaScript);

const findTextByName = (
  child: Parser.SyntaxNode,
  name: string
): string | undefined => {
  const node = child.childForFieldName(name);
  return node ? node.text : undefined;
};

const findAnyByNameAsText = (
  child: Parser.SyntaxNode,
  name: string
): string | undefined => {
  const nodes = child.descendantsOfType(name);
  return nodes[0] ? nodes[0].text : undefined;
};

type TypeAndText = {
  type: string;
  text: string;
};

const displayTypesAndText = (child: Parser.SyntaxNode) => {
  const cursor = child.walk();
  const results: TypeAndText[] = [];

  do {
    const type = cursor.nodeType;
    const text = cursor.nodeText;
    results.push({type, text});

    if (cursor.gotoFirstChild()) {
      continue;
    }

    if (cursor.gotoNextSibling()) {
      continue;
    }

    while (cursor.gotoParent()) {
      if (cursor.gotoNextSibling()) {
        break;
      }
    }
  } while (cursor.currentNode !== child);

  return results;
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
  const identifier = findAnyByNameAsText(child, 'identifier');
  const parameters = findTextByName(child, 'parameters');
  const source = findTextByName(child, 'source');
  const descOverview = displayTypesAndText(child);
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
    identifier,
    parameters,
    source,
    descOverview,
  };
  return childInfo;
};

export class IncyWincyJavascriptParser implements IncyWincyCodeParser {
  parse(sourceFilename: string, code: string): IncyWincySourceModel {
    const tree = parser.parse(code);
    const {children} = tree.rootNode;
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
