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
import { Business, Work, Apartment, Description, TrendingUp } from "@mui/icons-material";

const companyIcons = [Business, Work, Apartment, Description, TrendingUp];

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
      console.log("✅ Login Successful:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/homecom");
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const AnimatedIcon = companyIcons[activeIcon];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        backgroundColor: "#F5F7FA",
        overflow: "hidden",
      }}
    >
      {[...Array(25)].map((_, i) => {
        const Icon = companyIcons[i % companyIcons.length];
        return (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 30, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              color: "rgba(0, 0, 0, 0.3)",
            }}
          >
            <Icon sx={{ fontSize: 40 }} />
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
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} sx={{ textAlign: "center", pr: { md: 3 } }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }}>
                <AnimatedIcon sx={{ fontSize: 100, color: "#0B3D91" }} />
              </motion.div>
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2, color: "#0B3D91" }}>
                Company Portal
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "#333" }}>
                Securely access your company's dashboard, manage profiles, and track insights.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#0B3D91" }}>
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField label="Email" name="email" type="email" fullWidth required value={formData.email} onChange={handleChange} sx={{ mb: 3 }} />
                <TextField label="Password" name="password" type="password" fullWidth required value={formData.password} onChange={handleChange} sx={{ mb: 3 }} />
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
                    backgroundColor: "#143645",
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
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ textDecoration: "none", color: "#0B3D91", fontWeight: "bold" }}>
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

export default Logincmp;