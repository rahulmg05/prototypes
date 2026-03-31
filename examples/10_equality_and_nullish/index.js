console.log("=== JavaScript Equality & Nullish Operators ===\n");

// --- 1. Equality: == vs === ---
console.log("--- 1. Loose (==) vs Strict (===) Equality ---");

// Type Coercion Magic
console.log("0 == '0':", 0 == '0');       // true!
console.log("0 === '0':", 0 === '0');     // false. Number != String

console.log("false == 0:", false == 0);   // true!
console.log("false === 0:", false === 0); // false. Boolean != Number

console.log("'' == false:", '' == false); // true!
console.log("'' === false:", '' === false); // false. String != Boolean

// The classic null/undefined edge case
console.log("null == undefined:", null == undefined);   // true. They are loosely equal to each other
console.log("null === undefined:", null === undefined); // false. Different primitive types


// --- 2. Object Comparison ---
console.log("\n--- 2. Comparing Objects (References vs Values) ---");
const arrA = [1, 2, 3];
const arrB = [1, 2, 3];
const arrC = arrA; // Points to the exact same memory address

console.log("arrA === arrB:", arrA === arrB); // false! They are different objects in memory.
console.log("arrA === arrC:", arrA === arrC); // true! They point to the same memory reference.


// --- 3. The `Object.is()` Edge Cases ---
console.log("\n--- 3. Object.is() vs Strict Equality ---");
console.log("NaN === NaN:", NaN === NaN);             // false!
console.log("Object.is(NaN, NaN):", Object.is(NaN, NaN)); // true!

console.log("+0 === -0:", +0 === -0);                 // true!
console.log("Object.is(+0, -0):", Object.is(+0, -0)); // false!


// --- 4. Logical OR (||) vs Nullish Coalescing (??) ---
console.log("\n--- 4. Logical OR (||) vs Nullish Coalescing (??) ---");
// Imagine a user deliberately set their preferences
const userPrefs = {
    volume: 0,
    theme: "",
    notifications: false,
    fontSize: undefined, // Forgot to set
    bio: null          // Intentionally blank
};

console.log("The problem with Logical OR (||): It short-circuits on 'Falsy' values!");
console.log("Volume 0 || 100:", userPrefs.volume || 100);             // 100! (Bug: Overwrote intentional 0)
console.log("Theme '' || 'dark':", userPrefs.theme || "dark");        // "dark"! (Bug: Overwrote intentional "")
console.log("Notifs false || true:", userPrefs.notifications || true); // true! (Bug: Overwrote intentional false)

console.log("\nThe solution is Nullish Coalescing (??): It ONLY short-circuits on `null` or `undefined`!");
console.log("Volume 0 ?? 100:", userPrefs.volume ?? 100);             // 0. (Kept intentional 0)
console.log("Theme '' ?? 'dark':", userPrefs.theme ?? "dark");        // "". (Kept intentional "")
console.log("Notifs false ?? true:", userPrefs.notifications ?? true); // false. (Kept intentional false)
console.log("FontSize undefined ?? 12:", userPrefs.fontSize ?? 12);    // 12. (Correctly provided default)
console.log("Bio null ?? 'No bio':", userPrefs.bio ?? "No bio");       // "No bio". (Correctly provided default)


// --- 5. Optional Chaining (?.) ---
console.log("\n--- 5. Optional Chaining (?.) ---");
// Deeply nested object where `address` doesn't exist
const userProfile = { name: "Alice" };

try {
    // This will throw a TypeError: Cannot read properties of undefined (reading 'zipcode')
    console.log(userProfile.address.zipcode);
} catch (e) {
    console.log("Caught Error (Without ?.):", e.message);
}

// Optional Chaining safely navigates the tree.
// If `address` is undefined, it immediately stops and returns undefined without crashing!
const zip = userProfile?.address?.zipcode;
console.log("Safe access (With ?.):", zip); // undefined


// --- 6. Combining ?. and ?? ---
console.log("\n--- 6. Combining ?. and ?? ---");
// "Try to safely get the zipcode. If any step along the way is undefined or null, fallback to '00000'"
const safeZip = userProfile?.address?.zipcode ?? "00000";
console.log("Combined safely:", safeZip); // "00000"


// --- 7. The Ternary Operator (?) ---
console.log("\n--- 7. The Ternary Operator (condition ? true : false) ---");
const age = 20;
// It evaluates the left side for "Truthiness". If truthy, it returns the first value. Else, the second.
const category = (age >= 18) ? "Adult" : "Minor";
console.log(`Age ${age} is category:`, category);
