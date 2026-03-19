import { getUserFromCassandraHandler, fetchUpstreamAPIHandler } from '../controllers/externalController.js';

export default async function externalRoutes(fastify, options) {

  // Example of querying the Cassandra Database plugin attached to the Fastify instance
  // We use the `requireAuth` preHandler we registered in our filter.js hook plugin!
  fastify.route({
    method: 'GET',
    url: '/cassandra/:id',
    preHandler: fastify.requireAuth,
    schema: {
      params: {
        type: 'object',
        properties: { id: { type: 'string', pattern: '^[0-9]+$' } }
      }
    },
    handler: getUserFromCassandraHandler
  });


  // Example of fetching from an upstream API and handling errors gracefully
  fastify.route({
    method: 'POST',
    url: '/upstream',
    schema: {
      body: {
        type: 'object',
        required: ['targetUrl'],
        properties: { targetUrl: { type: 'string', format: 'uri' } }
      }
    },
    handler: fetchUpstreamAPIHandler
  });

}
