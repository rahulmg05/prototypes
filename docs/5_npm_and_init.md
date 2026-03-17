# NPM and Project Initialization

NPM stands for Node Package Manager. It is both an online repository for the publishing of open-source Node.js projects, and a command-line utility for interacting with that repository that aids in package installation, version management, and dependency management.

## 1. Initializing a Project

To start a new Node.js project, you use the `npm init` command inside a new folder.

```bash
mkdir my-new-project
cd my-new-project
npm init -y
```

The `-y` flag answers "yes" to all the default questions. This generates a `package.json` file.

## 2. The `package.json` File

This file is the heart of any Node project (similar to `pom.xml` in Maven or `build.gradle` in Gradle). It holds metadata relevant to the project, handles the project's dependencies, and defines npm scripts.

### Dependencies vs devDependencies
- **Dependencies** (`npm install <package>`): Libraries required for the application to run in production (e.g., Express, Mongoose).
- **devDependencies** (`npm install <package> --save-dev` or `-D`): Libraries only needed during local development or testing (e.g., Jest, Nodemon, TypeScript).

## 3. NPM Scripts

You can define custom command line scripts in your `package.json`. This is how you orchestrate running your application, running tests, or building assets.

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest",
  "build": "tsc"
}
```

To run a script, use `npm run <script-name>`. For the `start` and `test` scripts, you can omit the `run` keyword: `npm start`.

## 4. Initialization Files

In Node.js, there isn't a strict "main method" like `public static void main(String[] args)` in Java.

Instead, you specify an entry point in your `package.json` (often `"main": "index.js"`). When you run `node index.js`, Node executes the file top-to-bottom.

### Common Setup Pattern
A typical entry file does the following in order:
1. Load environment variables (e.g., `dotenv`).
2. Establish database connections.
3. Configure the web server / middleware (Express).
4. Start listening on a port.

Because database connections are asynchronous, you often see the server start wrapped in an async function or a Promise `.then()` block to ensure the DB connects *before* the server accepts requests.

[View Examples](../examples/5_npm_and_init/)
