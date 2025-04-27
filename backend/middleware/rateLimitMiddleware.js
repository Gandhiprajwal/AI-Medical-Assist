const redisClient = require('../utils/redisClient'); // Your existing redisClient.js

// Rate Limiting Middleware
const rateLimit = (maxRequests, windowMs) => {
    return async (req, res, next) => {
        // Ensure windowMs is valid and not zero
        if (!windowMs || windowMs <= 0) {
            console.error('Invalid windowMs value. It should be a positive integer.');
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Create a unique key for rate-limiting, based on IP and path
        const key = `${req.ip}:${req.originalUrl}`;

        try {
            // Get the current request count from Redis
            const currentRequestCount = await redisClient.get(key);

            // If request count exceeds the max limit, block the request
            if (currentRequestCount && parseInt(currentRequestCount) >= maxRequests) {
                return res.status(429).json({ message: "Too many requests, please try again later." });
            }

            // Otherwise, increment the request count or set it for the first time
            const newRequestCount = currentRequestCount ? parseInt(currentRequestCount) + 1 : 1;

            // Setting or updating the request count in Redis with TTL (converted to seconds)
            await redisClient.setex(key, windowMs / 1000, newRequestCount);

            console.log(`Setting key: ${key} with TTL: ${windowMs / 1000} and value: ${newRequestCount}`);
            // Proceed to the next middleware or route handler
            next();
        } catch (err) {
            console.error("Rate-limiting error:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};

module.exports = rateLimit;
