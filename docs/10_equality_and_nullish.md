# Equality and Nullish Coalescing in JavaScript

Because JavaScript is dynamically typed, it relies heavily on **Type Coercion**. This means the JS engine will actively try to convert variables from one type to another (e.g., from a String to a Number) behind the scenes to make an operation work.

This leads to two of the most critical and confusing aspects of the language: Loose vs Strict Equality, and Truthy/Falsy short-circuiting.

---

## 1. Equality: `==` (Loose) vs `===` (Strict)

In Java, you use `==` to compare primitive values and `.equals()` to compare Object values. In JavaScript, you use `===` for almost everything.

### Loose Equality (`==` and `!=`)

Loose equality compares two values for equality **after attempting to convert them to a common type**.

This type coercion is governed by incredibly complex rules defined in the ECMAScript specification. It often leads to bizarre, unintuitive results.

```javascript
0 == '0';          // true  (String '0' is coerced to Number 0)
false == 0;        // true  (Boolean false is coerced to Number 0)
'' == false;       // true  (Empty string is coerced to Number 0, false is coerced to 0)
[1, 2] == '1,2';   // true  (Array is coerced to a comma-separated String)
null == undefined; // true  (Special rule: null and undefined are loosely equal to each other, but nothing else)
```

**The Golden Rule:** Never use `==`. It is considered a universally bad practice in modern JavaScript because the coercion rules are too complex to keep in your head, leading to subtle bugs.

### Strict Equality (`===` and `!==`)

Strict equality compares two values for equality **without performing any type conversion**.

If the two values are of different types, it immediately returns `false`. If they are of the same type, it compares their values.

```javascript
0 === '0';          // false (Number vs String)
false === 0;        // false (Boolean vs Number)
'' === false;       // false (String vs Boolean)
null === undefined; // false (Null vs Undefined)
```

**Object Comparison**
Just like Java, when using `===` (or `==`) to compare Objects or Arrays, JavaScript compares their **memory references**, not their contents.

```javascript
const a = [1, 2];
const b = [1, 2];
a === b; // false! They are different objects in memory.
```

*(Note: If you need to deeply compare two objects to see if their properties match, you must use a utility library like Lodash's `_.isEqual()` or Node's `util.isDeepStrictEqual()`.)*

### The `Object.is()` Method
There is technically a third way to compare values: `Object.is(val1, val2)`. It behaves exactly like `===` with two tiny mathematical exceptions:

1. `NaN === NaN` is `false`. But `Object.is(NaN, NaN)` is `true`.
2. `+0 === -0` is `true`. But `Object.is(+0, -0)` is `false`.

---

## 2. Dealing with "Nothingness": `?` vs `??` vs `||`

In Java, checking for `null` before calling a method is a constant chore to avoid `NullPointerExceptions`. JavaScript has similar issues with `null` and `undefined`, but provides powerful syntactic sugar to handle them.

### The Logical OR Operator (`||`) - The Old Way

Historically, developers used the Logical OR operator to provide default values.

```javascript
// If user.name is "falsy", use "Guest"
const username = user.name || "Guest";
```

**The Gotcha**: `||` evaluates the left side for **Truthiness**. If the left side is any of the 6 "Falsy" values (`false`, `0`, `""`, `null`, `undefined`, `NaN`), it returns the right side.

This causes massive bugs if `0` or `""` are actually valid, intentional values!

```javascript
// BUG: A user deliberately sets their volume to 0.
// But 0 is falsy, so JS overwrites it with the default 100!
const volume = user.settings.volume || 100; // Returns 100
```

### The Nullish Coalescing Operator (`??`) - The Modern Way

Introduced in ES2020, `??` solves the `||` bug.

`??` only looks for **"Nullish"** values. It returns the right side **only if the left side is strictly `null` or `undefined`**. It completely ignores `0`, `""`, and `false`.

```javascript
// FIXED: 0 is not null or undefined, so it keeps the 0!
const volume = user.settings.volume ?? 100; // Returns 0

const missing = undefined ?? "Default";     // Returns "Default"
```

### The Optional Chaining Operator (`?.`)

If you want to access a deeply nested property (`user.profile.address.zipcode`), but you aren't sure if `profile` or `address` exists, attempting to read `.zipcode` will throw a `TypeError: Cannot read properties of undefined`.

The Optional Chaining operator (`?.`) immediately stops evaluating and returns `undefined` if the value to its left is `null` or `undefined`. It does not throw an error.

```javascript
// Java equivalent: if (user != null && user.profile != null && user.profile.address != null) ...
const zip = user?.profile?.address?.zipcode;
```

**Combining `?.` and `??`**
These two operators are meant to be used together to safely navigate trees and provide a default fallback.

```javascript
// "Try to get the zipcode. If any step along the way is null/undefined, default to 00000."
const zip = user?.profile?.address?.zipcode ?? "00000";
```

### The Ternary Operator (`condition ? true : false`)

Do not confuse `?.` or `??` with the standard ternary operator, which is just a single-line `if/else` statement. It evaluates the condition for truthiness.

```javascript
const status = (age >= 18) ? "Adult" : "Minor";
```

[View the Equality and Nullish Examples](../examples/10_equality_and_nullish/)
