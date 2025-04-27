// utils/redisClient.js
const redis = require('redis');

// Create Redis client
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    // password: process.env.REDIS_PASSWORD, // Optional: Redis password
});

// Error handling
client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Cache expiration time (in seconds)
const CACHE_EXPIRATION_TIME = 3600; // 1 hour

// Connect the Redis client
client.connect();

// Export functions for use in your application
module.exports = {
    get: async (key) => {
        try {
            return await client.get(key);
        } catch (err) {
            console.error('Error fetching from Redis:', err);
            return null;
        }
    },
    setex: async (key, ttl, value) => {
        try {
            await client.setEx(key, ttl, value);
        } catch (err) {
            console.error('Error setting in Redis:', err);
        }
    },
    del: async (key) => {
        try {
            await client.del(key);
        } catch (err) {
            console.error('Error deleting from Redis:', err);
        }
    },
    clearCache: async (key) => {
        await module.exports.del(key);
    },
    CACHE_EXPIRATION_TIME,
};
