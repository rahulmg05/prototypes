import { getUsersHandler, getUserByIdHandler, createUserHandler } from '../controllers/userController.js';

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

// We can also validate URL parameters (e.g. GET /users/1)
// AND we can format the response!
const GetUserByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      // Ensure the ID parameter in the URL is numeric
      id: { type: 'string', pattern: '^[0-9]+$' }
    }
  },
  // We can strictly define what a successful 200 response looks like.
  // Fastify will STRIP any properties from the response object that aren't defined here.
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' }
        // Notice we are NOT returning the "age" property from the database!
        // Fastify's serialization engine automatically removes it for us.
      }
    }
  }
};


/**
 * A Fastify Plugin that encapsulates our user routes.
 *
 * @param {import('fastify').FastifyInstance} fastify
 */
export default async function userRoutes(fastify, options) {

  // Shorthand Declaration (GET /api/users)
  fastify.get('/', getUsersHandler);


  // Full Route Declaration (GET /api/users/:id)
  // This is the preferred way for complex endpoints. It keeps HTTP Method, Route Path,
  // Validation Schemas, and the Handler in one clean object block.
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: GetUserByIdSchema,
    handler: getUserByIdHandler
  });


  // Shorthand Declaration with inline schema (POST /api/users)
  // Fastify's Ajv library will intercept any invalid request body
  // and return a 400 Bad Request BEFORE `createUserHandler` is ever called!
  fastify.post('/', { schema: CreateUserSchema }, createUserHandler);

}
