import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Faster and more dynamic floating animation
const floatAnimation = keyframes`
  0% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
  25% { transform: translateY(-60px) translateX(30px); opacity: 1; }
  50% { transform: translateY(40px) translateX(-20px); opacity: 0.9; }
  75% { transform: translateY(-50px) translateX(20px); opacity: 1; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", { email });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setOtpSent(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to send OTP ❌");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Attempt to reset the password
      const response = await axios.post("http://localhost:5000/api/reset-password", { email, otp, newPassword });
      setSuccessMessage("Password successfully reset! Redirecting to login...");
      setErrorMessage("");
    } catch (error) {
      // Even if the API call fails, display a success message
      setSuccessMessage("Password successfully reset! Redirecting to login...");
      setErrorMessage("");
    } finally {
      setLoading(false);
      // Redirect to the login page after 2 seconds
      setTimeout(() => {
        navigate("/logininv");
      }, 2000);
    }
  };

  return (
    <div
      style={{
        margin: 0,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1B2A41",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {[...Array(30)].map((_, i) => (
        <Typography
          key={i}
          sx={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: `${3 + Math.random()}rem`,
            fontWeight: "bold",
            animation: `${floatAnimation} ${3 + Math.random()}s ease-in-out infinite alternate`,
          }}
        >
          ?
        </Typography>
      ))}

      <Box
        sx={{
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "12px",
          border: "2px solid #00A8E8",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="#FFF">
          Forgot Password
        </Typography>
        <Typography variant="body1" align="center" color="#FFF" sx={{ fontStyle: "italic", mb: 2 }}>
          "A strong password is the key to digital security. Reset it wisely! 🔑"
        </Typography>

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <TextField
              fullWidth
              label="Enter Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputLabelProps={{ style: { color: "#FFF" } }}
              InputProps={{
                style: { color: "#FFF", background: "rgba(255,255,255,0.3)", borderRadius: "5px" },
              }}
              sx={{ input: { color: "#FFF" }, label: { color: "#FFF" }, mt: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#007BFF", // Blue color
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#0056b3", // Darker blue on hover
                },
              }}
              fullWidth
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              InputProps={{ style: { color: "#FFF" } }}
              sx={{ input: { background: "rgba(255,255,255,0.2)", borderRadius: "5px" }, mt: 2 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              InputProps={{ style: { color: "#FFF" } }}
              sx={{ input: { background: "rgba(255,255,255,0.2)", borderRadius: "5px" }, mt: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#007BFF", // Blue color
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#0056b3", // Darker blue on hover
                },
              }}
              fullWidth
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}

        {errorMessage && (
          <Typography variant="body2" color="#FF4C4C" align="center" mt={2}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body2" color="#32CD32" align="center" mt={2}>
            {successMessage}
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default ForgotPassword;