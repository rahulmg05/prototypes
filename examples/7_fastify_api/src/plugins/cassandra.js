import fp from 'fastify-plugin';
import cassandra from 'cassandra-driver';

/**
 * A Fastify Plugin that encapsulates our Cassandra Database connection.
 * We wrap it in `fp` so the `fastify.cassandra` decorator is available globally
 * to all other plugins and routes in our application.
 */
async function cassandraPlugin(fastify, options) {

  // Create the connection pool (in a real app, these values come from env vars)
  const client = new cassandra.Client({
    contactPoints: ['127.0.0.1:9042'],
    localDataCenter: 'datacenter1',
    keyspace: 'my_keyspace',
    queryOptions: { consistency: cassandra.types.consistencies.localQuorum }
  });

  try {
    // Attempt to connect. We log a warning if it fails, but we don't crash the server
    // entirely so we can still demonstrate the upstream error handling in our routes!
    await client.connect();
    fastify.log.info('Successfully connected to Apache Cassandra cluster.');
  } catch (err) {
    fastify.log.warn('Failed to connect to Cassandra (expected since no cluster is running locally). The plugin will simulate errors.');
  }

  // Decorate the fastify instance so we can call `fastify.cassandra.execute()` anywhere
  fastify.decorate('cassandra', client);

  // Ensure we gracefully drain the connection pool when the server stops
  fastify.addHook('onClose', async (instance) => {
    await instance.cassandra.shutdown();
  });
}

export default fp(cassandraPlugin);
