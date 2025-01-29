const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ REGISTER ROUTE
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already exists" });

    // 🔹 Hash Password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});

// ✅ LOGIN ROUTE (FIXED)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Incoming Login Request:", req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);

    // ✅ Correct bcrypt password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password Match:", isMatch);

    if (!isMatch) {
      console.error("❌ Password does not match for:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ✅ FORGOT PASSWORD - SEND OTP
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔹 Generate a random OTP (6-digit)
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 🔹 Save OTP and timestamp to user record
    user.resetOTP = otp;
    user.resetOTPTimestamp = Date.now();
    await user.save();

    // 🔹 Send OTP via email
    const emailSent = await sendEmail(user.email, otp);
    if (emailSent) {
      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send OTP" });
    }
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

    // 🔹 Convert OTP to a number (fix potential type mismatch)
    if (parseInt(user.resetOTP) !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔹 Check if OTP is expired (10 minutes limit)
    const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes
    if (Date.now() - user.resetOTPTimestamp > OTP_EXPIRATION_TIME) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 🔹 Hash new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 🔹 Update password and clear OTP
    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPTimestamp = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful. Please login with your new password." });
  } catch (err) {
    res.status(500).json({ message: "Error processing password reset", error: err.message });
  }
});

// ✅ FUNCTION TO SEND EMAIL WITH OTP
const sendEmail = async (email, otp) => {
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

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ OTP sent successfully!");
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    return false;
  }
};

module.exports = router;
