# JavaScript Data Structures

Coming from Java, you might be used to `ArrayList`, `HashMap`, `HashSet`, etc. Modern JavaScript (ES6+) provides powerful built-in data structures that handle these use cases seamlessly.

## 1. Arrays (like `ArrayList`)
Arrays in JS are dynamic. They can hold mixed types, but typically you'll store objects of the same shape.

- **Initialization**: `const arr = [1, 2, 3];`
- **Push / Pop**: Add/remove from the end (`arr.push(4)`, `arr.pop()`).
- **Shift / Unshift**: Add/remove from the beginning (`arr.unshift(0)`, `arr.shift()`).
- **Higher-Order Functions**: JS arrays heavily utilize functional methods like `.map()`, `.filter()`, `.reduce()`, and `.forEach()`.

## 2. Objects (like lightweight Dictionaries / POJOs)
Plain old JavaScript objects (POJOs) are the most common way to store key-value pairs where keys are **strings or symbols**.

- **Initialization**: `const obj = { name: 'Alice', age: 30 };`
- **Access**: `obj.name` or `obj['name']`.
- **Iteration**: `Object.keys(obj)`, `Object.values(obj)`, `Object.entries(obj)`.

*Note: While objects are often used as maps, they have a prototype chain which can cause unexpected key collisions. For strict key-value storage, `Map` is preferred.*

## 3. Map (like `HashMap`)
`Map` allows any data type (including objects) to be used as a key. It also maintains insertion order.

- **Initialization**: `const map = new Map();`
- **Set/Get**: `map.set('key', 'value')`, `map.get('key')`.
- **Check/Delete**: `map.has('key')`, `map.delete('key')`.
- **Size**: `map.size`.

## 4. Set (like `HashSet`)
`Set` stores unique values of any type.

- **Initialization**: `const set = new Set([1, 2, 2, 3]);` (Results in `{1, 2, 3}`).
- **Add/Delete**: `set.add(4)`, `set.delete(1)`.
- **Check**: `set.has(2)`.
- **Size**: `set.size`.

## Destructuring & Spread Operator
JavaScript has incredibly powerful syntactic sugar for extracting or copying data from Arrays and Objects.
- **Object Destructuring**: `const { name } = obj;`
- **Array Destructuring**: `const [first, second] = arr;`
- **Spread Operator (`...`)**: `const newObj = { ...obj, newProp: true };` or `const newArr = [...arr, 4];`

Check out the code examples to see these structures and operations in action!
[View Examples](../examples/1_data_structures/index.js)
