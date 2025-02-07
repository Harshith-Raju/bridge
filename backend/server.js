require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");

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

// Investor Schema
const investorSchema = new mongoose.Schema({
  fullName: String,
  dob: Date,
  email: String,
  phone: String,
  address: String,
  nationality: String,
  description: String,
  location: String,
});

const Investor = mongoose.model("Investor", investorSchema);

// Business Schema
const businessSchema = new mongoose.Schema({
  title: String,
  registrationNumber: String,
  taxId: String,
  website: String,
  phoneNumber: String,
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
app.post("/api/investors", (req, res) => {
  const newInvestor = new Investor(req.body);
  newInvestor
    .save()
    .then(() => res.json("Investor added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.get("/api/investors", (req, res) => {
  Investor.find()
    .then((investors) => res.json(investors))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Business Registration Route (with File Upload)
app.post("/api/businesses", upload.single("financialDocuments"), async (req, res) => {
  const { title, registrationNumber, taxId, website, phoneNumber, isAgreed } = req.body;
  const financialDocuments = req.file ? `/uploads/${req.file.filename}` : "";

  const newBusiness = new Business({
    title,
    registrationNumber,
    taxId,
    website,
    phoneNumber,
    financialDocuments,
    isAgreed: isAgreed === "true",
  });

  try {
    const savedBusiness = await newBusiness.save();
    const newNotification = new Notification({ businessId: savedBusiness._id });
    await newNotification.save();
    res.json({ message: "Business registered!", data: savedBusiness });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Fetch all businesses
app.get("/api/businesses", (req, res) => {
  Business.find()
    .then((businesses) => res.json(businesses))
    .catch((err) => res.status(400).json ("Error: " + err));
});

// Fetch all notifications
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

    res.json({ message: "Business rejected" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});