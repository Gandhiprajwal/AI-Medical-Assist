const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    emailorphone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isDoctor: { type: Boolean, default: false },
    isPatient: { type: Boolean, default: true },
    // Doctor specific fields
    image: { type: String, default: "" },
    specialistType: { type: String }, // already exists
    specialization: { type: String },
    experience: { type: String },
    qualification: { type: String },
    consultationFees: { type: String },
    about: { type: String },
    hospitalName: { type: String },
    contactNumber: { type: String },
    rating: { type: String, default: "4.0" },
    location: { type: String },
    about: { type: String },
    keyPoints: [{ type: String }],
    availability: { type: Map, of: String },
    profileCompleted: { type: Boolean, default: false },
    // Relations
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    medicalHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "MedicalHistory" }],
    profilePicture: { type: String, default: "" },
    resetToken: String,
    resetTokenExpiration: Date
});

// Indexing the emailorphone field
userSchema.index({ emailorphone: 1 });  // Index on emailorphone for faster lookups

// Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Auth methods
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

userSchema.methods.generateResetToken = function () {
    const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "10m" });
    this.resetToken = resetToken;
    this.resetTokenExpiration = Date.now() + 60 * 60 * 1000 * 10;
    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
