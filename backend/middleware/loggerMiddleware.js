const logger = require('../utils/logger'); // Import the custom logger

// Create a logging middleware to capture request details
const logRequest = (req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    logger.info(`Response sent for: ${req.method} ${req.originalUrl} with status: ${res.statusCode}`);
  });
  next();
};

module.exports = logRequest;