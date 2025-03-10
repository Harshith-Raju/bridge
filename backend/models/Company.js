// models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: String, required: true },
});

module.exports = mongoose.model("Company", companySchema);