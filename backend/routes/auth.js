const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// ✅ Ensure all required environment variables exist
if (!process.env.JWT_SECRET || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing environment variables. Check .env file!");
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    // 🔹 Hash Password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Secure bcrypt password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ✅ FORGOT PASSWORD - SEND OTP
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔹 Secure OTP generation (6-digit)
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();

    // 🔹 Save OTP and timestamp
    user.resetOTP = otp;
    user.resetOTPTimestamp = Date.now();
    await user.save();

    // 🔹 Send OTP via email
    const emailSent = await sendEmail(user.email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error processing forgot password request", error: err.message });
  }
});

// ✅ RESET PASSWORD - VERIFY OTP AND CHANGE PASSWORD
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔹 Verify OTP
    if (!user.resetOTP || user.resetOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔹 Check if OTP is expired (10 minutes)
    const OTP_EXPIRATION_TIME = 10 * 60 * 1000;
    if (Date.now() - user.resetOTPTimestamp > OTP_EXPIRATION_TIME) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 🔹 Hash new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 🔹 Update password and clear OTP securely
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPTimestamp = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful. Please login with your new password." });
  } catch (err) {
    res.status(500).json({ message: "Error processing password reset", error: err.message });
  }
});

// ✅ FUNCTION TO SEND EMAIL WITH OTP
const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    return false;
  }
};

module.exports = router;
