// routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const appointmentController = require("../Controllers/appointmentController");

router.post("/book", auth, appointmentController.bookAppointment);
router.get("/doctor", auth, appointmentController.getDoctorAppointments);
router.get("/patient", auth, appointmentController.getPatientAppointments);

module.exports = router;
