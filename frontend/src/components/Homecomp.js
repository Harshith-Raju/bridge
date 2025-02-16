"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, IconButton, Button, Grow, Zoom, Fade, useTheme, useMediaQuery } from "@mui/material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import BusinessIcon from "@mui/icons-material/Business"
import GroupIcon from "@mui/icons-material/Group"
import CallIcon from "@mui/icons-material/Call"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"

const HomePageCom = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const images = [
    "https://images.vexels.com/media/users/3/149160/raw/a4321cc2519422a516b13816c0224845-intro-presentation-slide-template.jpg",
    "https://psycheducated.com/wp-content/uploads/2022/03/Inspirational-Quotes-About-Achieving-Goals-5-750x423.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      sx={{
        fontFamily: "Arial, sans-serif",
        background: darkMode ? "#1a1a1a" : "#f5f5f5",
        color: darkMode ? "#fff" : "#333",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Header */}
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
            backgroundColor: "#143654",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px 30px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src="https://via.placeholder.com/50" alt="Logo" style={{ width: "50px", marginRight: "15px" }} />
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
              Franchise <span style={{ color: "#ff6600" }}>Bridge</span>
            </Typography>
          </Box>

          {!isMobile && (
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              "Empowering Businesses, Connecting Visionaries"
            </Typography>
          )}

          <Box>
            <IconButton onClick={() => navigate("/notification")} sx={{ color: "#fff" }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/landingpage")} sx={{ color: "#fff" }}>
              <ExitToAppIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/registercom")} sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </IconButton>
            <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: "#fff" }}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Box>
      </Fade>

      {/* Slideshow Section */}
      <Box
        sx={{
          position: "relative",
          marginTop: "80px",
          height: "500px", // Increased height for the slideshow
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(20, 54, 84, 0.5)", // Semi-transparent overlay
              zIndex: 2,
            },
          }}
        >
          <img
            src={images[currentImage] || "/placeholder.svg"}
            alt="Slideshow"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Box>

      {/* Combined Three Boxes and About Us Section */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: darkMode ? "#2a2a2a" : "#f0f4f8", // Background for the three boxes section
          padding: "40px 20px",
        }}
      >
        {/* Animated Graph Bars Background */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "50px", // Height of the graph bars
            display: "flex",
            alignItems: "flex-end",
            gap: "2px",
            padding: "0 20px",
            zIndex: 0,
          }}
        >
          {Array.from({ length: 50 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                height: `${Math.random() * 50}px`, // Random height for variety
                backgroundColor: darkMode ? "#ffffff" : "#143645",
                animation: "rise 3s infinite ease-in-out",
                animationDelay: `${index * 0.1}s`, // Staggered animation
                "@keyframes rise": {
                  "0%": {
                    height: 0,
                  },
                  "50%": {
                    height: "50px",
                  },
                  "100%": {
                    height: 0,
                  },
                },
              }}
            />
          ))}
        </Box>

        {/* Three Boxes Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "40px 20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {[
            { text: "Register", icon: <BusinessIcon fontSize="large" />, route: "/registercom" },
            { text: "Investors List", icon: <GroupIcon fontSize="large" />, route: "/investors-list" },
            { text: "Contact Us", icon: <CallIcon fontSize="large" />, route: "/comoffer" },
          ].map((item, index) => (
            <Grow key={index} in={true} style={{ transformOrigin: "0 0 0" }} timeout={(index + 1) * 1000}>
              <Box
                sx={{
                  width: isMobile ? "100%" : "280px",
                  height: "220px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: darkMode ? "#444444" : "#ffffff", // Box background
                  color: darkMode ? "#ffffff" : "#143645", // Text color
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)", // Enlarge on hover
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => navigate(item.route)}
              >
                {item.icon}
                <Typography variant="h6" sx={{ marginTop: "10px" }}>
                  {item.text}
                </Typography>
              </Box>
            </Grow>
          ))}
        </Box>
      </Box>

      {/* About Us Section */}
      <Box
        sx={{
          backgroundColor: "#143654", // Background for the About Us section
          padding: "40px 20px",
        }}
      >
        {[
          {
            title: "About Us",
            content: "We bridge the gap between franchises and investors, enabling business growth worldwide.",
          },
          {
            title: "Our Achievements",
            content:
              '- Successfully connected over 500 franchises with investors.\n- Facilitated $100M+ in investments.\n- Recognized as the "Best Franchise Platform 2024".\n- Expanded operations to 10+ countries globally.',
          },
          {
            title: "Contact Us",
            content:
              "Email: info@franchisebridge.com\nPhone: +1 (123) 456-7890\nAddress: 123 Business St, Suite 456, New York, NY 10001",
          },
        ].map((section, index) => (
          <Fade key={index} in={true} timeout={(index + 1) * 1000}>
            <Box
              sx={{
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  padding: "20px",
                  borderRadius: "8px",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Typography variant="h4" sx={{ color: "#fff", marginBottom: "20px" }}>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "#fff", whiteSpace: "pre-line" }}>
                  {section.content}
                </Typography>
              </Box>
            </Box>
          </Fade>
        ))}
      </Box>

      {/* Floating Chatbot */}
      <Zoom in={true} timeout={2000}>
        <Button
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#143654",
            color: "white",
            borderRadius: "50px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#0f2a43",
              transform: "scale(1.05)",
            },
          }}
          startIcon={<SmartToyIcon />}
        >
          Chat with Us
        </Button>
      </Zoom>

      {/* Footer */}
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: darkMode ? "#2a2a2a" : "#e6e6e6",
            color: darkMode ? "#fff" : "#333",
            marginTop: "40px",
          }}
        >
          <Typography variant="body1">© 2025 Franchise Bridge | Building Business Connections Worldwide</Typography>
        </Box>
      </Fade>
    </Box>
  )
}

export default HomePageCom