import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", { email });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setOtpSent(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to send OTP");
      setSuccessMessage("");
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/reset-password", { email, otp, newPassword });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to reset password");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Reset Password</button>
        </form>
      )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default ForgotPassword;
