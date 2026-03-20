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


// 7. The `this` Keyword Gotchas
console.log("\n--- 7. The `this` Keyword Gotchas ---");

const myServer = {
    port: 8080,

    // 1. Implicit Binding: `this` points to the object it's called on
    startServer: function() {
        console.log(`[Method] Starting server on port ${this.port}`);
    },

    // 2. The Callback Bug (Losing `this`)
    startWithDelayBug: function() {
        // We pass the method directly as a callback to setTimeout
        // When setTimeout eventually runs it, it executes it as a standalone function
        // (Rule #4 - Default Binding), so `this` becomes undefined (in strict mode) or the global object!
        setTimeout(function() {
            try {
                console.log(`[Buggy Callback] Starting server on port ${this.port}`);
            } catch (e) {
                console.log(`[Buggy Callback Error] ${e.message}`);
            }
        }, 100);
    },

    // 3. The Explicit Binding Solution (Pre-ES6)
    startWithDelayBind: function() {
        // We use .bind() to explicitly lock the `this` context to `myServer` before passing it to setTimeout
        setTimeout(function() {
            console.log(`[Bind Callback] Starting server on port ${this.port}`);
        }.bind(this), 200);
    },

    // 4. The Modern Solution: Arrow Functions
    startWithDelayArrow: function() {
        // Arrow functions DO NOT have their own `this`. They inherit it lexically from the surrounding scope
        // (which is the `startWithDelayArrow` method, where `this` correctly points to `myServer`).
        setTimeout(() => {
            console.log(`[Arrow Callback] Starting server on port ${this.port}`);
        }, 300);
    }
};

// Execute the `this` examples
myServer.startServer();
myServer.startWithDelayBug();
myServer.startWithDelayBind();
myServer.startWithDelayArrow();

// Note: Because setTimeout is asynchronous, the outputs will appear a few hundred milliseconds later!
