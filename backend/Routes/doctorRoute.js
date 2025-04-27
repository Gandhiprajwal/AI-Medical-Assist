// routes/doctorRoutes.js

const express = require("express");
const router = express.Router();
const doctorController = require("../Controllers/doctorController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to get doctor availability
router.get(
  "/availability/:id",
  authMiddleware,
  doctorController.getDoctorAvailableSlots
);
router.get("/", authMiddleware, doctorController.getPaginatedDoctors); // Get paginated list of doctors

module.exports = router;
