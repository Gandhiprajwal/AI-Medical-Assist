const rateLimit = require('express-rate-limit');

// Health Prediction Route Rate Limiting (allow 50 requests per 10 minutes)
const healthPredictLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // Limit each IP to 50 requests per 10 minutes
    message: 'Too many requests for health prediction, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Authentication Route Rate Limiting (allow 200 requests per 5 minutes)
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per 5 minutes
    message: 'Too many login attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Appointment Route Rate Limiting (allow 100 requests per 10 minutes)
const appointmentLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per 10 minutes
    message: 'Too many appointment booking attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Doctor Availability Route Rate Limiting (allow 150 requests per 15 minutes)
const doctorLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 150, // Limit each IP to 150 requests per 15 minutes
    message: 'Too many requests to check doctor availability, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    healthPredictLimiter,
    authLimiter,
    appointmentLimiter,
    doctorLimiter,
};