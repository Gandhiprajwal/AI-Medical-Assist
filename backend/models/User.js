const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true, unique: true },
    emailorphone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // user, doctor, admin
    isDoctor: { type: Boolean, default: false },
    isPatient: { type: Boolean, default: true },

    // Doctor-specific fields
    specialization: String,
    experience: Number,
    qualification: String,
    consultationFees: Number,
    availability: [{ day: String, from: String, to: String }],

    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    medicalHistory: [{ type: Schema.Types.ObjectId, ref: "MedicalHistory" }],
    profilePicture: { type: String, default: "" },

    resetToken: String,
    resetTokenExpiration: Date
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT
userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Generate password reset token
userSchema.methods.generateResetToken = function () {
    const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
    this.resetToken = resetToken;
    this.resetTokenExpiration = Date.now() + 10 * 60 * 1000; // 10 mins
    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
