// controllers/appointmentController.js
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");
const { sendSMS } = require("../utils/smsService");
const redisClient = require("../utils/redisClient"); // Import Redis client for caching
const Sentry = require("../utils/sentry");

// Cache expiration time (from redisClient.js)
const CACHE_EXPIRATION_TIME = redisClient.CACHE_EXPIRATION_TIME;

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, reason } = req.body;
    const patientId = req.user.id;

    // Check if doctor is available on the given date and time
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).getTime() + 60 * 60 * 1000),
      }, // Check for the next hour
    });
    if (existingAppointment) {
      return res.status(400).json({
        message: "Doctor is not available on the given date and time",
      });
    }

    // Create a new appointment (within a transaction to avoid double-booking in case of concurrency)
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create appointment within the transaction
      const appointment = await Appointment.create(
        [{ doctor: doctorId, patient: patientId, date, reason }],
        { session }
      );

      // Commit the transaction
      await session.commitTransaction();

      // Get doctor and patient details
      const doctor = await User.findById(doctorId);
      const patient = await User.findById(patientId);

      // Invalidate the cache for the doctor’s availability on the selected date
      await redisClient.clearCache(`doctor:${doctorId}:availability:${date}`);

      // Invalidate the cache for the patient’s appointments
      await redisClient.clearCache(`patientAppointments:${patientId}`);

      // Send email/SMS notifications to doctor (optional)
      // await sendEmail(doctor.emailorphone, `New appointment from ${patient.fullname}`, `You have a new appointment on ${date}`);
      // await sendSMS(doctor.emailorphone, `New appointment from ${patient.fullname} on ${date}`);
      Sentry.captureMessage("📅 Appointment booking API called", "info");
      res.status(201).json({ message: "Appointment booked", appointment });
    } catch (error) {
      await session.abortTransaction();
      // Add Sentry context before capturing the exception
      Sentry.configureScope((scope) => {
        scope.setUser({ id: req.user.id, email: req.user.email });
        scope.setExtra("requestData", req.body);
      });
      Sentry.captureException(error); // Capture the error with Sentry
      Sentry.captureMessage("❌ Error booking appointment", "error");
      console.error("Error while booking appointment:", error);
      res.status(500).json({ message: "Failed to book appointment" });
    } finally {
      session.endSession();
    }
  } catch (err) {
    // Add Sentry context before capturing the exception
    Sentry.configureScope((scope) => {
      scope.setUser({ id: req.user.id, email: req.user.email });
      scope.setExtra("requestData", req.body);
    });
    Sentry.captureException(err); // Capture the error with Sentry
    console.error("Book Appointment Error:", err);
    res.status(500).json({ message: "Failed to book appointment" });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    // Cache key based on doctorId
    const cacheKey = `appointments:${doctorId}`;

    // Check if appointments are cached in Redis
    const cachedAppointments = await redisClient.get(cacheKey);

    if (cachedAppointments) {
      // If cached, return the cached response
      return res.status(200).json(JSON.parse(cachedAppointments));
    }

    // If not cached, fetch from the database
    const appointments = await Appointment.find({ doctor: doctorId }).populate(
      "patient",
      "fullname emailorphone"
    );

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }

    // Cache the result in Redis
    await redisClient.setex(
      cacheKey,
      CACHE_EXPIRATION_TIME,
      JSON.stringify(appointments)
    );
    Sentry.captureMessage("🩺 Doctor's appointments fetch API called", "info");

    // Return the appointments
    res.status(200).json(appointments);
  } catch (err) {
    // Add Sentry context before capturing the exception
    Sentry.configureScope((scope) => {
      scope.setUser({ id: req.user.id, email: req.user.email });
      scope.setExtra("requestData", req.body);
    });
    Sentry.captureException(err); // Capture the error with Sentry
    Sentry.captureMessage("❌ Error fetching doctor's appointments", "error");
    console.error("Error fetching doctor appointments:", err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

exports.getPatientAppointments = async (req, res) => {
  try {
    // throw new Error("Test error"); // Test Sentry error capturing
    const patientId = req.user.id;

    // Cache key based on patientId
    const cacheKey = `patientAppointments:${patientId}`;

    // Check if patient appointments are cached in Redis
    const cachedAppointments = await redisClient.get(cacheKey);

    if (cachedAppointments) {
      // If cached, return the cached response
      return res.status(200).json(JSON.parse(cachedAppointments));
    }

    // If not cached, fetch from the database
    const appointments = await Appointment.find({
      patient: patientId,
    }).populate("doctor", "fullname specialization");

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this patient" });
    }

    // Cache the result in Redis
    await redisClient.setex(
      cacheKey,
      CACHE_EXPIRATION_TIME,
      JSON.stringify(appointments)
    );
    Sentry.captureMessage("🙋‍♂️ Patient's appointments fetch API called", "info");

    // Return the appointments
    res.status(200).json(appointments);
  } catch (err) {
    // Add Sentry context before capturing the exception
    Sentry.configureScope((scope) => {
      scope.setUser({ id: req.user.id, email: req.user.email });
      scope.setExtra("requestData", req.body);
    });
    Sentry.captureException(err); // Capture the error with Sentry
    Sentry.captureMessage("❌ Error fetching patient's appointments", "error");
    console.error("Error fetching patient appointments:", err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// controllers/appointmentController.js
//GET appointments by date -> GET /api/appointments/date
// exports.getAppointmentsByDate = async (req, res) => {
//     try {
//         const { date } = req.query;

//         if (!date) {
//             return res.status(400).json({ message: "Date is required" });
//         }

//         // Convert date to Date object
//         const selectedDate = new Date(date);
//         const startOfDay = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
//         const endOfDay = new Date(selectedDate.setUTCHours(23, 59, 59, 999));

//         // Query using the indexed 'date' field
//         const appointments = await Appointment.find({
//             date: { $gte: startOfDay, $lte: endOfDay }
//         }).populate('doctor', 'fullname specialization').populate('patient', 'fullname emailorphone');

//         if (appointments.length === 0) {
//             return res.status(404).json({ message: "No appointments found on this date" });
//         }

//         res.status(200).json(appointments);
//     } catch (err) {
//         console.error("Error fetching appointments by date:", err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// controllers/appointmentController.js -> GET /api/appointments/doctor/:doctorId/date
// exports.getAppointmentsByDoctorAndDate = async (req, res) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const { date } = req.query;

//         if (!date) {
//             return res.status(400).json({ message: "Date is required" });
//         }

//         const selectedDate = new Date(date);
//         const startOfDay = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
//         const endOfDay = new Date(selectedDate.setUTCHours(23, 59, 59, 999));

//         // Query using the indexed 'doctor' and 'date' fields
//         const appointments = await Appointment.find({
//             doctor: doctorId,
//             date: { $gte: startOfDay, $lte: endOfDay }
//         }).populate('patient', 'fullname emailorphone');

//         if (appointments.length === 0) {
//             return res.status(404).json({ message: "No appointments found for this doctor on this date" });
//         }

//         res.status(200).json(appointments);
//     } catch (err) {
//         console.error("Error fetching appointments by doctor and date:", err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
