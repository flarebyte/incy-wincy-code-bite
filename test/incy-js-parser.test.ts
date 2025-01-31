import {test} from 'node:test';
import assert from 'node:assert';
import {IncyWincyJavascriptParser} from '../src/index.mjs';

const jsContent = `// Variables and Data Types

// Declaring variables using let (block scope) and const (constant)
let name = "John Doe";
const age = 30;
let isStudent = false;

// Data types
let number = 10; // Number
let float = 3.14; // Number (floating-point)
let string = "Hello, world!"; // String
let boolean = true; // Boolean
let nullValue = null; // Null
let undefinedValue = undefined; // Undefined
let symbol = Symbol("unique"); // Symbol (ES6+)
let bigIntValue = 1234567890123456789012345678901234567890n; // BigInt (ES6+)

// Arrays
let colors = ["red", "green", "blue"];
colors.push("yellow"); // Add an element
let firstColor = colors[0]; // Access the first element

// Objects
let person = {
  name: "Jane Doe",
  age: 25,
  city: "New York",
  greet: function() {
    console.log("Hello, my name is " + this.name);
  }
};
person.greet(); // Call the greet method

// Operators

let sum = number + 5; // Addition
let difference = number - 3; // Subtraction
let product = number * 2; // Multiplication
let quotient = number / 2; // Division
let remainder = number % 3; // Modulus
let isEqual = (age === 30); // Strict equality
let isGreaterThan = (age > 20); // Greater than
let logicalAnd = (isStudent && isGreaterThan); // Logical AND
let logicalOr = (isStudent || isGreaterThan); // Logical OR
let notIsStudent = !isStudent; // Logical NOT

// Control Flow

// if-else statement
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// switch statement
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("It's Monday!");
    break;
  case "Tuesday":
    console.log("It's Tuesday!");
    break;
  default:
    console.log("It's another day.");
}

// for loop
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// while loop
let counter = 0;
while (counter < 5) {
  console.log(counter);
  counter++;
}

// do-while loop
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 3);

// for...in loop (for iterating over object properties)
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// for...of loop (for iterating over iterable objects like arrays)
for (let color of colors) {
  console.log(color);
}


// Functions

// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const multiply = function(a, b) {
  return a * b;
};

// Arrow function (ES6+)
const subtract = (a, b) => a - b;

// Function with default parameter
function greet(name = "Guest") {
  console.log("Hello, " + name + "!");
}

greet(); // Output: Hello, Guest!
greet("Alice"); // Output: Hello, Alice!

// Classes (ES6+)

class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  makeSound() {
    console.log("Generic animal sound");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Canine"); // Call the parent constructor
    this.breed = breed;
  }

  makeSound() {  // Method overriding
    console.log("Woof!");
  }

  bark() {
    console.log("Bark bark!");
  }
}

let myDog = new Dog("Buddy", "Golden Retriever");
myDog.makeSound(); // Output: Woof!
myDog.bark(); // Output: Bark bark!
console.log(myDog.name); // Output: Buddy
console.log(myDog.species); // Output: Canine

// Try...Catch (Error Handling)

try {
  // Code that might throw an error
  let result = 10 / 0; // This will cause a division by zero error
  console.log("Result:", result); // This line won't be executed
} catch (error) {
  // Code to handle the error
  console.error("An error occurred:", error.message);
} finally {
    // Code that always runs, regardless of whether an exception was thrown
    console.log("This will always execute.");
}

//  Template literals (ES6+)
let message = 'My dog's name is \${myDog.name} and he is a \${myDog.breed}.';
console.log(message);

// Destructuring (ES6+)
const { name: dogName, breed } = myDog; // Renaming name to dogName
console.log(dogName); // Output: Buddy
console.log(breed);   // Output: Golden Retriever

// Spread syntax (ES6+)
const moreColors = [...colors, "purple", "orange"];  // Creates a new array
console.log(moreColors);

const anotherPerson = { ...person, age: 30 }; // Creates a new object with updated age
console.log(anotherPerson);

//  Modules (ES6+)  (Simplified example - actual module usage would involve separate files and import/export statements)

// In a separate file (e.g., myModule.js):
// export function myFunction() { ... }

// In your main script:
import { myFunction, myFunction2, myFunction3 } from './myModule.js';

// Promises (for asynchronous operations)

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "Data from server" };
            resolve(data);  // Simulate successful data retrieval
            // reject("Error fetching data"); // Simulate an error
        }, 1000); // Simulate a 1-second delay
    });
}

fetchData()
    .then(data => {
        console.log("Data received:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

// Async/await (ES8+) (makes working with promises easier)

async function getData() {
    try {
        const data = await fetchData();
        console.log("Data using async/await:", data);
    } catch (error) {
        console.error("Error in async/await:", error);
    }
}

getData();
`;

const jsImport = `
import { myFunction, myFunction2, myFunction3 } from './myModule.js';
`;

test('IncyWincyJavascriptParser.parse() should return a valid IncyWincySourceModel', () => {
  const parser = new IncyWincyJavascriptParser();
  const filename = 'test.js';

  const sourceModel = parser.parse(filename, jsImport);

  assert.strictEqual(
    sourceModel.programmingLanguage,
    'js',
    'Programming language should be "js"'
  );
  assert.strictEqual(
    sourceModel.sourceFilename,
    filename,
    'Source filename should match input'
  );
  console.log('>>>', JSON.stringify(sourceModel, null, 2));
  assert.deepStrictEqual(
    sourceModel.sections,
    [],
    'Sections should be an empty array initially'
  );
});
