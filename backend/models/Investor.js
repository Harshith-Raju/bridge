const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  profilePicture: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  preferredIndustry: { type: String, required: true },
  investmentBudgetMin: { type: Number, required: true },
  investmentBudgetMax: { type: Number, required: true },
  preferredLocation: { type: String, required: true },
  franchiseType: { type: String, required: true },
  educationalQualification: { type: String, required: true },
  professionalExperience: { type: String, required: true },
  previousFranchiseExperience: { type: String },
});

module.exports = mongoose.model("Investor", investorSchema);