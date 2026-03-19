import Boom from '@hapi/boom';
import { request as undiciRequest } from 'undici';

// Example of querying the Cassandra Database plugin attached to the Fastify instance
export const getUserFromCassandraHandler = async (request, reply) => {
  const { id } = request.params;

  // Parameterized query to prevent CQL Injection!
  const query = 'SELECT user_id, name, email FROM users WHERE user_id = ?';
  const params = [ id ];

  try {
    // We execute the query using the `fastify.cassandra` client injected by our plugin
    // This will fail because we don't have a live cluster running,
    // which perfectly demonstrates our global Boom error handler catching the NoHostAvailableError!
    const result = await request.server.cassandra.execute(query, params, { prepare: true });

    if (result.rowLength === 0) {
      throw Boom.notFound(`User ${id} does not exist in the database.`);
    }

    const userRow = result.first();
    return {
      id: userRow.user_id,
      name: userRow.name,
      email: userRow.email
    };

  } catch (error) {
    if (error.isBoom) throw error; // Rethrow 404s

    // Check if the Cassandra driver threw an error because the cluster is down
    // Since we don't have a cluster running, it will throw a NoHostAvailableError
    request.log.error(error); // Log the stack internally

    // Check specifically for Cassandra driver errors
    if (error.name === 'NoHostAvailableError') {
       throw Boom.serverUnavailable('The database cluster is currently unreachable');
    }

    if (error.name === 'ResponseError') {
       throw Boom.badGateway('Database operation failed upstream');
    }

    // Generic fallback for any other unexpected exception (like NullPointers)
    throw Boom.internal('An unexpected database error occurred');
  }
};


// Example of fetching from an upstream API and handling errors gracefully
export const fetchUpstreamAPIHandler = async (request, reply) => {
  const { targetUrl } = request.body;

  try {
    // Attempt to make a network call using undici
    // If the URL is bad (like http://localhost:9999), this will throw a System Error (ECONNREFUSED)
    const { statusCode, body } = await undiciRequest(targetUrl);

    if (statusCode === 404) {
       // Upstream service couldn't find the requested resource
       throw Boom.notFound(`Upstream service returned a 404 at ${targetUrl}`);
    }

    if (statusCode >= 500) {
       // Upstream is having issues. We return a 502 Bad Gateway
       throw Boom.badGateway('Upstream service is currently unavailable');
    }

    // The upstream API returned 200 OK. Parse the JSON.
    const data = await body.json();
    return { success: true, payload: data };

  } catch (error) {
    // If undici failed at the TCP/DNS level, it's not a Boom error yet.
    if (!error.isBoom) {
       request.log.error(error); // Log the exact system error
       throw Boom.serverUnavailable(`Failed to communicate with upstream service`, error);
    }

    // It was already a Boom error we threw above, re-throw it so the global handler catches it
    throw error;
  }
};
