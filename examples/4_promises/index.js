console.log("=== JavaScript Promises & Async/Await ===\n");

// 1. Creating a Promise from scratch (wrapping a setTimeout callback)
const delayedGreeting = (name, ms, shouldFail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Failed to greet ${name}`));
            } else {
                resolve(`Hello, ${name}!`);
            }
        }, ms);
    });
};

// 2. Consuming Promises with .then, .catch, .finally
console.log("--- 1. Using .then, .catch, .finally ---");
delayedGreeting("Alice", 1000)
    .then(message => {
        console.log("Success:", message);
        // Chaining: returning a value passes it to the next .then
        return delayedGreeting("Bob", 500);
    })
    .then(secondMessage => {
        console.log("Second Success:", secondMessage);
        // Let's force an error
        return delayedGreeting("Charlie", 500, true);
    })
    .catch(error => {
        console.log("Caught Error:", error.message);
    })
    .finally(() => {
        console.log("Finally block executed (cleanup)\n");
    });


// 3. The Modern Approach: async / await
console.log("--- 2. Using async/await ---");
const runAsyncCode = async () => {
    try {
        console.log("Starting async sequence...");

        // Wait for the first greeting
        const greeting1 = await delayedGreeting("Dave", 1000);
        console.log("Async Success 1:", greeting1);

        // Wait for the second greeting
        const greeting2 = await delayedGreeting("Eve", 500);
        console.log("Async Success 2:", greeting2);

        // Force an error to trigger catch block
        await delayedGreeting("Frank", 500, true);

        console.log("This line will never run because of the error above.");
    } catch (error) {
        console.log("Async Caught Error:", error.message);
    } finally {
        console.log("Async Finally block executed\n");
    }
};

runAsyncCode();


// 4. Advanced Promise Combinators (Concurrency)
console.log("--- 3. Promise Combinators ---");
const runCombinators = async () => {
    // 4a. Promise.all: Waits for ALL to succeed. If one fails, the whole thing fails.
    console.log("\nStarting Promise.all (will fail because B fails)...");
    try {
        const resAll = await Promise.all([
            delayedGreeting("A", 500),
            delayedGreeting("B", 1000, true), // This fails
            delayedGreeting("C", 1500)
        ]);
        console.log("Promise.all Success:", resAll);
    } catch (e) {
        console.log("Promise.all Caught Error:", e.message);
    }

    // 4b. Promise.allSettled: Waits for ALL to finish, regardless of success/failure
    console.log("\nStarting Promise.allSettled...");
    const resSettled = await Promise.allSettled([
        delayedGreeting("A", 500),
        delayedGreeting("B", 1000, true) // This fails
    ]);
    console.log("Promise.allSettled Results:");
    resSettled.forEach(res => {
        if (res.status === "fulfilled") console.log("- Fulfilled:", res.value);
        if (res.status === "rejected") console.log("- Rejected:", res.reason.message);
    });

    // 4c. Promise.race: Returns the FIRST promise to finish (success or fail)
    console.log("\nStarting Promise.race...");
    try {
        const resRace = await Promise.race([
            delayedGreeting("Slow Success", 2000),
            delayedGreeting("Fast Fail", 500, true)
        ]);
        console.log("Promise.race Success:", resRace);
    } catch (e) {
        console.log("Promise.race Caught Error:", e.message); // This will hit because the fast one fails
    }
};

setTimeout(() => {
    runCombinators();
}, 3000);
