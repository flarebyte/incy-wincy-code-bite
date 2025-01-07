import {describeEnum} from 'faora-kai';
import { z } from 'zod';

const programmingLanguageKey = ['js', 'ts', 'dart', 'python'] as const;

const programmingLanguageLabels = {
  js: 'Javascript',
  ts: 'Typescript',
  dart: 'Dart',
  python: 'Python',
};

const programmingLanguage = z
  .enum(programmingLanguageKey)
  .describe(describeEnum('Programming Language:', programmingLanguageLabels));

const blockKindKey = [
  'class',
  'interface',
  'const',
  'function',
  'test',
  'other',
  'import',
] as const;

const blockKindlabels = {
  class: 'Class',
  interface: 'Interface',
  const: 'Constant',
  function: 'Function',
  test: 'Test',
  other: 'Other',
  import: 'Import',
};

const blockKind = z
  .enum(blockKindKey)
  .describe(describeEnum('Language block kind:', blockKindlabels));
