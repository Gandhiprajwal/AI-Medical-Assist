// routes/doctorRoutes.js

const express = require("express");
const router = express.Router();
const doctorController = require("../Controllers/doctorController");

// Route to get doctor availability
router.get("/availability/:id", doctorController.getDoctorAvailableSlots);
router.get("/", doctorController.getPaginatedDoctors); // Get paginated list of doctors

module.exports = router;
