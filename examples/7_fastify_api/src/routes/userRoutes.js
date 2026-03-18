import { getUsersHandler, createUserHandler } from '../controllers/userController.js';

// DTO-like JSON Schema Definition
// This tells Fastify exactly what the body of a POST request MUST look like.
const CreateUserSchema = {
  body: {
    type: 'object',
    required: ['name', 'age'],
    properties: {
      name: { type: 'string', minLength: 2 },
      age: { type: 'number', minimum: 18 }
    }
  }
};

/**
 * A Fastify Plugin that encapsulates our user routes.
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
export default async function userRoutes(fastify, options) {

  // GET /api/users
  fastify.get('/', getUsersHandler);

  // POST /api/users
  // We pass the schema inline. Fastify's Ajv library will intercept any invalid
  // request and return a 400 Bad Request BEFORE `createUserHandler` is ever called!
  fastify.post('/', { schema: CreateUserSchema }, createUserHandler);

}
