const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup controller
exports.signup = async (req, res) => {
    try {
        const {
            fullName, emailorphone, password,
            isDoctor, specialization, experience, qualification, consultationFees, availability
        } = req.body;

        if (!fullName || !emailorphone || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ emailorphone });
        if (existingUser) return res.status(409).json({ message: "User already exists." });

        const newUser = new User({
            fullName,
            emailorphone,
            password,
            isDoctor: isDoctor || false,
            isPatient: !isDoctor,
            role: isDoctor ? "doctor" : "user",
            specialization,
            experience,
            qualification,
            consultationFees,
            availability
        });

        await newUser.save();

        const token = createToken(newUser._id, newUser.role);
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                role: newUser.role
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

        const token = createToken(user._id, user.role);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                role: user.role,
                isDoctor: user.isDoctor
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
