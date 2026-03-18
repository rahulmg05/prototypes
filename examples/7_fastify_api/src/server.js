import Fastify from 'fastify';
import userRoutes from './routes/userRoutes.js';

// Initialize Fastify with logging enabled
const fastify = Fastify({
  logger: true
});

// A simple health check route
fastify.get('/api/health', async (request, reply) => {
  // Fastify automatically sends this as JSON with a 200 status code
  return { status: 'UP' };
});

// Register the user routes plugin
// We prefix all routes inside this plugin with /api/users
fastify.register(userRoutes, { prefix: '/api/users' });

// Start the server (using modern async/await initialization pattern)
const startServer = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('\n--- Fastify is Running! ---');
    console.log('Try querying:');
    console.log('curl http://localhost:3000/api/users');
    console.log('curl -X POST -H "Content-Type: application/json" -d \'{"name": "Charlie"}\' http://localhost:3000/api/users   <-- THIS WILL FAIL VALIDATION');
    console.log('curl -X POST -H "Content-Type: application/json" -d \'{"name": "Charlie", "age": 25}\' http://localhost:3000/api/users   <-- THIS WILL SUCCEED');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
