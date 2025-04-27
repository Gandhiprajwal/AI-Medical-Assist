const winston = require('winston');

// Create a custom logger
const logger = winston.createLogger({
  level: 'info', // Set the default logging level (e.g., info, error)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    // Log to the console
    new winston.transports.Console({ format: winston.format.simple() }),

    // Log to a file (e.g., logs/app.log)
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

module.exports = logger;
