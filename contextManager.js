const redis = require('redis');
const client = redis.createClient({
	socket: {
		host: process.env.REDIS_HOST || 'redis', // Use 'redis' for Docker
		port: process.env.REDIS_PORT || 6379,
	},
});

client.on('error', (err) => console.error('Redis error:', err));
client.on('connect', () => console.log('Connected to Redis'));

(async () => {
	try {
		// await client.connect();
	} catch (error) {
		console.error('Redis connection error:', error);
	}
})();

exports.saveContext = async (sessionId, context) => {
	await client.set(sessionId, JSON.stringify(context));
};

exports.getContext = async (sessionId) => {
	const data = await client.get(sessionId);
	return data ? JSON.parse(data) : {};
};
