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

const classSection = z
  .object({
    kind: z.literal('class').describe('Class'),
    ...codeSection,
  })
  .strict()
  .describe(
    'A blueprint that defines the properties and behaviors of objects.'
  );

const interfaceSection = z
  .object({
    kind: z.literal('interface').describe('Interface'),
    ...codeSection,
  })
  .strict()
  .describe(
    'A contract that defines a set of methods that a class must implement'
  );

const enumSection = z
  .object({
    kind: z.literal('enum').describe('Enumeration'),
    ...codeSection,
  })
  .strict()
  .describe('Data type that defines a set of named constants');

const constSection = z
  .object({
    kind: z.literal('const').describe('Const'),
    ...codeSection,
  })
  .strict()
  .describe('');

const functionSection = z
  .object({
    kind: z.literal('function').describe('Function'),
    ...codeSection,
  })
  .strict()
  .describe('Block of reusable code that performs a specific task');

const testSection = z
  .object({
    kind: z.literal('test').describe('Test'),
    ...codeSection,
  })
  .strict()
  .describe(
    'Piece of code designed to verify that another piece of code behaves as expected'
  );

const otherSection = z
  .object({
    kind: z.literal('other').describe('Other'),
    ...codeSection,
  })
  .strict()
  .describe('Any unnamed piece of code');

const tsStyleImport = z
  .object({
    source: stringFields.string1To140.describe('Source of the import'),
    defaultImport: stringFields.string1To80
      .optional()
      .describe('Name of the default import'),
    namedImports: z
      .array(stringFields.string1To80)
      .max(140)
      .describe('Array of named imports'),
  })
  .strict()
  .describe(
    'Selectively imports specific functions, classes, or variables from a module directly'
  );

const importSection = z
  .object({
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
  })
  .strict()
  .describe(
    'Statement that brings external code into the current file, allowing you to use their definitions and functionalities'
  );

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

export const sourceFileSchema = z
  .object({
    programmingLanguage,
    sourceFilename: stringFields.string1To200.describe(
      'File path for the source code'
    ),
    sections: z.array(section),
  })
  .strict()
  .describe('A representation of the source code');

export type IncyWincySourceModel = z.infer<typeof sourceFileSchema>;
export type IncyWincySection = z.infer<typeof section>;
