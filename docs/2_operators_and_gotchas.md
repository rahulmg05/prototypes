# Operators and Common Gotchas in JavaScript

JavaScript is dynamically typed and uses loose type coercion in many situations. This leads to a lot of famous "gotchas" that are heavily tested in interviews and cause bugs in production.

## 1. `==` vs `===` (Equality)

- `==` (Loose Equality): Before comparing, JavaScript will attempt to convert the variables to a common type. This causes confusing behavior. Example: `0 == '0'` is `true`, `false == 0` is `true`.
- `===` (Strict Equality): Compares both **value** and **type**. No type conversion is done. Example: `0 === '0'` is `false`.

**Rule of Thumb**: ALWAYS use `===` and `!==`. Never use `==` or `!=` unless you know exactly why you are doing it (like checking for both `null` and `undefined` at once, though optional chaining is better now).

## 2. `null` vs `undefined`

- `undefined`: Means a variable has been declared but has not yet been assigned a value. It is the default value of uninitialized variables.
- `null`: An assignment value. It can be assigned to a variable as a representation of no value.

**Gotcha**: `typeof undefined` is `'undefined'`, but `typeof null` is `'object'` (this is a famous bug in JS that will never be fixed for legacy reasons).

## 3. `NaN` (Not a Number)

`NaN` represents a computational error. It is the result of an incorrect or undefined mathematical operation, like trying to multiply a string by a number: `'apple' * 2`.

**Gotcha**: `NaN === NaN` is `false`! To check if a value is `NaN`, you must use the built-in function `Number.isNaN(value)`. Note: Do not use the global `isNaN()` because it forces type coercion first.

## 4. Truthy and Falsy Values

Every value in JavaScript has an inherent boolean value when evaluated in a conditional (like an `if` statement).

- **Falsy Values**: There are exactly 6 falsy values in JS:
  1. `false`
  2. `0` (and `-0`, `0n`)
  3. `""` (empty string)
  4. `null`
  5. `undefined`
  6. `NaN`
- **Truthy Values**: Everything else! Including empty arrays `[]` and empty objects `{}`.

## 5. Pass by Value vs Pass by Reference

- **Primitives** (String, Number, Boolean, Null, Undefined, Symbol, BigInt) are passed by **value**.
- **Objects** (Arrays, Functions, Objects) are passed by **reference**.

If you pass an object to a function and mutate it inside the function, the original object is changed.

## 6. Type Coercion Gotchas

JavaScript tries to be helpful by coercing types. Sometimes it isn't helpful:
- `'5' + 3` results in `'53'` (string concatenation wins).
- `'5' - 3` results in `2` (no string subtraction, so it converts to numbers).

[View Examples](../examples/2_operators_and_gotchas/index.js)
