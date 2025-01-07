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
  .describe(describeEnum('Encryption strength:', programmingLanguageLabels));

const blockKindKey = [
  'class',
  'interface',
  'const',
  'function',
  'test',
  'other',
] as const;

const blockKindlabels = {
  class: 'Class',
  interface: 'Interface',
  const: 'Constant',
  function: 'Function',
  test: 'Test',
  other: 'Other',
};

const blockKind = z
  .enum(blockKindKey)
  .describe(describeEnum('Encryption strength:', blockKindlabels));
