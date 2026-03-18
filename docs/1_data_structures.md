# JavaScript Data Structures

Coming from Java, you might be used to `ArrayList`, `HashMap`, `HashSet`, etc. Modern JavaScript (ES6+) provides powerful built-in data structures that handle these use cases seamlessly.

## 1. Arrays (like `ArrayList`)
Arrays in JS are dynamic and ordered. While they can hold mixed types (e.g., `[1, "hello", true]`), it's best practice to store objects or values of the same shape.

- **Initialization**: `const arr = [1, 2, 3];`
- **Mutating Operations**: Add/remove from the end (`arr.push()`, `arr.pop()`). Add/remove from the beginning (`arr.unshift()`, `arr.shift()`).
- **Higher-Order Functions (Non-mutating)**: JS arrays heavily utilize functional methods like `.map()`, `.filter()`, and `.reduce()`. These return *new* arrays.
- **Iteration**:
  - `for (let item of arr)`: The modern, preferred way to loop over arrays.
  - `arr.forEach(item => ...)`: Functional approach, but you cannot `break` or `continue` out of it.
  - `for (let i = 0; i < arr.length; i++)`: The classic approach (rarely needed now).

**Gotchas**:
- **Reference vs Value**: Arrays are passed by reference. `const a = [1]; const b = a; b.push(2);` modifies `a` as well!
- **`typeof` Array**: `typeof []` evaluates to `"object"`. To strictly check if a variable is an array, you must use `Array.isArray(variable)`.
- **Sparse Arrays**: You can technically do `arr[10] = 'a'` on a length 1 array, creating "empty slots". This causes unexpected behavior in iteration methods.

**Recommended Usage**: Use Arrays when you need ordered, index-based lists of items, or when you intend to utilize functional data transformations (`map`/`filter`/`reduce`).

## 2. Objects (like lightweight Dictionaries / POJOs)
Plain old JavaScript objects (POJOs) are the most common way to store key-value pairs. Keys are strictly converted to **strings or symbols**.

- **Initialization**: `const obj = { name: 'Alice', age: 30 };`
- **Access**: Dot notation (`obj.name`) or bracket notation (`obj['name']`). Bracket notation is required if the key is dynamic or contains spaces.
- **Iteration**:
  - `Object.keys(obj)`: Returns an array of keys.
  - `Object.values(obj)`: Returns an array of values.
  - `Object.entries(obj)`: Returns an array of `[key, value]` pairs. You can loop it via `for (const [key, value] of Object.entries(obj))`.
  - `for (let key in obj)`: The classic way to loop over an object's keys.

**Gotchas**:
- **Stringified Keys**: If you try to use an object as a key (e.g., `obj[otherObj] = 1`), JavaScript converts `otherObj` to the string `"[object Object]"`.
- **Prototype Chain Pollution**: Objects inherit from `Object.prototype`. If someone modifies the prototype globally, those properties will appear when you use a `for...in` loop unless you explicitly filter them out using `obj.hasOwnProperty(key)`.
- **Order is not guaranteed**: While modern engines generally preserve insertion order for string keys, you should never rely on an Object maintaining order.

**Recommended Usage**: Use Objects to represent entities or records (like a row in a database), config maps, or when you are sending/receiving JSON APIs.

## 3. Map (like `HashMap`)
`Map` was introduced in ES6 specifically for key-value storage without the baggage of Object prototypes. It allows **any data type** (including objects or functions) to be used as a key.

- **Initialization**: `const map = new Map();`
- **Operations**: `map.set('key', 'value')`, `map.get('key')`, `map.has('key')`, `map.delete('key')`, `map.size`.
- **Iteration**: Maps are iterable by default.
  - `for (const [key, value] of map)`: The standard way.
  - `map.forEach((value, key) => ...)`: Note the arguments are `(value, key)`, unlike Arrays.

**Gotchas**:
- **Serialization**: Unlike Objects, `Map`s do not natively serialize to JSON. `JSON.stringify(map)` results in `{}`. You have to manually convert it to an array or object first.
- **Reference Keys**: If you use an object as a key (`map.set({}, 'val')`), you can never retrieve it unless you kept a reference to that *exact* object instance.

**Recommended Usage**: Use `Map` when you need a dictionary/hashmap, when keys are unknown until runtime, when you need keys that aren't strings, or when frequent additions/removals are required (Maps are optimized for this).

## 4. Set (like `HashSet`)
`Set` stores unique values of any type.

- **Initialization**: `const set = new Set([1, 2, 2, 3]);` (Results in `{1, 2, 3}`).
- **Operations**: `set.add(4)`, `set.delete(1)`, `set.has(2)`, `set.size`.
- **Iteration**: `for (const item of set)`.

**Gotchas**:
- **Object Uniqueness**: Two identical objects are NOT considered the same value because they occupy different memory addresses. `new Set([{a: 1}, {a: 1}])` will contain two items!

**Recommended Usage**: Use `Set` when you need to maintain a collection of unique items, quickly check for the existence of an item, or to remove duplicates from an Array (`[...new Set(array)]`).

## Destructuring & Spread Operator
JavaScript has incredibly powerful syntactic sugar for extracting or copying data from Arrays and Objects.
- **Object Destructuring**: `const { name } = obj;`
- **Array Destructuring**: `const [first, second] = arr;`
- **Spread Operator (`...`)**: `const newObj = { ...obj, newProp: true };` or `const newArr = [...arr, 4];`

[View Examples](../examples/1_data_structures/index.js)