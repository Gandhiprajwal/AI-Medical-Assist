// cron/reminderCron.js
const cron = require("node-cron");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");
const { sendSMS } = require("../utils/smsService");

cron.schedule("*/10 * * * *", async () => {
    const now = new Date();
    const upcoming = new Date(now.getTime() + 60 * 60 * 1000);

    const appointments = await Appointment.find({
        date: { $gte: now, $lte: upcoming },
        status: "pending"
    }).populate("doctor patient");

    for (const appt of appointments) {
        const message = `Reminder: Appointment at ${appt.date.toLocaleTimeString()} with Dr. ${appt.doctor.fullname}`;
        await sendEmail(appt.patient.emailorphone, "Appointment Reminder", message);
        await sendSMS(appt.patient.emailorphone, message);
    }

    console.log(`[Cron] Sent ${appointments.length} reminders`);
});