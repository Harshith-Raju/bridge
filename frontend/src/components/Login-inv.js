import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

// CSS keyframes for a moving gradient background
const movingBackground = {
  animation: `gradientShift 15s ease infinite`,
  background: "linear-gradient(45deg, #0B3D91, #1A237E, #DAA520)",
  backgroundSize: "400% 400%",
  "@keyframes gradientShift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
};

const Logininv = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the email and password match the specific admin credentials
    if (formData.email === "harshithraju2005@gmail.com" && formData.password === "1234") {
      console.log("✅ Admin login successful");
      alert("Admin login successful!");
      navigate("/adminhome1");
      return;
    }

    try {
      console.log("📤 Sending login request:", formData);
      const response = await api.post("/login", formData);
      console.log("✅ Login Successful:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  // Framer Motion variants for form and info box animations
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        ...movingBackground,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
          component={motion.div}
          initial="hidden"
          animate="visible"
          variants={containerVariant}
        >
          <Grid container spacing={4}>
            {/* Info/Attraction Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRight: { md: "1px solid #ccc" },
                textAlign: "center",
                pr: { md: 3 },
              }}
              component={motion.div}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Box
                component="img"
                src="https://via.placeholder.com/250x250.png?text=Official+Logo"
                alt="Official"
                sx={{ width: { xs: "150px", md: "200px" }, mb: 2, borderRadius: "50%" }}
              />
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#0B3D91" }}>
                Official Portal
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "#333" }}>
                Welcome to our official platform where you can securely manage your account,
                access exclusive content, and stay updated with the latest information.
              </Typography>
            </Grid>

            {/* Login Form Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                pl: { md: 3 },
              }}
              component={motion.div}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#0B3D91" }}
              >
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                />
                {error && (
                  <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: "center" }}>
                    {error}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    py: 1.5,
                    backgroundColor: "#DAA520",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#c5943b" },
                  }}
                >
                  Login
                </Button>
              </Box>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  <Link to="/forgot-password" style={{ textDecoration: "none", color: "#0B3D91" }}>
                    Forgot your password?
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "#0B3D91", fontWeight: "bold" }}
                  >
                    Register here
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Logininv;
