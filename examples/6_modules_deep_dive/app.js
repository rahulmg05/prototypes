/**
 * This file demonstrates all the different ways to import from a module.
 */

console.log("=== Node.js ES Modules Deep Dive ===\n");

// --- 1. Importing the Default Export ---
// Because it's the `default` export, we don't need curly braces {}.
// We can name this variable anything we want!
import AnyNameForCalculator from './math.js';
const calc = new AnyNameForCalculator("Default");
console.log("1. Default Import:", calc.identify());


// --- 2. Importing Named Exports ---
// Because these are `named` exports, we MUST use curly braces {}.
// We must also use the exact variable names defined in `math.js`.
import { PI, add } from './math.js';
console.log(`\n2. Named Import: PI is ${PI}`);
console.log(`2. Named Import: 2 + 2 = ${add(2, 2)}`);


// --- 3. Aliasing Named Exports ---
// What if we already have a variable named `add` in this file?
// We can use the `as` keyword to rename an import locally to avoid collisions.
import { add as myLocalAddFunc } from './math.js';
const myLocalAdd = 100; // Let's pretend this existed
console.log(`\n3. Aliased Named Import: 5 + 5 = ${myLocalAddFunc(5, 5)}`);


// --- 4. Mixing Default and Named Imports ---
// This is very common (e.g., `import React, { useState } from 'react';`)
// The default import comes first, outside the braces. The named imports follow inside braces.
import TheCalculatorClass, { E, multiply } from './math.js';
const secondCalc = new TheCalculatorClass("Mixed");
console.log(`\n4. Mixed Import: ${secondCalc.identify()} and E is ${E}`);
console.log(`4. Mixed Import: 3 * 3 = ${multiply(3, 3)}`);


// --- 5. The Namespace Import ---
// If a file has 50 named exports, you can bundle the entire module into a single object.
// Notice that the `default` export simply becomes a property on the object called "default"!
import * as MathOps from './math.js';
console.log(`\n5. Namespace Import: MathOps.PI is ${MathOps.PI}`);
console.log(`5. Namespace Import: MathOps.add(10, 10) is ${MathOps.add(10, 10)}`);

// Since default is a reserved JS word, we can't do `MathOps.default()`. We have to access the property.
const thirdCalc = new MathOps.default("Namespace");
console.log(`5. Namespace Import (Accessing default property):`, thirdCalc.identify());


// --- 6. The "Under the Hood" Truth ---
// The syntax in #1 (`import Calculator from './math.js'`) is actually just syntactic sugar for this:
import { default as ExplicitDefaultName } from './math.js';
const fourthCalc = new ExplicitDefaultName("Under-the-hood");
console.log(`\n6. The truth about defaults:`, fourthCalc.identify());
