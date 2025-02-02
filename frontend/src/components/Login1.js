import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleCompanyLogin = () => {
    navigate('/Logincmp');
  };

  const handleInvestorLogin = () => {
    navigate('/Logininv');
  };

  // Replace these URLs with your own background images
  const companyBgImage = 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80';
  const investorBgImage = 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80';

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
      }}
    >
      {/* Left side for Companies */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${companyBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
        }}
      >
        {/* Optional dark overlay for better text contrast */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '80%' }}>
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
              backgroundColor: '#DAA520',
              color: '#fff',
              borderRadius: '5px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#c5943b' },
            }}
          >
            Company Login
          </Button>
        </Box>
      </Box>

      {/* Right side for Investors */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${investorBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
        }}
      >
        {/* Optional dark overlay for better text contrast */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '80%' }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            For Investors
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Discover promising opportunities and connect with innovative companies ready to grow.
          </Typography>
          <Button
            variant="contained"
            onClick={handleInvestorLogin}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '18px',
              backgroundColor: '#DAA520',
              color: '#fff',
              borderRadius: '5px',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#c5943b' },
            }}
          >
            Investor Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
