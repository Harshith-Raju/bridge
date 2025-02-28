import React, { useState, useEffect } from "react";
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
import {
  Business,
  Work,
  Apartment,
  Description,
  TrendingUp,
} from "@mui/icons-material";

// Icons array and their respective colors
const companyIcons = [
  { icon: Business, color: "#FF5733" }, // Red-Orange
  { icon: Work, color: "#33FF57" }, // Green
  { icon: Apartment, color: "#3380FF" }, // Blue
  { icon: Description, color: "#FF33D4" }, // Pink
  { icon: TrendingUp, color: "#FFD700" }, // Gold
];

const Logincmp = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [activeIcon, setActiveIcon] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % companyIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Sending login request:", formData);
      const response = await api.post("/login", formData);
      console.log("✅ signin Successful:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("signin successful!");
      navigate("/homecom");
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const AnimatedIcon = companyIcons[activeIcon].icon;
  const activeIconColor = companyIcons[activeIcon].color;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        backgroundColor: "#143645",
        overflow: "hidden",
      }}
    >
      {/* Floating Background Icons */}
      {[...Array(25)].map((_, i) => {
        const { icon: Icon, color } = companyIcons[i % companyIcons.length];
        return (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 30, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              color,
            }}
          >
            <Icon style={{ fontSize: 40 }} />
          </motion.div>
        );
      })}

      <Container maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent login block
          }}
        >
          <Grid container spacing={4}>
            {/* Animated Icon + Portal Info */}
            <Grid item xs={12} md={6} sx={{ textAlign: "center", pr: { md: 3 } }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }}>
                <AnimatedIcon sx={{ fontSize: 100, color: activeIconColor }} />
              </motion.div>
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, color: "#FFF" }}>
                Company Portal
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "#DDD" }}>
                Securely access your company's dashboard, manage profiles, and track insights.
              </Typography>
            </Grid>

            {/* Login Form */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#FFF" }}>
                signin
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
                  sx={{
                    mb: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "5px",
                    "& input": { color: "#000" },
                    "&:hover": { boxShadow: "0px 0px 10px #00A8E8" },
                  }}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    mb: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "5px",
                    "& input": { color: "#000" },
                    "&:hover": { boxShadow: "0px 0px 10px #00A8E8" },
                  }}
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
                    backgroundColor: "#00A8E8", // Updated to Blue
                    color: "#FFF", // Text color White
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#0D47A1" }, // Slightly lighter blue on hover
                  }}
                >
                  Signin
                </Button>
              </Box>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2">
                  <Link to="/forgot-password" style={{ textDecoration: "none", color: "#FFF" }}>
                    Forgot your password?
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#FFF" }}>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ textDecoration: "none", color: "#f5fafc", fontWeight: "bold" }}>
                    signup here
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

export default Logincmp;