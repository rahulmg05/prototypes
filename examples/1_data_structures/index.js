console.log("=== JavaScript Data Structures ===");

// 1. Arrays (like ArrayList)
console.log("\n--- Arrays ---");
const numbers = [1, 2, 3, 4, 5];

// Mutating methods
numbers.push(6); // Add to end
numbers.unshift(0); // Add to beginning
console.log("Mutated array:", numbers); // [0, 1, 2, 3, 4, 5, 6]

// Functional / Non-mutating methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 0 is initial value
console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);


// 2. Objects (like POJO / lightweight Dictionary)
console.log("\n--- Objects ---");
const user = {
    id: 1,
    name: "Alice",
    role: "Admin"
};

console.log("User name:", user.name);
// Add a property
user.isActive = true;
// Iterating over keys
console.log("Keys:", Object.keys(user)); // ['id', 'name', 'role', 'isActive']
console.log("Values:", Object.values(user));
console.log("Entries:", Object.entries(user)); // Array of [key, value] pairs


// 3. Maps (like HashMap)
console.log("\n--- Maps ---");
// Unlike Objects, Map keys can be of any type (even objects or functions)
const userMap = new Map();
userMap.set("a1", { name: "Bob" });
userMap.set("b2", { name: "Charlie" });

console.log("Map size:", userMap.size);
console.log("Has 'a1'?", userMap.has("a1"));
console.log("Get 'a1':", userMap.get("a1"));

// Iterating over Map
userMap.forEach((val, key) => {
    console.log(`Key: ${key}, Value: ${JSON.stringify(val)}`);
});


// 4. Sets (like HashSet)
console.log("\n--- Sets ---");
// Sets only store unique values
const uniqueNumbers = new Set([1, 1, 2, 3, 3, 4]);
console.log("Set size:", uniqueNumbers.size); // 4 (since duplicates are ignored)
uniqueNumbers.add(5);
uniqueNumbers.delete(1);
console.log("Has 3?", uniqueNumbers.has(3));
console.log("Set items:", Array.from(uniqueNumbers)); // Convert Set back to Array


// 5. Destructuring and Spread Syntax
console.log("\n--- Destructuring & Spread ---");
// Destructuring an Object
const { name, role } = user;
console.log(`Destructured name: ${name}, role: ${role}`);

// Destructuring an Array
const [firstNum, secondNum, ...restNums] = numbers; // the rest (...) collects remaining elements
console.log(`First: ${firstNum}, Second: ${secondNum}, Rest:`, restNums);

// Spread Operator (...) to create a copy and append
const newUser = { ...user, location: "New York" };
console.log("Copied User with location:", newUser);

const newNumbers = [...numbers, 7, 8, 9];
console.log("Copied and expanded numbers:", newNumbers);
