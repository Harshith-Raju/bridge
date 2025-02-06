require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer"); // Import multer for file uploads
const path = require("path");

const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/company");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
    cb(null, "uploads/"); // Store files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
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
  financialDocuments: String, // Store file path
  isAgreed: Boolean,
});

const Business = mongoose.model("Business", businessSchema);

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
app.post("/api/businesses", upload.single("financialDocuments"), (req, res) => {
  const { title, registrationNumber, taxId, website, phoneNumber, isAgreed } = req.body;
  const financialDocuments = req.file ? `/uploads/${req.file.filename}` : "";

  const newBusiness = new Business({
    title,
    registrationNumber,
    taxId,
    website,
    phoneNumber,
    financialDocuments, // Store file path
    isAgreed: isAgreed === "true", // Convert string to boolean
  });

  newBusiness
    .save()
    .then(() => res.json({ message: "Business registered!", data: newBusiness }))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Fetch all businesses
app.get("/api/businesses", (req, res) => {
  Business.find()
    .then((businesses) => res.json(businesses))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
