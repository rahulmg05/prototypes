console.log("=== JavaScript Data Structures ===\n");

// --- 1. Arrays (like ArrayList) ---
console.log("--- Arrays ---");
const numbers = [1, 2, 3];

// Mutating methods
numbers.push(4); // Add to end
console.log("Mutated array (Push):", numbers); // [1, 2, 3, 4]

// Functional / Non-mutating methods
const doubled = numbers.map(n => n * 2);
console.log("Original array unchanged:", numbers);
console.log("Doubled array (Map):", doubled);

// Iteration
console.log("\nIterating Array with for...of:");
for (const num of numbers) {
    if (num === 2) continue; // We can use continue/break here!
    console.log(num);
}

// Gotcha: Reference vs Value
console.log("\nGotcha: Array References");
const arrayA = [1];
const arrayB = arrayA;
arrayB.push(2);
console.log("ArrayA after modifying ArrayB:", arrayA); // [1, 2]

// Gotcha: typeof Array
console.log("typeof []:", typeof []); // "object"
console.log("Array.isArray([]):", Array.isArray([])); // true


// --- 2. Objects (like POJO / lightweight Dictionary) ---
console.log("\n\n--- Objects ---");
const user = {
    id: 1,
    name: "Alice",
    role: "Admin"
};

// Iterating over keys
console.log("Iterating Object.entries:");
for (const [key, value] of Object.entries(user)) {
    console.log(`- ${key}: ${value}`);
}

// Gotcha: Stringified Keys
console.log("\nGotcha: Object Keys are always strings");
const myObj = {};
const keyObj1 = { a: 1 };
const keyObj2 = { b: 2 };

// JavaScript converts the object keys to the string "[object Object]"
myObj[keyObj1] = "Value 1";
myObj[keyObj2] = "Value 2";
console.log("myObj using Objects as keys:", myObj); // { '[object Object]': 'Value 2' } -> Overwritten!


// --- 3. Maps (like HashMap) ---
console.log("\n\n--- Maps ---");
// Unlike Objects, Map keys can be of any type (even objects or functions)
const userMap = new Map();

// Using objects as keys safely
const mapKey1 = { id: 1 };
const mapKey2 = { id: 2 };

userMap.set(mapKey1, "Alice");
userMap.set(mapKey2, "Bob");

console.log("Map size:", userMap.size); // 2

// Iterating over Map
console.log("Iterating Map with for...of:");
for (const [key, value] of userMap) {
    console.log(`Key ID: ${key.id}, Value: ${value}`);
}

// Gotcha: Reference Keys
console.log("\nGotcha: Map Reference Keys");
// Trying to get Alice by passing an identical object structure will fail
// because it's a different object reference in memory!
console.log("Get {id: 1} directly:", userMap.get({ id: 1 })); // undefined
console.log("Get using original reference:", userMap.get(mapKey1)); // "Alice"

// Gotcha: JSON Serialization
console.log("JSON.stringify(userMap):", JSON.stringify(userMap)); // {} (Maps don't serialize natively)


// --- 4. Sets (like HashSet) ---
console.log("\n\n--- Sets ---");
// Sets only store unique values
const uniqueNumbers = new Set([1, 1, 2, 3, 3, 4]);
console.log("Set initialized with duplicates:", Array.from(uniqueNumbers)); // [1, 2, 3, 4]

// Iteration
console.log("Iterating Set with for...of:");
for (const num of uniqueNumbers) {
    console.log(num);
}

// Gotcha: Object Uniqueness
console.log("\nGotcha: Object Uniqueness in Sets");
const objSet = new Set();
objSet.add({ a: 1 });
objSet.add({ a: 1 }); // These are two different object references!
console.log("Set size after adding identical objects:", objSet.size); // 2


// --- 5. Destructuring and Spread Syntax ---
console.log("\n\n--- Destructuring & Spread ---");
const person = { first: "Jane", last: "Doe", age: 30 };

// Object Destructuring
const { first, last } = person;
console.log(`Destructured: ${first} ${last}`);

// Spread Operator (...) to create a copy and append
// This is the SAFE way to copy an array or object to avoid the Reference Gotcha!
const copyPerson = { ...person, location: "New York" };
console.log("Copied Object with Spread:", copyPerson);

const copyArray = [...numbers, 5];
console.log("Copied Array with Spread:", copyArray);
