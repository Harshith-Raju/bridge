require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const http = require("http");
const socketIo = require("socket.io");

const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });
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

// Create the upload instance
const upload = multer({ storage: storage });

// Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define Mongoose Models Safely
const Investor = mongoose.models.Investor || mongoose.model("Investor", new mongoose.Schema({
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
}));

const Business = mongoose.models.Business || mongoose.model("Business", new mongoose.Schema({
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
}));

const Notification = mongoose.models.Notification || mongoose.model("Notification", new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
}));

const Company = mongoose.models.Company || mongoose.model("Company", new mongoose.Schema({
  name: String,
  category: String, // e.g., "Food", "Health & Fitness", "Hotels & Drinks"
}));

const CompanyCategory = mongoose.models.CompanyCategory || mongoose.model("CompanyCategory", new mongoose.Schema({
  name: String,
}));

const InvestorStatus = mongoose.models.InvestorStatus || mongoose.model("InvestorStatus", new mongoose.Schema({
  status: String, // e.g., "Approved", "Rejected", "Pending"
}));

const PendingBusiness = mongoose.models.PendingBusiness || mongoose.model("PendingBusiness", new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  status: { type: String, default: "pending" },
}));

const User = mongoose.models.User || mongoose.model("User ", new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String, // e.g., "admin", "investor", "company"
}));

const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  message: String,
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}));

// Socket.IO for real-time updates
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendAnnouncement", async (data) => {
    const { companyId, message } = data;
    const newAnnouncement = new Announcement({ companyId, message });
    await newAnnouncement.save();
    io.emit("newAnnouncement", newAnnouncement);
  });

  socket.on("approveAnnouncement", async (announcementId) => {
    const announcement = await Announcement.findByIdAndUpdate(
      announcementId,
      { isApproved: true },
      { new: true }
    );
    io.emit("announcementApproved", announcement);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

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

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Investor registered successfully!",
      data: savedInvestor,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error registering investor", error: err.message });
  }
});

// Fetch all investors
app.get("/api/investors", async (req, res) => {
  try {
    const investors = await Investor.find();
    res.json(investors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching investors", error: err.message });
  }
});

// Fetch all companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching companies", error: err.message });
  }
});

// Fetch all company categories
app.get("/api/companycategories", async (req, res) => {
  try {
    const categories = await CompanyCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching company categories", error: err.message });
  }
});

// Fetch all investor statuses
app.get("/api/investorstatuses", async (req, res) => {
  try {
    const statuses = await InvestorStatus.find();
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching investor statuses", error: err.message });
  }
});

// Fetch all pending businesses
app.get("/api/pendingbusinesses", async (req, res) => {
  try {
    const pendingBusinesses = await PendingBusiness.find().populate("businessId");
    res.json(pendingBusinesses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending businesses", error: err.message });
  }
});

// Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// Call Scheduling Schema
const callSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  ampm: String,
  timeZone: String,
});

const Call = mongoose.model("Call", callSchema);


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
    res.status(400).json({ message: "Error registering business", error: err.message });
  }
});


// Fetch all businesses
app.get("/api/businesses", async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(400).json({ message: "Error fetching businesses", error: err.message });
  }
});

// Fetch all notifications with business data
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find({ status: "pending" }).populate("businessId");
    res.json(notifications);
  } catch (err) {
    res.status(400).json({ message: "Error fetching notifications", error: err.message });
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
    res.status(400).json({ message: "Error approving business", error: err.message });
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
    res.status(400).json({ message: "Error rejecting business", error: err.message });
  }
});

// Announcement Routes
app.post("/api/announcements", async (req, res) => {
  const { companyId, message } = req.body;
  try {
    const newAnnouncement = new Announcement({ companyId, message });
    await newAnnouncement.save();
    io.emit("newAnnouncement", newAnnouncement);
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ message: "Error creating announcement", error: err.message });
  }
});

app.get("/api/announcements", async (req, res) => {
  try {
    const announcements = await Announcement.find({ isApproved: true }).populate("companyId");
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Error fetching announcements", error: err.message });
  }
});

app.post("/api/announcements/:id/approve", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    io.emit("announcementApproved", announcement);
    res.json(announcement);
  } catch (err) {
    res.status(500).json({ message: "Error approving announcement", error: err.message });
  }
});
app.post('/api/schedule', async (req, res) => {
  const { name, email, date, time, ampm, timeZone } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Call Scheduled Successfully',
    text: `Hello ${name},\n\nYour call has been scheduled on ${date} at ${time} ${ampm} (${timeZone}).\n\nBest regards,\nYour Company`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Call scheduled and email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});


// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});