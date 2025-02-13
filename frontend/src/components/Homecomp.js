import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import CallIcon from "@mui/icons-material/Call";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const HomePageCom = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const images = [
    "https://source.unsplash.com/1200x600/?business,corporate",
    "https://source.unsplash.com/1200x600/?startup,technology",
    "https://source.unsplash.com/1200x600/?success,finance",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        fontFamily: "'Poppins', sans-serif",
        background: darkMode ? "#1c1c1c" : "#f8f9fa",
        color: darkMode ? "#fff" : "#333",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          backgroundColor: darkMode ? "#222" : "#fff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 30px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#007bff" }}>
            Franchise <span style={{ color: "#ff6600" }}>Bridge</span>
          </Typography>
        </Box>

        {/* Icons */}
        <Box>
          <IconButton onClick={() => navigate("/notification")} sx={{ color: darkMode ? "#fff" : "#007bff" }}>
            <NotificationsIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => navigate("/landingpage")} sx={{ color: darkMode ? "#fff" : "#007bff" }}>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => navigate("/registercom")} sx={{ color: darkMode ? "#fff" : "#007bff" }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <LightModeIcon fontSize="large" sx={{ color: "#ffcc00" }} /> : <DarkModeIcon fontSize="large" sx={{ color: "#007bff" }} />}
          </IconButton>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "500px",
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          padding: "20px",
          borderBottomLeftRadius: "150px",
          borderBottomRightRadius: "150px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            Welcome to Franchise Bridge
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "10px" }}>
            Connecting visionaries to success
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              backgroundColor: "#ff6600",
              "&:hover": { backgroundColor: "#e65c00" },
            }}
            onClick={() => navigate("/registercom")}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "40px", padding: "0 20px" }}>
        {[
          { text: "Register", icon: <BusinessIcon fontSize="large" />, route: "/registercom" },
          { text: "Investors List", icon: <GroupIcon fontSize="large" />, route: "/investors-list" },
          { text: "Contact Us", icon: <CallIcon fontSize="large" />, route: "/contact" },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "300px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              backgroundColor: darkMode ? "#222" : "#fff",
              color: darkMode ? "#fff" : "#333",
              "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              cursor: "pointer",
            }}
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: "center", padding: "20px", backgroundColor: darkMode ? "#1c1c1c" : "#007bff", color: "#fff", marginTop: "40px" }}>
        <Typography variant="body1">© 2025 Franchise Bridge | Building Business Connections Worldwide</Typography>
      </Box>
    </Box>
  );
};

export default HomePageCom;
