# Exception Handling in Node.js

In Java, exception handling is a heavily formalized contract. You have Checked Exceptions (`IOException`, `SQLException`) that force you to write a `try/catch` block or declare a `throws` clause on your method signature.

**JavaScript does not have Checked Exceptions.** All exceptions in JavaScript are Unchecked. A function can throw an error at any time, and the compiler will not warn you if you forget to handle it.

## 1. The `Error` Object

In JavaScript, you throw exceptions using the `throw` keyword, usually passing an instance of the built-in `Error` object.

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}
```

*Gotcha*: You can technically `throw "a string"` or `throw 404`, but this is universally considered bad practice because you lose the stack trace. Always throw an `Error` object.

## 2. Synchronous Error Handling (`try...catch...finally`)

For synchronous code, JavaScript uses the exact same `try...catch...finally` block syntax as Java.

```javascript
try {
  const result = divide(10, 0);
  console.log(result);
} catch (error) {
  // error is the Error object we threw
  console.error("Caught an exception:", error.message);
  console.error(error.stack); // Prints the stack trace
} finally {
  console.log("This always runs, regardless of success or failure.");
}
```

## 3. Asynchronous Error Handling

Because Node.js is heavily asynchronous, error handling gets slightly more complex. An error thrown inside an asynchronous callback (like `setTimeout`) *cannot* be caught by a `try...catch` block that surrounds the function call, because the `try...catch` block finishes executing long before the callback runs!

### The Modern Way: `async` / `await`
Thanks to modern JavaScript, `async/await` allows us to use standard `try...catch` blocks for asynchronous code, making it look synchronous again!

```javascript
async function fetchUser(id) {
  try {
    // We await the Promise. If the Promise rejects, it throws the rejection reason as an exception!
    const user = await database.query('SELECT * FROM users WHERE id = ?', [id]);
    return user;
  } catch (error) {
    console.error("Database query failed:", error.message);
    // We can re-throw the error to be handled by the caller
    throw new Error(`Failed to fetch user ${id}`, { cause: error });
  }
}
```

### The Legacy Way: Promise `.catch()`
If you are interacting with Promises directly without `await`, you must chain a `.catch()` method to handle rejections.

```javascript
database.query('SELECT * FROM users')
  .then(users => console.log(users))
  .catch(error => console.error("Query failed:", error));
```

## 4. Custom Error Classes

In enterprise applications, you often want specific error types (e.g., `ValidationError`, `DatabaseError`, `NotFoundError`) so you can perform specific logic in your `catch` blocks (like returning different HTTP status codes).

You can achieve this by extending the native `Error` class, exactly like extending `RuntimeException` in Java.

```javascript
class DatabaseError extends Error {
  constructor(message, query) {
    super(message); // Call the parent constructor
    this.name = this.constructor.name; // Set the name to 'DatabaseError'
    this.query = query; // Add custom properties

    // Captures the current stack trace (V8 engine specific, but standard in Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}

try {
  throw new DatabaseError("Connection timed out", "SELECT * FROM users");
} catch (error) {
  if (error instanceof DatabaseError) {
    console.log(`DB Error on query: ${error.query}`);
  }
}
```

## 5. Global Process Handlers (The Last Resort)

If an error is thrown and *never* caught by a `try...catch` block or a `.catch()` chain, it propagates all the way up to the Node.js process level.

By default, an unhandled exception will immediately crash your Node.js application.

You can intercept these global crashes to perform emergency logging or cleanup before shutting down. **Do not use these to silently ignore errors and keep the server running.** If an unhandled exception occurs, your application is in an unpredictable state (e.g., memory leaks, deadlocks), and it *must* be restarted.

```javascript
// Catches synchronous errors that bubbled to the top
process.on('uncaughtException', (error) => {
  console.error("FATAL: Uncaught Exception!", error);
  // Perform synchronous cleanup (e.g. closing file descriptors)
  process.exit(1);
});

// Catches Promises that rejected but didn't have a .catch() handler
process.on('unhandledRejection', (reason, promise) => {
  console.error("FATAL: Unhandled Promise Rejection!", reason);
  process.exit(1);
});
```

[View the Exception Handling Examples](../examples/9_exception_handling/)