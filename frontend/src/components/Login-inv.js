import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";

const investorSymbols = ["💹", "📈", "💰", "🏦", "📊"];
const backgroundImages = [
  "/images/investor1.jpg",
  "/images/investor2.jpg",
  "/images/investor3.jpg",
  "/images/investor4.jpg",
];

const FloatingInvestors = () => {
  return (
    <Box sx={{ position: "absolute", width: "100%", height: "100vh", top: 0, left: 0 }}>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 30, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: "2rem",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          {investorSymbols[i % investorSymbols.length]}
        </motion.div>
      ))}
    </Box>
  );
};
const Logininv = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [activeSymbol, setActiveSymbol] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 4000);

    const symbolInterval = setInterval(() => {
      setActiveSymbol((prev) => (prev + 1) % investorSymbols.length);
    }, 3000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(symbolInterval);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check for specific admin credentials
      if (formData.email === "harshithraju2005@gmail.com" && formData.password === "1234") {
        // Navigate to admin home page
        navigate("/adminhome");
        return;
      }

      // Proceed with normal login for other users
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        backgroundColor: "#1B2A41",
        overflow: "hidden",
      }}
    >
      <FloatingInvestors />
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              backgroundImage: `url(${backgroundImages[bgIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "background-image 1s ease-in-out",
            }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }}>
              <Typography variant="h1" sx={{ fontSize: "4rem" }}>{investorSymbols[activeSymbol]}</Typography>
            </motion.div>
            <Typography variant="h4" sx={{ color: "#FFF", fontWeight: "bold", mt: 2 }}>
              Investor Portal
            </Typography>
            <Typography variant="body1" sx={{ color: "#FFF", textAlign: "center" }}>
              Explore the best investment opportunities and track your portfolio with ease.
            </Typography>
          </Box>

          <Box sx={{ flex: 1, p: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom color="#FFF">
              Investor Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField label="Email" name="email" fullWidth required value={formData.email} onChange={handleChange} sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "5px" }} />
              <TextField label="Password" name="password" type="password" fullWidth required value={formData.password} onChange={handleChange} sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "5px" }} />
              {error && <Typography variant="body2" color="error" sx={{ mb: 2 }}>{error}</Typography>}
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#007BFF", // Default blue color
                  color: "#FFF",
                  "&:hover": {
                    backgroundColor: "#0056b3", // Darker blue on hover
                  },
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
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Logininv;