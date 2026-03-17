console.log("=== JavaScript Promises & Async/Await ===\n");

// --- Setup Mock Data and Functions ---

// 1. A traditional callback-based function (Legacy)
const getUserLegacy = (id, successCallback, errorCallback) => {
    setTimeout(() => {
        if (id === 1) successCallback({ id: 1, name: "Alice" });
        else errorCallback("User not found");
    }, 500);
};

const getPostsLegacy = (userId, successCallback, errorCallback) => {
    setTimeout(() => {
        if (userId === 1) successCallback([{ id: 101, title: "Post 1" }]);
        else errorCallback("No posts found");
    }, 500);
};

// 2. A modern Promise-based function
// This function returns a new Promise. The executor function receives resolve/reject arguments.
const getUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) resolve({ id: 1, name: "Alice" });
            else reject(new Error("User not found"));
        }, 500);
    });
};

const getPosts = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId === 1) resolve([{ id: 101, title: "Post 1" }]);
            else reject(new Error("No posts found"));
        }, 500);
    });
};

// --- Execution ---

console.log("--- Stage 1: The Pyramid of Doom (Callback Hell) ---");
// Notice how the code shifts to the right, creating a triangle shape.
// Error handling has to be duplicated at every level.
getUserLegacy(1,
    (user) => {
        console.log("Legacy Success: Fetched User:", user.name);
        getPostsLegacy(user.id,
            (posts) => {
                console.log("Legacy Success: Fetched Posts:", posts.length);
                // Imagine doing this for 5 more nested calls...
            },
            (err) => console.error("Legacy Post Error:", err)
        );
    },
    (err) => console.error("Legacy User Error:", err)
);

// We delay execution of the next stages so the console output isn't jumbled
setTimeout(() => {
    console.log("\n--- Stage 2: Promise Chaining (Solving Callback Hell) ---");
    // .then() always returns a new Promise, allowing us to chain them vertically.
    // A single .catch() block at the end will catch errors from ANY step in the chain.
    getUser(1)
        .then(user => {
            console.log("Promise Success: Fetched User:", user.name);
            // We RETURN the next promise so the next .then() can consume it
            return getPosts(user.id);
        })
        .then(posts => {
            console.log("Promise Success: Fetched Posts:", posts.length);
        })
        .catch(error => {
            console.error("Promise Error Caught:", error.message);
        })
        .finally(() => {
            console.log("Promise Chain Finished.");
        });

}, 1500);


setTimeout(() => {
    console.log("\n--- Stage 3: The Modern Approach (async / await) ---");
    // async/await flattens the structure entirely. It pauses the function execution
    // until the awaited Promise settles, looking exactly like synchronous code.
    const runAsyncCode = async () => {
        try {
            // Wait for the user
            const user = await getUser(1);
            console.log("Async Success: Fetched User:", user.name);

            // Wait for the posts
            const posts = await getPosts(user.id);
            console.log("Async Success: Fetched Posts:", posts.length);

            // Force an error to show the catch block works globally
            console.log("Attempting to fetch a missing user...");
            await getUser(99);

            console.log("This line will never run because of the error above.");
        } catch (error) {
            console.error("Async Caught Error:", error.message);
        } finally {
            console.log("Async Finally block executed\n");
        }
    };

    runAsyncCode();

}, 3000);


setTimeout(() => {
    console.log("\n--- Stage 4: Advanced Promise Combinators (Concurrency) ---");
    const runCombinators = async () => {
        // 4a. Promise.all: Waits for ALL to succeed. If one fails, the whole thing fails immediately.
        console.log("Starting Promise.all (will fail because one user is missing)...");
        try {
            const resAll = await Promise.all([
                getUser(1),
                getUser(99), // This fails
                getUser(1)
            ]);
            console.log("Promise.all Success:", resAll);
        } catch (e) {
            console.error("Promise.all Caught Error:", e.message);
        }

        // 4b. Promise.allSettled: Waits for ALL to finish, regardless of success/failure
        console.log("\nStarting Promise.allSettled...");
        const resSettled = await Promise.allSettled([
            getUser(1),
            getUser(99) // This fails
        ]);
        console.log("Promise.allSettled Results:");
        resSettled.forEach(res => {
            if (res.status === "fulfilled") console.log("- Fulfilled:", res.value.name);
            if (res.status === "rejected") console.log("- Rejected:", res.reason.message);
        });

        // 4c. Promise.race: Returns the FIRST promise to finish (success or fail)
        // Useful for setting a timeout on a request!
        console.log("\nStarting Promise.race...");
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out!")), 100));

        try {
            // Race between fetching a user (takes 500ms) and the timeout (takes 100ms)
            const resRace = await Promise.race([
                getUser(1),
                timeoutPromise
            ]);
            console.log("Promise.race Success:", resRace);
        } catch (e) {
            console.error("Promise.race Caught Error:", e.message); // This will hit because the timeout is faster
        }
    };

    runCombinators();
}, 5000);
