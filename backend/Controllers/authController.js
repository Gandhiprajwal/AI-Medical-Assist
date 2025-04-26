const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup controller
exports.signup = async (req, res) => {
    try {
        const {fullName:fullname, emailOrPhone:emailorphone, password, isDoctor } = req.body;
        console.log("Signup Data:", req.body);

        if (!fullname || !emailorphone || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ emailorphone });
        if (existingUser) return res.status(409).json({ message: "User already exists." });

        const newUser = new User({
            fullname,
            emailorphone,
            password,
            isDoctor: isDoctor || false,
            isPatient: !isDoctor,
            role: isDoctor ? "doctor" : "user",
            profileCompleted: !isDoctor // new field to track if doctor profile is complete
        });

        await newUser.save();

        const token = newUser.generateJWT();
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                role: newUser.role,
                isDoctor: newUser.isDoctor,
                profileCompleted: newUser.profileCompleted
            }
        });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Signin controller
exports.signin = async (req, res) => {
    try {
        const { emailorphone, password } = req.body;

        const user = await User.findOne({ emailorphone });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = createToken(user._id, user.role); // or createToken(user._id, user.role)
        res.status(200).json({
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                role: user.role,
                isDoctor: user.isDoctor,
                profileCompleted: user.profileCompleted,
                ...(user.isDoctor && user.profileCompleted && {
                    specialization: user.specialization,
                    experience: user.experience,
                    qualification: user.qualification,
                    consultationFees: user.consultationFees,
                    availability: user.availability
                })
            }
        });        
    } catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Forgot password controller
exports.handleForgetPassword = async (req, res) => {
    try {
        const { emailorphone } = req.body;
        const user = await User.findOne({ emailorphone });

        if (!user) return res.status(404).json({ message: "User not found." });

        const resetToken = user.generateResetToken();
        await user.save();

        res.status(200).json({ message: "Reset token generated.", resetToken });
    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get logged in user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -resetToken");

        if (!user) return res.status(404).json({ message: "User not found." });

        res.status(200).json(user);
    } catch (err) {
        console.error("Get User Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update doctor profile
exports.completeDoctorProfile = async (req, res) => {
    try {
        const userId = req.user.id; // assumes you have auth middleware
        const {
            specialization,
            experience,
            qualification,
            consultationFees,
            availability,
            about,
            hospitalName,
            contactNumber,
            keyPoints
        } = req.body;

        if (!specialization || !experience || !qualification || !consultationFees || !availability) {
            return res.status(400).json({ message: "All fields are required to complete profile." });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            specialization,
            experience,
            qualification,
            consultationFees,
            availability,
            about,
            hospitalName,
            contactNumber,
            keyPoints,
            profileCompleted: true
        }, { new: true });

        res.status(200).json({
            message: "Doctor profile completed successfully.",
            user: {
                id: updatedUser._id,
                fullname: updatedUser.fullname,
                role: updatedUser.role,
                profileCompleted: updatedUser.profileCompleted
            }
        });
    } catch (err) {
        console.error("Profile Completion Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
