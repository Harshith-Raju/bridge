// routes/company.js
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

// Register a new company
router.post("/", async (req, res) => {
  const { name, description, owner } = req.body;

  try {
    const newCompany = new Company({ name, description, owner });
    await newCompany.save();

    // Send email notification to investors
    const investors = await getInvestors(); // Implement this function to get investor emails
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: investors.join(", "),
      subject: "New Company Registered",
      text: `A new company has been registered: ${name}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent: " + info.response);
    });

    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: "Error registering company", error });
  }
});

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
});

// Function to get investor emails (dummy implementation)
const getInvestors = async () => {
  // Replace this with actual logic to fetch investor emails from your database
  return ["investor1@example.com", "investor2@example.com"];
};

module.exports = router;