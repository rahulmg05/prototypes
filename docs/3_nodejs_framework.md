# Node.js Framework, Modules & APIs

Coming from a Java background (Spring Boot, etc.), Node.js takes a much more lightweight, unopinionated approach. Node.js is simply a runtime that lets you execute JavaScript outside the browser. Frameworks like Express, NestJS, or Koa provide the HTTP abstractions you need.

## 1. Modules (CommonJS vs ES Modules)

Node.js historically used **CommonJS** (`require()` and `module.exports`). However, the standard is moving toward **ES Modules** (`import` and `export`), which align with how JavaScript works in the browser.

### CommonJS (Legacy but still widely used)
```javascript
// exporting
module.exports = { myFunction };

// importing
const { myFunction } = require('./myModule');
```

### ES Modules (Modern Standard)
To use ES Modules, you must either set `"type": "module"` in your `package.json`, or use the `.mjs` file extension.

```javascript
// exporting
export const myFunction = () => {};
export default class MyClass {}

// importing
import MyClass, { myFunction } from './myModule.js';
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
