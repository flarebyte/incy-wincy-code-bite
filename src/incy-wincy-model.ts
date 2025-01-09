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

const codeSection = {
  name: stringFields.string1To80.describe('Name of the section'),
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

const interfaceSection = z.object({
  kind: z.literal('interface').describe('Interface'),
  ...codeSection,
});

const enumSection = z.object({
  kind: z.literal('enum').describe('Enum'),
  ...codeSection,
});

const constSection = z.object({
  kind: z.literal('const').describe('Const'),
  ...codeSection,
});

const functionSection = z.object({
  kind: z.literal('function').describe('Function'),
  ...codeSection,
});

const testSection = z.object({
  kind: z.literal('test').describe('Test'),
  ...codeSection,
});

const otherSection = z.object({
  kind: z.literal('other').describe('Other'),
  ...codeSection,
});

const ImportSchema = z.object({
  type: z.literal('default').or(z.literal('named')).or(z.literal('namespace')),
  source: z.string().url().optional(),
  defaultImport: z.string().optional(),
  namedImports: z.array(z.string()).optional(),
  namespace: z.string().optional(),
});

const importSection = {
  kind: z.literal('import').describe('Import'),
  body: stringFields.string1To1000.describe('The full code of the block'),
  uncommentedBody: stringFields.string1To1000.describe(
    'The code of the block with comments removed'
  ),
  importPaths: z
    .array(stringFields.string1To140)
    .describe('Paths of the imports'),
};
