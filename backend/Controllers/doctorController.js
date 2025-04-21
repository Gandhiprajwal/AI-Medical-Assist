// controllers/doctorController.js
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const generateTimeSlots = require("../utils/generateSlots");

exports.getDoctorAvailableSlots = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }

        const doctor = await User.findById(doctorId);
        if (!doctor?.isDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const selectedDate = new Date(date);
        const day = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
        const availability = doctor.availability?.get(day);

        if (!availability) {
            return res.status(404).json({ message: `Doctor not available on ${day}` });
        }

        const [start, end] = availability.split("-");
        const allSlots = generateTimeSlots(start, end); // 30-minute interval slots

        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const appointments = await Appointment.find({
            doctor: doctorId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        const bookedTimes = appointments.map(appt => {
            const utcTime = new Date(appt.date).toISOString().substring(11, 16); // "HH:MM"
            return utcTime;
        });

        const availableSlots = allSlots.filter(slot => {
            const slotStart = slot.split("-")[0];
            return !bookedTimes.includes(slotStart);
        });

        res.status(200).json({
            doctorId,
            date,
            day,
            availableSlots
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


// GET /api/doctors?page=1&limit=10
exports.getPaginatedDoctors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const doctors = await User.find({ isDoctor: true })
            .select("fullname specialization keyPoints rating hospitalName experience _id about profilePicture")
            .skip(skip)
            .limit(limit);

        const totalDoctors = await User.countDocuments({ isDoctor: true });
        const totalPages = Math.ceil(totalDoctors / limit);

        res.status(200).json({
            currentPage: page,
            totalPages,
            totalDoctors,
            doctors
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Server error while fetching doctors" });
    }
};
