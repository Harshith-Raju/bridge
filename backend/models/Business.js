const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  yearEstablished: { type: String, required: true },
  headquarters: { type: String, required: true },
  website: { type: String, required: true },
  franchiseName: { type: String, required: true },
  franchiseDescription: { type: String, required: true },
  investmentRange: { type: String, required: true },
  franchiseFee: { type: String, required: true },
  royaltyFee: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  financialDocuments: { type: String },
  isAgreed: { type: Boolean, default: true },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Business", businessSchema);