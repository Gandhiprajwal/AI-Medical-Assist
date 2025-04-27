const User = require("../models/User");
const Appointment = require("../models/Appointment");
const generateTimeSlots = require("../utils/generateSlots");
const redisClient = require("../utils/redisClient"); // Import Redis client
const Sentry = require("../utils/sentry"); // Import Sentry for error tracking

// Function to get available slots for a doctor on a specific date

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

    const cacheKey = `doctor:${doctorId}:availability:${date}`;
    const cachedSlots = await redisClient.get(cacheKey);

    if (cachedSlots) {
      return res.status(200).json(JSON.parse(cachedSlots));
    }

    const selectedDate = new Date(date);
    const day = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
    const availability = doctor.availability?.get(day);

    if (!availability) {
      return res
        .status(404)
        .json({ message: `Doctor not available on ${day}` });
    }

    const [start, end] = availability.split("-");
    const allSlots = generateTimeSlots(start, end);

    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctor: doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const bookedTimes = appointments.map((appt) => {
      const utcTime = new Date(appt.date).toISOString().substring(11, 16);
      return utcTime;
    });

    const availableSlots = allSlots.filter((slot) => {
      const slotStart = slot.split("-")[0];
      return !bookedTimes.includes(slotStart);
    });

    await redisClient.setex(
      cacheKey,
      3600,
      JSON.stringify({ doctorId, date, day, availableSlots })
    );

    res.status(200).json({
      doctorId,
      date,
      day,
      availableSlots,
    });
  } catch (error) {
    // Add Sentry context
    Sentry.configureScope(scope => {
      scope.setUser({ id: req.user.id, email: req.user.email });
      scope.setExtra('requestData', req.query);
    });
    Sentry.captureException(error); // Capture error in Sentry
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Function to get paginated list of doctors
exports.getPaginatedDoctors = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const cacheKey = `doctors:paginated:${page}:${limit}`;
      const cachedDoctors = await redisClient.get(cacheKey);
  
      if (cachedDoctors) {
        return res.status(200).json(JSON.parse(cachedDoctors));
      }
  
      const doctors = await User.find({ isDoctor: true })
        .select(
          "fullname specialization keyPoints rating hospitalName experience _id about profilePicture"
        )
        .skip(skip)
        .limit(limit);
  
      const totalDoctors = await User.countDocuments({ isDoctor: true });
      const totalPages = Math.ceil(totalDoctors / limit);
  
      await redisClient.setex(
        cacheKey,
        3600,
        JSON.stringify({
          currentPage: page,
          totalPages,
          totalDoctors,
          doctors,
        })
      );
  
      res.status(200).json({
        currentPage: page,
        totalPages,
        totalDoctors,
        doctors,
      });
    } catch (error) {
      // Add Sentry context
      Sentry.configureScope(scope => {
        scope.setUser({ id: req.user.id, email: req.user.email });
        scope.setExtra('requestData', req.query);
      });
      Sentry.captureException(error); // Capture error in Sentry
      console.error("Error fetching doctors:", error);
      res.status(500).json({ message: "Server error while fetching doctors" });
    }
  };
  
