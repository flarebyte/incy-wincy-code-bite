import {describeEnum, stringFields} from 'faora-kai';
import {z} from 'zod';

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

const tsStyleImport = z.object({
  source: stringFields.string1To140.describe('Source of the import'),
  defaultImport: stringFields.string1To80
    .optional()
    .describe('Name of the default import'),
  namedImports: z
    .array(stringFields.string1To80)
    .max(140)
    .describe('Array of named imports'),
});

const importSection = z.object({
  kind: z.literal('import').describe('Import'),
  body: stringFields.string1To1000.describe('The full code of the block'),
  uncommentedBody: stringFields.string1To1000.describe(
    'The code of the block with comments removed'
  ),
  importPaths: z
    .array(stringFields.string1To140)
    .max(140)
    .describe('Paths of the imports'),
  imports: z.array(tsStyleImport).describe('Array of imports'),
});

const section = z
  .discriminatedUnion('kind', [
    classSection,
    interfaceSection,
    functionSection,
    enumSection,
    constSection,
    testSection,
    importSection,
    otherSection,
  ])
  .describe('A selection of sections');

const sourceFile = z.object({
  programmingLanguage,
  sourceFilename: stringFields.string1To200.describe(
    'File path for the source code'
  ),
  sections: z.array(section),
});
