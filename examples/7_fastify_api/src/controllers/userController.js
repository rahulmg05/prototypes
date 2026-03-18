import { getAllUsers, createUser } from '../services/userService.js';

export const getUsersHandler = async (request, reply) => {
  // Await the async service layer (e.g., a DB call)
  const users = await getAllUsers();

  // Fastify will automatically 200 OK this and convert it to JSON
  return users;
};

export const createUserHandler = async (request, reply) => {
  // Because of our JSON Schema Validation on the route,
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
