# Fastify: The Modern Node.js Framework

**Fastify** has emerged as the modern standard for building high-performance APIs in Node.js. If you are coming from Java/Spring Boot, Fastify will feel highly structured, performant, and safe.

## 1. Why Fastify?

1. **Performance**: Fastify is incredibly fast, capable of handling tens of thousands of requests per second out-of-the-box due to its optimized routing and JSON serialization engines.
2. **Schema Validation**: Fastify has built-in JSON Schema validation. This is equivalent to Java's `@Valid` or `@NotNull` annotations on DTOs. If a request payload is invalid, Fastify automatically rejects it before it even hits your controller.
3. **First-Class `async/await`**: Fastify was built for modern JavaScript. You don't need callbacks or wrappers to handle async errors; you just `return` or `throw` inside an `async` function.

## 2. Setting up Fastify

Fastify is extremely easy to initialize. It returns an instance that you can use to register routes, plugins, and start the server.

```javascript
import Fastify from 'fastify';
const fastify = Fastify({ logger: true });

// A simple route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Start the server
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
```

## 3. The Plugin System (Encapsulation)

Fastify's core architectural principle is **Plugins**. Everything in Fastify (routes, database connections, utility functions) is a plugin.

When you register a plugin using `fastify.register()`, you create a new encapsulated context. This means plugins cannot accidentally overwrite or conflict with each other's configurations, keeping your application scope clean.

```javascript
import userRoutes from './routes/users.js';

// The users routes will be prefixed with /api/users
fastify.register(userRoutes, { prefix: '/api/users' });
```

## 4. Built-in Schema Validation

In Java, you create a DTO class to strictly define what an API payload should look like. In Fastify, you define a JSON Schema.

Fastify uses a library called `ajv` under the hood to compile your schema into highly optimized validation functions at startup.

```javascript
// Define a DTO-like schema
const userSchema = {
  body: {
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: { type: 'string' },
      age: { type: 'number', minimum: 18 }
    }
  }
};

// Apply the schema to a route
fastify.post('/users', { schema: userSchema }, async (request, reply) => {
  // If we reach this point, we are GUARANTEED that request.body.name exists and age is >= 18.
  const { name, age } = request.body;

  // Fastify automatically sets Content-Type to application/json and serializes the return value
  return { success: true, user: name };
});
```

If a user sends `{ "name": "Alice" }` without an age, Fastify will automatically intercept the request and return a `400 Bad Request` with a helpful error message explaining that `age` is required.

[View the Fastify API Example](../examples/7_fastify_api/)