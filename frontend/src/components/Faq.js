import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // Moon icon for dark mode
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon for light mode

import { styled } from "@mui/system";

// Custom styled card with dynamic dark mode support
const StyledCard = styled(Card)(({ theme, darkMode }) => ({
  marginBottom: "16px",
  borderRadius: "16px",
  background: darkMode ? "#333" : "#ffffff",
  boxShadow: darkMode
    ? "8px 8px 16px #222, -8px -8px 16px #444"
    : "8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: darkMode
      ? "12px 12px 24px #222, -12px -12px 24px #444"
      : "12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff",
  },
}));

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const faqData = [
    {
      id: 1,
      question: "What are the initial costs of franchising?",
      answer:
        "The initial costs vary depending on the franchise brand, location, and setup requirements. Typically, it includes franchise fees, equipment, and initial inventory.",
    },
    {
      id: 2,
      question: "How do I choose the right franchise?",
      answer:
        "Consider your budget, interests, and market demand. Research the franchise's reputation, support system, and profitability.",
    },
    {
      id: 3,
      question: "What kind of support can I expect from the franchisor?",
      answer:
        "Franchisors usually provide training, marketing support, operational guidelines, and ongoing assistance to help you succeed.",
    },
    {
      id: 4,
      question: "What is the typical ROI for a franchise?",
      answer:
        "ROI depends on the franchise type, location, and management. Some franchises break even within a year, while others may take longer.",
    },
    {
      id: 5,
      question: "Can I operate multiple franchise units?",
      answer:
        "Yes, many franchisors allow multi-unit ownership if you meet their financial and operational requirements.",
    },
    {
      id: 6,
      question: "What are the common challenges in franchising?",
      answer:
        "Common challenges include high initial investment, strict operational guidelines, and dependency on the franchisor's brand reputation.",
    },
    {
      id: 7,
      question: "How long does it take to set up a franchise?",
      answer:
        "The setup time can vary from a few months to over a year, depending on the complexity of the franchise and location requirements.",
    },
    {
      id: 8,
      question: "What are the legal requirements for franchising?",
      answer:
        "Legal requirements include signing a franchise agreement, adhering to local business laws, and obtaining necessary licenses and permits.",
    },
    {
      id: 9,
      question: "Can I sell my franchise?",
      answer:
        "Yes, but you need to follow the terms of your franchise agreement, which may include getting approval from the franchisor.",
    },
    {
      id: 10,
      question: "What is a franchise disclosure document?",
      answer:
        "A franchise disclosure document (FDD) provides detailed information about the franchise, including fees, obligations, and performance history.",
    },
  ];

  const filteredFAQs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: darkMode ? "#121212" : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* Background theme with Q, A, &, and more symbols */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="h1"
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 100 + 100}px`,
                fontWeight: "bold",
                color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {["Q", "A", "&", "?", "!"][index % 5]}
            </Typography>
          </React.Fragment>
        ))}
      </Box>

      {/* Header with Logo, Title, and Dark Mode Toggle */}
      <AppBar
        position="static"
        style={{
          background: darkMode ? "#333" : "#1a73e8",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <img
            src="https://via.placeholder.com/100x50?text=FranchiseBridge+Logo" // Replace with your logo URL
            alt="FranchiseBridge Logo"
            style={{ width: "100px", height: "50px", marginRight: "10px" }}
          />
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: "bold", color: darkMode ? "#ffffff" : "#000000" }}>
            FranchiseBridge
          </Typography>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          align="center"
          style={{
            fontWeight: "bold",
            color: darkMode ? "#ffffff" : "#333",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Frequently Asked Questions
        </Typography>

        {/* Search Bar */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            background: darkMode ? "#333" : "#ffffff",
            borderRadius: "25px",
            padding: "10px 15px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SearchIcon style={{ color: darkMode ? "#ffffff" : "#666", marginRight: "10px" }} />
          <TextField
            fullWidth
            variant="standard"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: { color: darkMode ? "#ffffff" : "#000000" },
            }}
          />
        </Box>

        {/* FAQ List */}
        {filteredFAQs.map((faq) => (
          <StyledCard key={faq.id} darkMode={darkMode}>
            <CardContent>
              <Typography
                variant="h6"
                style={{ fontWeight: "600", color: darkMode ? "#ffffff" : "#444" }}
              >
                {faq.question}
              </Typography>
              {expandedId === faq.id && (
                <Typography style={{ marginTop: "12px", color: darkMode ? "#cccccc" : "#666" }}>
                  {faq.answer}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleExpand(faq.id)}
                style={{ color: darkMode ? "#ffffff" : "#666" }}
              >
                {expandedId === faq.id ? "Collapse" : "Expand"}
              </Button>
            </CardActions>
          </StyledCard>
        ))}

        {/* Support Us Section */}
        <Box
          style={{
            marginTop: "40px",
            textAlign: "center",
            background: darkMode ? "#333" : "#ffffff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: "bold", color: darkMode ? "#ffffff" : "#333" }}>
            Need Help? Support Us!
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px", color: darkMode ? "#cccccc" : "#666" }}>
            If you have any questions or need assistance, feel free to reach out to us at:
          </Typography>
          <Typography
            variant="h6"
            style={{
              marginTop: "10px",
              color: darkMode ? "#90caf9" : "#1a73e8",
              fontWeight: "bold",
            }}
          >
            support@franchisebridge.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQPage;