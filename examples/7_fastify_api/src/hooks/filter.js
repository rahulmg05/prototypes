import fp from 'fastify-plugin';
import Boom from '@hapi/boom';

/**
 * A Fastify Plugin that encapsulates our request filtering logic.
 * We want to drop banned IPs as early as possible (onRequest)
 * and enforce auth logic before route execution (preHandler).
 */
async function filterHooksPlugin(fastify, options) {

  // 1. The onRequest Hook (Fires before body parsing or routing)
  fastify.addHook('onRequest', async (request, reply) => {
    const clientIp = request.ip;
    const bannedIps = ['123.45.67.89', '98.76.54.32'];

    if (bannedIps.includes(clientIp)) {
      // Immediately drop the request and send a 403 Forbidden payload
      // Fastify's global errorHandler will intercept this Boom exception.
      throw Boom.forbidden('Your IP address has been banned.');
    }

    // We can also add custom trace headers early
    request.headers['x-custom-trace'] = `req-${Date.now()}`;
  });

  // 2. We can create reusable preHandler functions that routes can individually apply
  fastify.decorate('requireAuth', async function (request, reply) {
    const authHeader = request.headers['authorization'];

    if (!authHeader || authHeader !== 'Bearer secret-token') {
      throw Boom.unauthorized('Invalid or missing authentication token');
    }
  });

}

export default fp(filterHooksPlugin);
