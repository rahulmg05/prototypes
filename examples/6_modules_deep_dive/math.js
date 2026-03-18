/**
 * This file demonstrates all the different ways you can export code from a module.
 */

// 1. Multiple Named Exports
export const PI = 3.14159;
export const E = 2.71828;

// You can export functions directly
export function add(a, b) {
    return a + b;
}

// Or assign them to variables and export them
const multiply = (a, b) => a * b;
export { multiply }; // Exporting an existing variable by name

// 2. The ONE Default Export
// A file can only have one `export default`. This is usually the main entity of the file (like a Class or the primary function).
export default class Calculator {
    constructor(name) {
        this.name = name;
    }

    identify() {
        return `I am the ${this.name} calculator!`;
    }
}
