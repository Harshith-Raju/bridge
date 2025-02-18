import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AccountBalance, Business, TrendingUp, Work, Apartment, Description } from '@mui/icons-material';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleCompanyLogin = () => {
    navigate('/Logincmp');
  };

  const handleInvestorLogin = () => {
    navigate('/Logininv');
  };

  // Icons and emojis for the floating background
  const floatingIcons = [
    { icon: Business, color: "#FF5733" }, // Red-Orange
    { icon: Work, color: "#33FF57" }, // Green
    { icon: Apartment, color: "#3380FF" }, // Blue
    { icon: Description, color: "#FF33D4" }, // Pink
    { icon: TrendingUp, color: "#FFD700" }, // Gold
    { icon: "💹", color: "#FF5733" }, // Emoji
    { icon: "📈", color: "#33FF57" }, // Emoji
    { icon: "💰", color: "#3380FF" }, // Emoji
    { icon: "🏦", color: "#FF33D4" }, // Emoji
    { icon: "📊", color: "#FFD700" }, // Emoji
  ];

  // Floating Icons Component
  const FloatingIcons = () => {
    return (
      <Box sx={{ position: "absolute", width: "100%", height: "100vh", top: 0, left: 0, overflow: "hidden" }}>
        {[...Array(30)].map((_, i) => {
          const { icon, color } = floatingIcons[i % floatingIcons.length];
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
                fontSize: typeof icon === 'string' ? '2rem' : '40px', // Adjust size for emojis and icons
              }}
            >
              {typeof icon === 'string' ? icon : React.createElement(icon, { style: { fontSize: 'inherit' } })}
            </motion.div>
          );
        })}
      </Box>
    );
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#143645',
      }}
    >
      <FloatingIcons />
      {/* Left side for Companies */}
      <Box
        component={motion.div}
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Transparent Box for Company */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
            backdropFilter: 'blur(10px)', // Blur effect
            borderRadius: '16px', // Rounded corners
            p: 4,
            width: '80%',
            maxWidth: '500px', // Set to match investor box
            border: '1px solid rgba(255, 255, 255, 0.2)', // Light border
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            For Companies
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Empower your business with our innovative platform. Connect with top investors and drive your growth.
          </Typography>
          <Button
            variant="contained"
            onClick={handleCompanyLogin}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '18px',
              backgroundColor: '#FFF',
              color: '#143645',
              borderRadius: '5px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            Company signin
          </Button>
        </Box>
      </Box>

      {/* Right side for Investors */}
      <Box
        component={motion.div}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Transparent Box for Investor */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
            backdropFilter: 'blur(10px)', // Blur effect
            borderRadius: '16px', // Rounded corners
            p: 4,
            width: '80%',
            maxWidth: '500px', // Set to match company box
            border: '1px solid rgba(255, 255, 255, 0.2)', // Light border
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            For Investors
          </Typography>
          <Typography variant="h6" sx={{ mb: 8 }}>
            Discover promising opportunities and connect with innovative companies ready to grow.
          </Typography>
          <Button
            variant="contained"
            onClick={handleInvestorLogin}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '18px',
              backgroundColor: '#FFF',
              color: '#143645',
              borderRadius: '5px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            Investor signin
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;