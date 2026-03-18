# Node.js Framework, Modules & APIs

Coming from a Java background (Spring Boot, etc.), Node.js takes a much more lightweight, unopinionated approach. Node.js is simply a runtime that lets you execute JavaScript outside the browser. Frameworks like Express, NestJS, or Koa provide the HTTP abstractions you need.

## 1. Modules and the Import/Export Syntax

In Java, every file is a Class, and you `import com.example.MyClass`. In JavaScript, a file is simply a Module. A Module can export one thing, many things, or nothing at all.

Historically, Node.js used **CommonJS** (`require()` and `module.exports`). However, the standard is moving toward **ES Modules** (`import` and `export`). To use ES Modules, you must either set `"type": "module"` in your `package.json`, or use the `.mjs` file extension.

### Default vs Named Exports

This is the most confusing part for developers new to modern JS. There are two ways to export code from a file: **Default** and **Named**.

**1. Default Exports (One per file)**
A file can have exactly one `default` export. This is similar to exporting the main Java Class of a file. When you import a default export, **you can name it whatever you want**.

```javascript
// file: myService.js
class MyService { ... }
export default MyService; // The single default export

// file: app.js
// You don't use curly braces, and you can name the variable anything!
import MyService from './myService.js';
import TheService from './myService.js'; // This is exactly the same thing
```

**2. Named Exports (Many per file)**
A file can have infinite named exports. When you import them, **you must use the exact name inside curly braces `{}`** (this is called Destructuring).

```javascript
// file: mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// file: app.js
// You MUST use the exact names 'add' and 'subtract' inside {}.
import { add, subtract } from './mathUtils.js';

// If you want to rename it locally, use the 'as' keyword:
import { add as addition } from './mathUtils.js';

// Or import EVERYTHING as a single object:
import * as MathOps from './mathUtils.js';
console.log(MathOps.add(1, 2));
```

**3. Mixing them together**
You often see both used at the same time. The default import comes first, followed by the named imports in braces.

```javascript
import React, { useState, useEffect } from 'react';
// React is the default export.
// useState and useEffect are named exports.
```

## 2. Project Structure

Node.js does not enforce a strict project structure like Maven or Gradle. A typical robust application might look like this:

```
├── package.json           // Project metadata and dependencies
├── src/
│   ├── index.js           // Entry point
│   ├── routes/            // API Route definitions
│   ├── controllers/       // Request handlers
│   ├── services/          // Business logic
│   └── models/            // Data models / DB Schemas
└── tests/
```

## 3. Building an API

To build an API, the most common framework is **Express.js**. It is very unopinionated and minimal. For a more Spring-like experience, teams often use **NestJS**.

In Express, you define routes and handlers (middleware). A handler takes `req` (request) and `res` (response) objects.

## 4. Initialization Scripts

Node.js applications start from a single entry file (e.g., `index.js`). Any setup code (database connections, reading config files) is usually placed at the top of this file, executed synchronously before calling the function that starts listening for HTTP requests.

We define scripts in `package.json`:
```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js" // nodemon watches for file changes
}
```

[View Examples](../examples/3_nodejs_framework/)