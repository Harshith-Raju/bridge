const express = require("express");
const router = express.Router();
const Investor = require("../models/Investor"); // Correct import path
const upload = require("../middleware/upload");
const { sendEmail } = require("../utils/email");

// Register Investor
router.post("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const newInvestor = new Investor({
      ...req.body,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const savedInvestor = await newInvestor.save();

    // Send Confirmation Email
    await sendEmail({
      to: req.body.email,
      subject: "Investor Registration Confirmation",
      text: `Dear ${req.body.fullName},\n\nThank you for registering as an investor.\n\nBest regards,\nThe Investor Team`,
    });

    res.status(201).json({ message: "Investor registered successfully!", data: savedInvestor });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error registering investor", error: err });
  }
});

// Get All Investors
router.get("/", async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;