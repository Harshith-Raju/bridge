import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FaSun, FaMoon } from "react-icons/fa";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { motion, AnimatePresence } from "framer-motion";

// Replace these URLs with your preferred 4K HD image URLs
const slideshowImages = [
 "https://www.shutterstock.com/image-photo/do-more-repeat-motivational-quotes-600nw-1935432616.jpg",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=3840&q=80",
  "https://images.unsplash.com/photo-1544764200-d834fd210a23?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW90aXZhdGlvbmFsfGVufDB8fDB8fHww",
];

// Utility function for smooth scrolling to sections
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const LandingPage = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cycle through slideshow images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setDarkTheme((prev) => !prev);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  // Royal-style color palette (adjusted for a more classic look)
  const themeColors = {
    headerBg: darkTheme ? "#1A1A1A" : "#0B3D91",
    headerText: darkTheme ? "#F8F8FF" : "#FFFFFF",
    bodyBg: darkTheme ? "#0A192F" : "#FFFFFF",
    text: darkTheme ? "#FFFFFF" : "#333333",
    accent: darkTheme ? "#F0C987" : "#DAA520", // Light gold vs gold
  };

  // Variants for scroll-triggered animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: themeColors.bodyBg,
        color: themeColors.text,
        position: "relative",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      <CssBaseline />

      {/* ===== Header with Logo and Navigation ===== */}
      <AppBar
        position="fixed"
        sx={{
          background: themeColors.headerBg,
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          transition: "background 0.3s ease",
        }}
      >
        <Toolbar>
          {/* Logo Image */}
          <Box
            component="img"
            src="https://via.placeholder.com/40x40.png?text=Logo"
            alt="Logo"
            sx={{ mr: 2, borderRadius: "50%", border: `2px solid ${themeColors.accent}` }}
          />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              letterSpacing: "0.5px",
              color: themeColors.headerText,
            }}
            onClick={() => scrollToSection("home")}
          >
            Franchise Bridge
          </Typography>
          {/* Navigation links for larger screens */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {["home", "about", "features", "contact"].map((section) => (
              <Button
                key={section}
                color="inherit"
                onClick={() => scrollToSection(section)}
                sx={{ fontWeight: "bold" }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
            <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
              {darkTheme ? <FaSun /> : <FaMoon />}
            </IconButton>
          </Box>
          {/* Mobile menu */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkTheme ? <FaSun /> : <FaMoon />}
            </IconButton>
            <Button onClick={toggleDrawer} color="inherit">
              Menu
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250, backgroundColor: darkTheme ? "#1A1A1A" : "#FFFFFF" }}>
          {["Home", "About", "Features", "Contact"].map((text) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                scrollToSection(text.toLowerCase());
                toggleDrawer();
              }}
            >
              <ListItemText primary={text} sx={{ color: darkTheme ? "#FFFFFF" : "#000000" }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ===== Hero Section with Automated Slideshow ===== */}
      <Box id="home" sx={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${slideshowImages[currentSlide]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>
        {/* Overlay for content */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
        {/* Hero Content */}
        <Container
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#FFFFFF",
            px: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, letterSpacing: "1px" }}>
              Connecting Opportunities, Building Success
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Discover and manage franchise opportunities with ease.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => (window.location.href = "/login1")}
              sx={{
                backgroundColor: themeColors.accent,
                color: "#FFFFFF",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                "&:hover": {
                  backgroundColor: darkTheme ? "#e0b270" : "#c5943b",
                },
              }}
            >
              Get Started
            </Button>
          </motion.div>
          {/* Scroll Down Arrow */}
 <Box sx={{ position: "absolute", bottom: 20, cursor: "pointer" }} onClick={() => scrollToSection("about")}>
            <ArrowDownwardIcon sx={{ color: "#FFFFFF", fontSize: 40 }} />
          </Box>
        </Container>
      </Box>

      {/* ===== About Section (Scroll-triggered Animation) ===== */}
      <Container id="about" sx={{ py: 8 }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}>
            About Us
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: darkTheme ? "#1A1A1A" : "#F0F0F0",
                }}
              >
                <Typography variant="body1">
                  Franchise Bridge is your trusted partner in discovering the best franchise opportunities. With an extensive database and expert insights, we help entrepreneurs and established businesses connect and grow together.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: darkTheme ? "#1A1A1A" : "#F0F0F0",
                }}
              >
                <Typography variant="body1">
                  Our platform offers interactive tools, personalized recommendations, and in-depth market analyses to ensure you make informed decisions. Join us on a journey of growth and success.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* ===== Features Section (Scroll-triggered Animation) ===== */}
      <Container id="features" sx={{ py: 8, backgroundColor: darkTheme ? "#0A192F" : "#F7F7F7" }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}>
            Features
          </Typography>
          <Grid container spacing={4}>
            {[
              "Extensive Franchise Database",
              "Expert Guidance & Insights",
              "Interactive Tools",
              "Networking Opportunities",
            ].map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      backgroundColor: darkTheme ? "#1A1A1A" : "#FFFFFF",
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      {feature.split(" ")[0]}
                    </Typography>
                    <Typography variant="body2">{feature}</Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* ===== Contact Section (Scroll-triggered Animation) ===== */}
      <Container id="contact" sx={{ py: 8 }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: "bold" }}>
            Contact Us
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  backgroundColor: darkTheme ? "#1A1A1A" : "#F0F0F0",
                }}
              >
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Have questions or need assistance? Reach out to us!
                </Typography>
                <Typography variant="body2">Email: support@franchisebridge.com</Typography>
                <Typography variant="body2">Phone: +1 (555) 123-4567</Typography>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* ===== Footer ===== */}
      <Box
        component="footer"
        sx={{
          backgroundColor: themeColors.headerBg,
          color: themeColors.headerText,
          textAlign: "center",
          py: 3,
          mt: 4,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Franchise Bridge. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;