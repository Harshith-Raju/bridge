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
  const [hoveredBox, setHoveredBox] = useState(null);
  const navigate = useNavigate();

  const images = [
    "https://source.unsplash.com/300x200/?business",
    "https://source.unsplash.com/300x200/?investment",
    "https://source.unsplash.com/300x200/?partnership",
    "https://source.unsplash.com/300x200/?growth",
    "https://source.unsplash.com/300x200/?startup",
    "https://source.unsplash.com/300x200/?success",
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
        fontFamily: "Arial, sans-serif",
        background: darkMode ? "#121212" : "linear-gradient(270deg, #f8f9fa, #e0e3eb)",
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
          backgroundColor: darkMode ? "#1c1c1c" : "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 30px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            style={{ width: "50px", marginRight: "15px" }}
          />
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#007bff" }}>
            Franchise <span style={{ color: "#ff6600" }}>Bridge</span>
          </Typography>
        </Box>

        {/* Tagline */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: darkMode ? "#fff" : "#007bff" }}>
          "Empowering Businesses, Connecting Visionaries"
        </Typography>

        {/* Icons */}
        <Box>
          <IconButton onClick={() => navigate("/notification")} sx={{ fontSize: "28px", color: darkMode ? "#fff" : "#007bff" }}>
            <NotificationsIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => navigate("/landingpage")} sx={{ fontSize: "28px", color: darkMode ? "#fff" : "#007bff" }}>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => navigate("/registercom")} sx={{ fontSize: "28px", color: darkMode ? "#fff" : "#007bff" }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ fontSize: "28px" }}>
            {darkMode ? <LightModeIcon fontSize="large" sx={{ color: "#ffcc00" }} /> : <DarkModeIcon fontSize="large" sx={{ color: "#333" }} />}
          </IconButton>
        </Box>
      </Box>

      {/* Slideshow */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "80px", padding: "20px" }}>
        <Box sx={{ height: "350px", width: "80%", borderRadius: "10px", overflow: "hidden" }}>
          <img src={images[currentImage]} alt="Slideshow" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
      </Box>

      {/* Three Boxes Section */}
     {/* Three Boxes Section */}
<Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px", padding: "0 20px" }}>
  {[
    { text: "Register", icon: <BusinessIcon fontSize="large" />, route: "/registercom" },
    
    { text: "Investors List", icon: <GroupIcon fontSize="large" />, route: "/investors-list" },
    { text: "Contact Us", icon: <CallIcon fontSize="large" />, route: "/contact" },
  ].map((item, index) => (
    <Box
      key={index}
      sx={{
        width: "280px",
        height: "220px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: darkMode ? "#1c1c1c" : "#fff",
        color: darkMode ? "#fff" : "#000",
        "&:hover": { transform: "scale(1.05)" },
      }}
      onMouseEnter={() => setHoveredBox(index)}
      onMouseLeave={() => setHoveredBox(null)}
      onClick={() => navigate(item.route)}
    >
      {item.icon}
      <Typography variant="h6" sx={{ marginTop: "10px" }}>{item.text}</Typography>
    </Box>
  ))}
</Box>


      {/* About Us Section with Collage */}
      <Box sx={{ textAlign: "center", padding: "40px 20px", backgroundColor: darkMode ? "#1c1c1c" : "#f8f9fa", marginTop: "30px" }}>
        <Typography variant="h4" sx={{ color: "#007bff" }}>About Us</Typography>
        <Typography variant="body1">
          We bridge the gap between franchises and investors, enabling business growth worldwide.
        </Typography>

        {/* Image Collage */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "20px" }}>
          {images.map((src, index) => (
            <img key={index} src={src} alt="Collage" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
          ))}
        </Box>
      </Box>

      {/* Floating Chatbot */}
      <Button
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "50px",
        }}
        startIcon={<SmartToyIcon />}
      >
        Chat with Us
      </Button>

      {/* Footer */}
      <Box sx={{ textAlign: "center", padding: "20px", backgroundColor: darkMode ? "#121212" : "#007bff", color: "#fff", marginTop: "40px" }}>
        <Typography variant="body1">© 2025 Franchise Bridge | Building Business Connections Worldwide</Typography>
      </Box>
    </Box>
  );
};

export default HomePageCom;