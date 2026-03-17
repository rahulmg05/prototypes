console.log("=== JavaScript Operators & Gotchas ===\n");

// 1. Loose vs Strict Equality
console.log("--- 1. == vs === ---");
console.log("0 == '0':", 0 == '0');      // true (coercion happens)
console.log("0 === '0':", 0 === '0');    // false (strict equality)
console.log("false == 0:", false == 0);  // true
console.log("false === 0:", false === 0); // false
console.log("'' == false:", '' == false); // true

// 2. null vs undefined
console.log("\n--- 2. null vs undefined ---");
let a;
console.log("Uninitialized variable 'a' is:", a); // undefined
let b = null;
console.log("Variable 'b' assigned to null is:", b); // null

// The famous typeof null bug
console.log("typeof undefined:", typeof undefined); // 'undefined'
console.log("typeof null:", typeof null);           // 'object' - this is a bug in JS!

// 3. NaN (Not a Number)
console.log("\n--- 3. NaN ---");
const notANumber = "apple" * 2;
console.log("'apple' * 2 =", notANumber); // NaN
console.log("NaN === NaN?", notANumber === NaN); // false!

// Always use Number.isNaN() to check for NaN
console.log("Is it really NaN?", Number.isNaN(notANumber)); // true

// The global isNaN forces coercion, Number.isNaN doesn't
console.log("global isNaN('hello'):", isNaN('hello')); // true (coerced to NaN first)
console.log("Number.isNaN('hello'):", Number.isNaN('hello')); // false (it's a string, not NaN)

// 4. Truthy and Falsy
console.log("\n--- 4. Truthy and Falsy ---");
// The 6 falsy values in JS
const falsyValues = [false, 0, "", null, undefined, NaN];

console.log("Are falsy values falsey?");
falsyValues.forEach(val => {
    if (!val) {
        console.log(`${String(val)} is falsy`);
    }
});

// Common gotcha: empty arrays and objects are TRUTHY
if ([]) console.log("Empty array [] is truthy!");
if ({}) console.log("Empty object {} is truthy!");

// 5. Pass by Value vs Reference
console.log("\n--- 5. Pass by Value vs Reference ---");
function modifyPrimitive(val) {
    val = 100;
}
let myNum = 10;
modifyPrimitive(myNum);
console.log("myNum after modifyPrimitive:", myNum); // 10 (Passed by value)

function modifyObject(obj) {
    obj.mutated = true;
}
let myObj = { original: true };
modifyObject(myObj);
console.log("myObj after modifyObject:", myObj); // { original: true, mutated: true } (Passed by reference)

// 6. Type Coercion Gotchas
console.log("\n--- 6. Type Coercion ---");
console.log("'5' + 3 =", '5' + 3); // '53' (String concatenation)
console.log("'5' - 3 =", '5' - 3); // 2 (Number subtraction)
console.log("true + 1 =", true + 1); // 2 (true is coerced to 1)
console.log("false + 1 =", false + 1); // 1 (false is coerced to 0)
