import Boom from '@hapi/boom';
import { getAllUsers, getUserById, createUser } from '../services/userService.js';

export const getUsersHandler = async (request, reply) => {
  // Await the async service layer (e.g., a DB call)
  const users = await getAllUsers();

  // Fastify will automatically 200 OK this and convert it to JSON
  return users;
};

export const getUserByIdHandler = async (request, reply) => {
  // We can safely access `request.params.id` here
  const { id } = request.params;
  const user = await getUserById(id);

  if (!user) {
    // We throw a Boom error! The global `setErrorHandler` intercepts this, extracts
    // the payload and status code (404), and returns it gracefully to the client.
    throw Boom.notFound(`User with ID ${id} could not be found.`);
  }

  // Fastify will automatically serialize this using the `response` schema defined in the route!
  return user;
};

export const createUserHandler = async (request, reply) => {
  // Because of our JSON Schema Validation on the route (body schema),
  // we KNOW request.body contains a valid string 'name' and number 'age' >= 18.
  // There is NO NEED to manually check `if (!request.body.name)`!
  const newUser = await createUser(request.body);

  // Customizing the response
  reply.code(201);
  return {
    success: true,
    message: "User created successfully!",
    user: newUser
  };
};
