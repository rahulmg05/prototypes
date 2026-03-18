# Modules & Imports Deep Dive

In Java, every file is a Class, and you `import com.example.MyClass`. In JavaScript, a file is simply a Module. A Module can export one thing, many things, or nothing at all.

Historically, Node.js used **CommonJS** (`require()` and `module.exports`). However, the standard is moving toward **ES Modules (ESM)** (`import` and `export`). To use ES Modules, you must either set `"type": "module"` in your `package.json`, or use the `.mjs` file extension.

## The Mechanics of ES Modules

ES Modules rely on an object-like structure under the hood. When a module exports things, it essentially creates a dictionary (an object) of exports.

There are two primary ways to add items to this dictionary: **Named Exports** and **Default Exports**.

### 1. Named Exports (Many per file)

When you use the `export` keyword before a variable or function, you are creating a "Named Export". You can have as many of these as you want in a single file.

```javascript
// file: mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

When importing these, you must use **Destructuring Syntax** (the curly braces `{}`). Because they are named exports, **you must use their exact original names**.

```javascript
// file: app.js
import { add, subtract } from './mathUtils.js';
```

**Can I change the name of a Named Export?**
Yes. If the name conflicts with an existing variable in your file, you can use the `as` keyword to alias it:

```javascript
import { add as mathAdd, subtract as mathSubtract } from './mathUtils.js';
console.log(mathAdd(5, 2)); // 7
```

### 2. Default Exports (One per file)

A module can have exactly *one* `default` export.

```javascript
// file: logger.js
export default class Logger { ... }
```

**Why only one? And why can I import it with any name?**

Under the hood, a `default` export is actually just a **Named Export that is literally named `default`**.

When you write this:
```javascript
export default class Logger {}
```

The JavaScript engine internally treats it roughly like this:
```javascript
export const default = class Logger {}
```

Because `default` is a specially reserved keyword in ES Modules, the `import` syntax provides syntactic sugar for it. When you import without curly braces, you are implicitly telling JavaScript: *"Grab the export named `default` and assign it to this variable name."*

```javascript
// You don't use curly braces, and you can name the variable anything!
import MyLogger from './logger.js';
import BananaLogger from './logger.js'; // This is exactly the same thing.
```

If you *wanted* to, you could actually import a default export using curly braces by aliasing the reserved `default` word, though nobody does this in practice:
```javascript
import { default as BananaLogger } from './logger.js';
```

### 3. Mixing Default and Named Exports

It is very common for a module to export a primary "Default" entity (like a Class), along with several "Named" utility functions or constants.

```javascript
// file: database.js
export const DB_URL = "localhost:5432";
export const DB_USER = "admin";

export default class DatabaseClient { ... }
```

You can import them all on a single line. The default import comes first (outside braces), followed by a comma, and then the named imports (inside braces).

```javascript
import DatabaseClient, { DB_URL, DB_USER } from './database.js';
```

### 4. The Namespace Import

Sometimes a file has 50 named exports, and you don't want to list them all in curly braces. You can import the *entire* module object into a single namespace variable using `* as Name`.

```javascript
import * as db from './database.js';

console.log(db.DB_URL);
const client = new db.default(); // Notice how the default export is just a property!
```

[View the deep dive module examples](../examples/6_modules_deep_dive/)
