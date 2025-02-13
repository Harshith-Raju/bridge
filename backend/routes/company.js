const express = require("express");
const nodemailer = require("nodemailer");
const Company = require("../models/Company");

const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Function to send email notifications
const sendInvestorNotification = async (companyName) => {
  try {
    const investors = await getInvestors(); // Fetch investor emails from DB
    if (!investors.length) {
      console.log("⚠️ No investors found. Skipping email notification.");
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: investors.join(", "),
      subject: "New Company Registered",
      text: `A new company has been registered: ${companyName}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to investors.");
  } catch (error) {
    console.error("❌ Error sending investor notification email:", error.message);
  }
};

// ✅ Function to get investor emails from database (dummy for now)
const getInvestors = async () => {
  // Replace with actual database query, e.g., Investor.find({}, "email");
  return ["investor1@example.com", "investor2@example.com"];
};

// ✅ Register a new company
router.post("/", async (req, res) => {
  const { name, description, owner } = req.body;

  try {
    const newCompany = new Company({ name, description, owner });
    await newCompany.save();

    // Send email notification (non-blocking)
    sendInvestorNotification(name).catch((error) =>
      console.error("❌ Email notification failed:", error.message)
    );

    res.status(201).json(newCompany);
  } catch (error) {
    console.error("❌ Error registering company:", error.message);
    res.status(500).json({ message: "Error registering company", error: error.message });
  }
});

// ✅ Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error("❌ Error fetching companies:", error.message);
    res.status(500).json({ message: "Error fetching companies", error: error.message });
  }
});

module.exports = router;
