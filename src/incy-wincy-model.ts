import { describeEnum, stringEffectFields, stringFields } from 'faora-kai';
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

const codeSection = {
  name: stringFields.string1To80.describe('Name of the class'),
  body: stringFields.string1To1000.describe('The full code of the block'),
  uncommentedBody: stringFields.string1To1000.describe(
    'The code of the block with comments removed'
  ),
  keywords: stringFields.string1To1000
    .optional()
    .describe('Sorted keywords from the code'),
};

const classSection = z.object({
  kind: z.literal('class').describe('Class'),
  ...codeSection,
});
