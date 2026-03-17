# Promises and Asynchronous Programming in JavaScript

JavaScript is single-threaded and uses a non-blocking, event-driven I/O model. This means that instead of pausing the thread to wait for a database query or an HTTP request to finish, it hands the task off and continues executing the rest of the code.

Historically, this was handled with **callbacks**. Callbacks led to deeply nested code known as "Callback Hell". **Promises** were introduced to solve this.

## 1. What is a Promise?

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It is essentially a proxy for a value not necessarily known when the promise is created.

A Promise is always in one of three states:
1. **Pending**: Initial state, neither fulfilled nor rejected.
2. **Fulfilled**: Meaning the operation completed successfully.
3. **Rejected**: Meaning the operation failed.

Once a promise is fulfilled or rejected, it is considered **settled**. It cannot change state again.

## 2. Consuming Promises with `.then()`, `.catch()`, and `.finally()`

You can interact with a Promise using these chainable methods:
- `.then(value => { ... })`: Called when the promise is fulfilled. It receives the resolved value. It returns a new promise, allowing chaining.
- `.catch(error => { ... })`: Called when the promise is rejected (or if an error was thrown in a previous `.then`).
- `.finally(() => { ... })`: Called when the promise is settled (either fulfilled or rejected). Great for cleanup logic (like hiding a loading spinner or closing a DB connection).

## 3. Creating a Promise

You rarely create Promises from scratch unless you are wrapping a legacy callback API. You use the `new Promise` constructor, passing an executor function that receives `resolve` and `reject` functions.

```javascript
const myPromise = new Promise((resolve, reject) => {
    // Do some async task
    let success = true;
    if (success) resolve("Task completed!");
    else reject(new Error("Task failed"));
});
```

## 4. `async` / `await` (The Modern Approach)

`async` and `await` are syntactic sugar over Promises, making asynchronous code look and behave like synchronous code.

- **`async` function**: Adding `async` before a function means the function always returns a Promise. If you return a value, JS automatically wraps it in a resolved Promise.
- **`await` operator**: Used inside `async` functions to pause the execution of the function until a Promise is settled.

### Error Handling with `async`/`await`
Instead of `.catch()`, you use standard `try...catch` blocks!

```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data", error);
    }
}
```

## 5. Advanced Promise Operations

When you have multiple async operations, you don't always want to wait for them sequentially. JS provides built-in methods for concurrent promises:

- **`Promise.all([p1, p2])`**: Waits for ALL promises to fulfill. If ANY promise rejects, the entire `Promise.all` rejects immediately. Good for when you need all data to proceed.
- **`Promise.allSettled([p1, p2])`**: Waits for all promises to settle (fulfill or reject). Returns an array of objects describing the outcome of each promise. Good for independent tasks.
- **`Promise.race([p1, p2])`**: Returns the result of the FIRST promise to settle (either fulfill or reject). Good for timeouts.
- **`Promise.any([p1, p2])`**: Returns the FIRST promise to fulfill. Rejects only if ALL promises reject.

## 6. Where are Promises Used?

In modern Node.js, practically every I/O operation returns a Promise:
- **Databases**: Mongoose (MongoDB), TypeORM, Prisma, Sequelize (SQL).
- **HTTP Requests**: `fetch`, Axios.
- **File System**: `fs/promises` in Node.js.

[View Examples](../examples/4_promises/index.js)
