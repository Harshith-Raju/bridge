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
import { keyframes } from "@emotion/react";

// Floating animation for investor-related symbols
const floatAnimation = keyframes`
  0% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
  25% { transform: translateY(-60px) translateX(30px); opacity: 1; }
  50% { transform: translateY(40px) translateX(-20px); opacity: 0.9; }
  75% { transform: translateY(-50px) translateX(20px); opacity: 1; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
`;

const investorSymbols = ["💹", "📈", "💰", "🏦", "📊"];

const Logininv = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "harshithraju2005@gmail.com" && formData.password === "1234") {
      alert("Admin login successful!");
      navigate("/adminhome");
      return;
    }
    try {
      const response = await api.post("/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
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
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: `${2 + Math.random()}rem`,
            fontWeight: "bold",
            animation: `${floatAnimation} ${3 + Math.random()}s ease-in-out infinite alternate`,
          }}
        >
          {investorSymbols[i % investorSymbols.length]}
        </Typography>
      ))}
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)" }}>
          <Typography variant="h4" gutterBottom color="#FFF">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              sx={{
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "5px",
                '& input': { color: "#000" },
                '&:hover': { boxShadow: "0px 0px 10px #00A8E8" },
                '& .MuiInputLabel-root': { opacity: formData.email ? 0 : 1, transition: "opacity 0.3s" }
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
                mb: 2,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "5px",
                '& input': { color: "#000" },
                '&:hover': { boxShadow: "0px 0px 10px #00A8E8" },
                '& .MuiInputLabel-root': { opacity: formData.password ? 0 : 1, transition: "opacity 0.3s" }
              }}
            />
            {error && <Typography variant="body2" color="error" sx={{ mb: 2 }}>{error}</Typography>}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#00A8E8",
                color: "#FFF",
                transition: "all 0.3s",
                '&:hover': { backgroundColor: "#0077B6", transform: "scale(1.05)" },
              }}
            >
              Login
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <Link to="/forgot-password" style={{ color: "#FFF" }}>Forgot your password?</Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Don't have an account? <Link to="/signup" style={{ color: "#FFF" }}>Register here</Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Logininv;