// controllers/appointmentController.js
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");
const { sendSMS } = require("../utils/smsService");

exports.bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, reason } = req.body;
        const patientId = req.user.id;
        // console.log("Booking appointment for patient:", patientId, "with doctor:", doctorId, "on date:", date, "for reason:", reason);
        // Check if doctor is available on the given date
        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            date: { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 60 * 60 * 1000) } // Check for the next hour
        });
        if (existingAppointment) {
            return res.status(400).json({ message: "Doctor is not available on the given date" });
        }

        const appointment = await Appointment.create({
            doctor: doctorId,
            patient: patientId,
            date,
            reason
        });

        const doctor = await User.findById(doctorId);
        const patient = await User.findById(patientId);

        // Real-time notification
        // const io = req.app.get("io");
        // io.to(doctor._id.toString()).emit("new-appointment", {
        //     patientName: patient.fullname,
        //     appointmentDate: date,
        //     reason
        // });

        // await sendEmail(doctor.emailorphone, `New appointment from ${patient.fullname}`, `You have a new appointment on ${date}`);
        // await sendSMS(doctor.emailorphone, `New appointment from ${patient.fullname} on ${date}`);

        res.status(201).json({ message: "Appointment booked", appointment });
    } catch (err) {
        console.error("Book Appointment Error:", err);
        res.status(500).json({ message: "Failed to book appointment" });
    }
};

exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const appointments = await Appointment.find({ doctor: doctorId }).populate("patient", "fullname emailorphone");
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};

exports.getPatientAppointments = async (req, res) => {
    try {
        const patientId = req.user.id;
        const appointments = await Appointment.find({ patient: patientId }).populate("doctor", "fullname specialization");
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
};
