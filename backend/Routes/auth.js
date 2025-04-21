const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", authController.signup);             // User & doctor signup
router.post("/signin", authController.signin);             // Shared login
router.post("/forgot-password", authController.handleForgetPassword);
router.get("/user", authMiddleware, authController.getUser); // Protected route

module.exports = router;
