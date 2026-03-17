import chalk from 'chalk';

console.log(chalk.blue.bold("=== Starting Application ==="));

// Simulate loading configuration (Sync)
console.log(chalk.gray("[1] Loading configuration from process.env"));
const config = {
    dbUrl: "mock://database.local:5432",
    port: 3000
};

// Simulate a database connection (Async/Promise)
const connectToDatabase = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(chalk.magenta(`[2] Connected to Database at ${config.dbUrl}`));
            resolve(true);
        }, 1500);
    });
};

// Simulate starting the server (Sync-ish)
const startServer = () => {
    console.log(chalk.cyan(`[3] Server is up and listening on port ${config.port}`));
    console.log(chalk.green("\nApp is ready to receive requests!"));
};


// Initialization Script Pattern
// This is the equivalent to a Java `public static void main` method for starting an app.
const init = async () => {
    try {
        await connectToDatabase(); // Wait for DB to connect BEFORE accepting traffic
        startServer();             // Start web server AFTER DB is ready
    } catch (error) {
        console.error(chalk.red("Failed to initialize application:"), error);
        process.exit(1); // Exit the process with failure code
    }
};

// Start the init sequence
init();
