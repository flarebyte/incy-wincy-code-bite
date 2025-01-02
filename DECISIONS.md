# Architecture decision records

An [architecture
decision](https://cloud.google.com/architecture/architecture-decision-records)
is a software design choice that evaluates:

-   a functional requirement (features).
-   a non-functional requirement (technologies, methodologies, libraries).

The purpose is to understand the reasons behind the current architecture, so
they can be carried-on or re-visited in the future.

## initial Idea

### Specification for a Code Parsing Library

#### Problem Description

Develop a TypeScript library to parse code written in TypeScript, JavaScript,
Dart, or Python and extract key structural elements (classes, functions,
interfaces, enums, etc.). The library should create a JSON model with
detailed metadata for each extracted block, enabling reconstruction of the
original code. It should gracefully handle syntax errors and support content
resolvers for various storage backends. The system must be designed to evolve
for additional programming languages in the future.

#### Key Features

1.  **Code Parsing and Block Identification**

    -   Extract important blocks: `class`, `function`, `interface`, `enum`, and
        similar constructs.
    -   Include a fallback block type for "uncategorized code" to handle
        everything that doesn't match predefined types.

2.  **Metadata for Each Block**\
    For each identified block:

    -   **Type**: e.g., `class`, `function`, `interface`, etc.
    -   **Name**: The block's identifier (e.g., `MyClass`, `doSomething`).
    -   **Body**: The full code of the block.
    -   **Uncommented Body**: The code of the block with comments removed.
    -   **Relative File Name**: Path of the file relative to the project's
        root.
    -   **Rank**: Order of the block's appearance in the file.

3.  **JSON Model Generation**\
    Produce a structured JSON representation of the parsed code, ensuring it is reversible for reconstructing the original code.

4.  **Error Tolerance**

    -   Assume input code is generally valid.
    -   Implement a fallback strategy to continue processing when syntax errors
        are encountered.

5.  **Content Resolver Support**

    -   Provide mechanisms to read code from the file system, databases, or
        web.
    -   Ensure the library can easily integrate with custom content resolvers
        for other storage systems.

6.  **Import Understanding**

    -   Analyze and record information about imports, including their targets
        and paths.
    -   Allow users to query dependencies and their relationships.

7.  **Future Language Support**
    -   Design the architecture to be extensible for additional languages
        beyond TypeScript, JavaScript, Dart, and Python.

#### Use Cases

1.  Extracting structural information for code analysis tools or static
    code analyzers.
2.  Generating metadata for documentation or visual representations of code
    structure.
3.  Refactoring or reformatting source code based on extracted JSON.
4.  Creating language-agnostic frameworks for processing code from various
    languages.
5.  Integrating with code editors or IDEs for advanced code navigation.

#### Edge Cases

1.  **Mixed Content**: Files containing a mix of supported and unsupported
    code (e.g., Python code with embedded shell scripts).
2.  **Syntax Errors**: Invalid syntax, such as missing braces or parentheses.
3.  **Unusual Constructs**: Nested classes, functions within functions, or
    complex decorators.
4.  **File Encoding**: Non-UTF-8 encoded files or files with BOM markers.
5.  **Partial Files**: Truncated files or files in the process of being
    written.

#### Limitations

1.  **Non-Supported Languages**: The library should not attempt to parse
    unsupported languages.
2.  **Semantic Analysis**: No need for deep semantic understanding (e.g., type
    inference or variable resolution).
3.  **Runtime Behavior**: The library does not execute or evaluate code.
4.  **Comment Parsing**: Extracting meaning from comments is out of scope.
    Comments will only be stripped for the uncommented body.
5.  **Obfuscated Code**: Parsing minified or obfuscated code is not a
    priority.

#### Examples

1.  **Input**

    ```typescript
    import { Something } from "./module";
    class MyClass {
      // Constructor
      constructor() {
        console.log("Hello");
      }
    }
    ```

    **Output JSON**

    ```json
    {
      "blocks": [
        {
          "type": "import",
          "name": null,
          "body": "import { Something } from './module';",
          "uncommentedBody": "import { Something } from './module';",
          "relativeFileName": "src/example.ts",
          "rank": 1
        },
        {
          "type": "class",
          "name": "MyClass",
          "body": "class MyClass {\n    // Constructor\n    constructor() {\n        console.log(\"Hello\");\n    }\n}",
          "uncommentedBody": "class MyClass {\n    constructor() {\n        console.log(\"Hello\");\n    }\n}",
          "relativeFileName": "src/example.ts",
          "rank": 2
        }
      ]
    }
    ```

2.  **Syntax Error Handling**\
    Input with missing braces should still process partially and recover gracefully.

3.  **Uncategorized Code**\
    Extract inline scripts or standalone expressions into an `uncategorized` block type.

#### Non-Goals

-   No need to provide auto-completion or language server features.
-   Avoid focusing on highly optimized performance for extremely large
    codebases in this version.
-   Refrain from implementing full AST transformation capabilities; stay at
    the level of block-based extraction.
