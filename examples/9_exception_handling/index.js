// --- Exception Handling in Node.js ---

// We register these globally at the very top of our application entry point to catch catastrophic failures
process.on('uncaughtException', (error) => {
    console.error(`\n[FATAL] Uncaught Exception intercepted globally: ${error.message}`);
    console.log("If this were a real app, we would perform cleanup and call `process.exit(1)` here to restart safely.\n");
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`\n[FATAL] Unhandled Promise Rejection intercepted globally: ${reason}`);
    console.log("If this were a real app, we would perform cleanup and call `process.exit(1)` here to restart safely.\n");
});

console.log("=== Node.js Exception Handling ===\n");

// 1. Custom Error Classes
// Extending the native Error class allows us to create specific exception types
class ValidationError extends Error {
    constructor(message, field) {
        super(message); // Call the parent Error constructor
        this.name = this.constructor.name; // Set the error name to 'ValidationError' instead of 'Error'
        this.field = field; // Custom property
        Error.captureStackTrace(this, this.constructor); // Capture the stack trace properly
    }
}

class DatabaseError extends Error {
    constructor(message, query) {
        super(message);
        this.name = this.constructor.name;
        this.query = query;
        Error.captureStackTrace(this, this.constructor);
    }
}


// 2. Synchronous Error Handling
console.log("--- 1. Synchronous Error Handling ---");
function validateUser(user) {
    if (!user.name) {
        // We throw our custom ValidationError object
        throw new ValidationError("User must have a name", "name");
    }
    return true;
}

try {
    console.log("Validating { age: 30 }...");
    validateUser({ age: 30 }); // Missing 'name'
} catch (error) {
    // We can use `instanceof` to determine exactly what kind of error was thrown
    if (error instanceof ValidationError) {
        console.log(`[Caught ValidationError] Field '${error.field}' failed validation: ${error.message}`);
    } else {
        console.log(`[Caught Unknown Error] ${error.message}`);
    }
} finally {
    console.log("[Finally] Synchronous validation block complete.");
}


// 3. Asynchronous Error Handling (Modern: async/await)
console.log("\n--- 2. Asynchronous Error Handling (async/await) ---");
const asyncDatabaseQuery = async (query) => {
    // Simulate a database query that takes 500ms and then fails
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new DatabaseError("Connection timed out", query));
        }, 500);
    });
};

const fetchUserAsync = async () => {
    try {
        console.log("Executing async database query...");
        // By awaiting the promise, any rejection is automatically thrown as an exception!
        // We can catch it with a standard try/catch block just like synchronous code.
        const result = await asyncDatabaseQuery("SELECT * FROM users");
        console.log(result);
    } catch (error) {
        if (error instanceof DatabaseError) {
            console.log(`[Caught DatabaseError] Query '${error.query}' failed: ${error.message}`);
        } else {
            console.log(`[Caught Async Error] ${error.message}`);
        }
    } finally {
        console.log("[Finally] Async block complete.");
    }
};

// We kick off the async function
fetchUserAsync();


// 4. Triggering Global Process Handlers
// We wait 1 second for the previous async example to finish before triggering these fatal errors
setTimeout(() => {
    console.log("\n--- 3. Triggering Global Handlers (Catastrophic Failures) ---");

    // Throwing a synchronous error OUTSIDE of a try/catch block
    console.log("Throwing a naked synchronous error...");
    setTimeout(() => {
        throw new Error("I am a naked, unhandled exception! I will crash the process!");
    }, 100);

    // Creating a Promise that rejects, but we FORGET to attach a .catch() or await it!
    console.log("Creating an unhandled Promise rejection...");
    setTimeout(() => {
        Promise.reject("I am a rejected Promise that nobody caught! I will crash the process!");
    }, 200);

}, 1000);
