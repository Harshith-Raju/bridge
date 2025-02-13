const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true }, // Index for faster lookups
  password: { type: String, required: true },
  resetOTP: { type: Number }, // OTP for resetting password
  resetOTPTimestamp: { type: Date }, // Timestamp when OTP was generated
});

// // ✅ Encrypt password before saving
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // ✅ Method to compare passwords (for login)
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// ✅ Automatically remove expired OTPs after 10 minutes
UserSchema.pre("save", function (next) {
  if (this.resetOTPTimestamp) {
    const expiryTime = 10 * 60 * 1000; // 10 minutes
    if (Date.now() - this.resetOTPTimestamp.getTime() > expiryTime) {
      this.resetOTP = undefined;
      this.resetOTPTimestamp = undefined;
    }
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
