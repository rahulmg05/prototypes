import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

/**
 * Node.js is Single-Threaded for I/O but can spawn Worker Threads for heavy CPU computation.
 * This is similar to creating a new Thread in Java.
 */

// A simple but expensive CPU task (calculating prime numbers)
const calculatePrimes = (max) => {
    let primes = [];
    for (let i = 2; i <= max; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
    }
    return primes;
};

if (isMainThread) {
    // --- MAIN THREAD ---
    console.log("=== Node.js Worker Threads Example ===\n");
    console.log("[Main Thread] Starting...");

    // Spawn a new worker thread. We pass the current file path so it executes the code below.
    const worker = new Worker(import.meta.filename, {
        workerData: { maxPrime: 5_000_000 } // Pass data to the worker
    });

    // Listen for messages FROM the worker
    worker.on('message', (msg) => {
        console.log(`\n[Main Thread] Received from Worker: Found ${msg.primesCount} primes.`);
        console.log(`[Main Thread] Worker took ${msg.timeMs}ms.`);
    });

    worker.on('error', (err) => {
        console.error(`[Main Thread] Worker encountered an error:`, err);
    });

    worker.on('exit', (code) => {
        console.log(`[Main Thread] Worker finished with exit code ${code}.`);
    });

    // To prove the Main Thread is NOT blocked while the worker calculates primes,
    // we'll run a simple setInterval to act as a heartbeat.
    let count = 0;
    const interval = setInterval(() => {
        console.log(`[Main Thread Heartbeat] Still responsive! tick ${++count}`);
        if (count >= 5) clearInterval(interval);
    }, 500);

} else {
    // --- WORKER THREAD ---
    // This code block ONLY executes inside the newly spawned V8 engine thread.

    // We can access the data passed from the main thread via `workerData`
    const { maxPrime } = workerData;

    console.log(`[Worker Thread] Started calculating primes up to ${maxPrime}... This is heavy CPU work.`);

    const startTime = Date.now();

    // Execute the heavy task
    const primes = calculatePrimes(maxPrime);

    const timeMs = Date.now() - startTime;

    // Send the result back to the Main Thread via the `parentPort` message channel
    parentPort.postMessage({
        primesCount: primes.length,
        timeMs: timeMs
    });
}
