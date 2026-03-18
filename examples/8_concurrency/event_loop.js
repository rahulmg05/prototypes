/**
 * This script perfectly demonstrates the priority queues of the Node.js Event Loop.
 *
 * Order of execution:
 * 1. Synchronous Code
 * 2. process.nextTick()
 * 3. Promises (Microtasks)
 * 4. setTimeout() (Timers Phase of Event Loop)
 * 5. setImmediate() (Check Phase of Event Loop)
 * 6. File System I/O (Poll Phase of Event Loop)
 */

import fs from 'fs';

console.log("=== Node.js Event Loop Execution Order ===\n");

// 1. Synchronous code executes immediately
console.log("1. Synchronous log: Starting the script");


// 4. Timers Phase
// This callback is pushed to the Timers queue and will execute after all Microtasks finish.
setTimeout(() => {
    console.log("4. setTimeout: Entering the Timers Phase");

    // We can queue a nextTick *inside* a timer. It will execute immediately after this timer finishes,
    // before the Event Loop moves to the next phase!
    process.nextTick(() => {
        console.log("4a. nextTick inside setTimeout: Executed before leaving the Timers Phase");
    });
}, 0);


// 5. Check Phase
// setImmediate is special: it schedules a callback for the Check Phase of the event loop.
// Even with 0 delay on setTimeout, setImmediate is often slightly slower to queue,
// so setTimeout(0) usually beats it on the very first tick.
setImmediate(() => {
    console.log("5. setImmediate: Entering the Check Phase");
});


// 6. Poll Phase (I/O)
// The FS operation is offloaded to the OS thread pool (libuv).
// Once finished, its callback goes into the Pending Callbacks/Poll Phase queue.
fs.readFile(import.meta.filename, () => {
    console.log("6. fs.readFile: Entering the Poll Phase (I/O finished)");

    // Inside an I/O callback, setImmediate ALWAYS beats setTimeout!
    // Why? Because the Poll Phase is immediately followed by the Check phase.
    setTimeout(() => {
        console.log("6a. setTimeout inside I/O: This goes to the NEXT loop's Timer Phase");
    }, 0);

    setImmediate(() => {
        console.log("6b. setImmediate inside I/O: This executes immediately in the Check Phase");
    });
});


// 3. Promise Microtask Queue
// Promises are Microtasks. They have higher priority than the Event Loop phases.
// They execute right after the current synchronous script finishes (and after nextTick).
Promise.resolve().then(() => {
    console.log("3. Promise: Executing from the Microtask Queue");
});


// 2. process.nextTick Queue (VIP)
// nextTick is NOT part of the event loop. It is a special Node.js feature.
// It executes IMMEDIATELY after the current operation, before Promises and before the Event Loop begins.
process.nextTick(() => {
    console.log("2. process.nextTick: Executing immediately after sync code finishes");
});


console.log("1a. Synchronous log: Ending the script\n");
