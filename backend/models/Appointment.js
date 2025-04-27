const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    reason: { type: String },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

// Create indexes
appointmentSchema.index({ doctor: 1 });  // Index on doctor field
appointmentSchema.index({ patient: 1 }); // Index on patient field
appointmentSchema.index({ date: 1 });    // Index on appointment date

module.exports = mongoose.model("Appointment", appointmentSchema);
