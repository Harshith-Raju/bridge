require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");

const uploads = multer({ dest: "uploads/" });
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Define the uploads directory path
const uploadsDir = path.join(__dirname, "uploads");

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory created.");
}

// Serve uploaded files statically
app.use("/uploads", express.static(uploadsDir));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/investorDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// Define Storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Investor Schema
const investorSchema = new mongoose.Schema({
  fullName: String,
  dob: Date,
  gender: String,
  nationality: String,
  profilePicture: String,
  email: String,
  phone: String,
  address: String,
  preferredIndustry: String,
  investmentBudgetMin: Number,
  investmentBudgetMax: Number,
  preferredLocation: String,
  franchiseType: String,
  educationalQualification: String,
  professionalExperience: String,
  previousFranchiseExperience: String,
});

const Investor = mongoose.model("Investor", investorSchema);

// Business Schema (Updated to match frontend form)
const businessSchema = new mongoose.Schema({
  companyName: String,
  industry: String,
  yearEstablished: String,
  headquarters: String,
  website: String,
  franchiseName: String,
  franchiseDescription: String,
  investmentRange: String,
  franchiseFee: String,
  royaltyFee: String,
  email: String,
  financialDocuments: String,
  isAgreed: Boolean,
  status: { type: String, default: "pending" },
});

const Business = mongoose.model("Business", businessSchema);

// Notification Schema
const notificationSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

// Routes
app.use("/api", authRoutes);
app.use("/api/companies", companyRoutes);

// Investor Routes
app.post("/api/investors", upload.single("profilePicture"), async (req, res) => {
  const {
    fullName,
    dob,
    gender,
    nationality,
    email,
    phone,
    address,
    preferredIndustry,
    investmentBudgetMin,
    investmentBudgetMax,
    preferredLocation,
    franchiseType,
    educationalQualification,
    professionalExperience,
    previousFranchiseExperience,
  } = req.body;

  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

  const newInvestor = new Investor({
    fullName,
    dob,
    gender,
    nationality,
    profilePicture,
    email,
    phone,
    address,
    preferredIndustry,
    investmentBudgetMin,
    investmentBudgetMax,
    preferredLocation,
    franchiseType,
    educationalQualification,
    professionalExperience,
    previousFranchiseExperience,
  });

  try {
    const savedInvestor = await newInvestor.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Investor Registration Confirmation",
      text: `Dear ${fullName},\n\nThank you for registering as an investor. Your registration has been successfully received.\n\nBest regards,\nThe Investor Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({
      message: "Investor registered successfully!",
      data: savedInvestor,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error registering investor", error: err });
  }
});

app.get("/api/investors", async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
// Business Registration Route (with File Upload)
app.post("/api/businesses", upload.single("financialDocuments"), async (req, res) => {
  const {
    companyName,
    industry,
    yearEstablished,
    headquarters,
    website,
    franchiseName,
    franchiseDescription,
    investmentRange,
    franchiseFee,
    royaltyFee,
    email,
  } = req.body;

  const financialDocuments = req.file ? `/uploads/${req.file.filename}` : "";

  const newBusiness = new Business({
    companyName,
    industry,
    yearEstablished,
    headquarters,
    website,
    franchiseName,
    franchiseDescription,
    investmentRange,
    franchiseFee,
    royaltyFee,
    email,
    financialDocuments,
    isAgreed: true, // Assuming agreement is implicit in form submission
  });

  try {
    const savedBusiness = await newBusiness.save();
    const newNotification = new Notification({ businessId: savedBusiness._id });
    await newNotification.save();

    // Send confirmation email to the company
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Company Registration Confirmation",
      text: `Your company "${companyName}" has been successfully registered.`,
    };
    await transporter.sendMail(companyMailOptions);

    // Send notification email to the admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Company Registered",
      text: `A new company "${companyName}" has been registered.`,
    };
    await transporter.sendMail(adminMailOptions);

    res.json({ message: "Business registered!", data: savedBusiness });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Fetch all businesses
app.get("/api/businesses", (req, res) => {
  Business.find()
    .then((businesses) => res.json(businesses))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Fetch all notifications with business data
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find({ status: "pending" }).populate("businessId");
    res.json(notifications);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Approve Business
app.post("/api/notifications/:id/approve", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.status = "approved";
    await notification.save();

    const business = await Business.findById(notification.businessId);
    business.status = "approved";
    await business.save();

    // Send approval email to the company
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: business.email,
      subject: "Company Registration Approved",
      text: `Your company "${business.companyName}" has been approved.`,
    };
    await transporter.sendMail(companyMailOptions);

    res.json({ message: "Business approved" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Reject Business
app.post("/api/notifications/:id/reject", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.status = "rejected";
    await notification.save();

    const business = await Business.findById(notification.businessId);
    business.status = "rejected";
    await business.save();

    // Send rejection email to the company
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: business.email,
      subject: "Company Registration Rejected",
      text: `Your company "${business.companyName}" has been rejected.`,
    };
    await transporter.sendMail(companyMailOptions);

    res.json({ message: "Business rejected" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
app.post("/api/businesses/:id/reviews", async (req, res) => {
  const { text, rating } = req.body;
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });

    business.reviews.push({ text, rating });
    await business.save();
    res.json(business.reviews[business.reviews.length - 1]);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});