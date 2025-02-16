import { useState, useEffect } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Box,
  createTheme,
  ThemeProvider,
  Fade,
  Slide,
  IconButton,
  Avatar
} from '@mui/material';
import { Email, Phone, LinkedIn, Twitter, Instagram, Brightness4, Brightness7 } from '@mui/icons-material'; // Icons for footer and dark mode toggle
import { keyframes } from '@mui/system';
import Confetti from 'react-confetti'; // For the surprise page
import useSound from 'use-sound'; // For sound effects
import soundEffect from './background-sound.mp3'; // Add a sound file to your project

// Sample images for the slideshow
const slides = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwKqPI03K75iMuvHamtGb-Yc0us9DVvmo0XA&s',
  'https://image.slidesdocs.com/responsive-images/background/4k-animated-animation-of-blue-triangles-powerpoint-background_9fd795d206__960_540.jpg',
  'https://static.vecteezy.com/system/resources/thumbnails/023/886/037/small_2x/electric-dreamscape-neon-mountains-ai-generated-photo.jpeg',
];

// Sample images for team members
const teamMembers = [
  { name: 'Harshith Raju', image: 'https://via.placeholder.com/100' },
  { name: 'Tharunee', image: 'https://via.placeholder.com/100' },
  { name: 'Lakshitha', image: 'https://via.placeholder.com/100' },
  { name: 'Neelima', image: 'https://via.placeholder.com/100' },
  { name: 'Rajitha', image: 'https://via.placeholder.com/100' },
  { name: 'Tharun', image: 'https://via.placeholder.com/100' },
];

// Keyframes for moving icons
const moveIcons = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0) rotate(360deg); }
`;

// Create a custom theme
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#007bff', // Light blue for dark mode, blue for light mode
    },
    secondary: {
      main: mode === 'dark' ? '#f48fb1' : '#0056b3', // Pink for dark mode, darker blue for light mode
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f8f9fa', // Dark background for dark mode, light gray for light mode
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',   // Slightly lighter dark for dark mode, white for light mode
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#333333', // White text for dark mode, dark text for light mode
      secondary: mode === 'dark' ? '#b0b0b0' : '#666666', // Light gray text for dark mode, gray text for light mode
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
  },
});

const LandingPage = () => {
  const [navShadow, setNavShadow] = useState('0 2px 5px rgba(0,0,0,0.1)');
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null); // Track expanded card for "Read More"
  const [showSurprise, setShowSurprise] = useState(false); // For the surprise page
  const [playSound] = useSound(soundEffect); // Sound effect

  // Handle scroll for nav shadow and active section
  useEffect(() => {
    const handleScroll = () => {
      setNavShadow(window.scrollY > 50 
        ? '0 2px 10px rgba(0,0,0,0.1)' 
        : '0 2px 5px rgba(0,0,0,0.1)'
      );

      const sections = ['home', 'about', 'services', 'team'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleReadMore = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleSurprise = () => {
    setShowSurprise(true);
    playSound(); // Play sound effect
    setTimeout(() => setShowSurprise(false), 5000); // Hide surprise after 5 seconds
  };

  return (
    <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
      {/* Surprise Page */}
      {showSurprise && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <Typography variant="h1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            🎉 Surprise! 🎉
          </Typography>
        </Box>
      )}

      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'background.paper', 
          boxShadow: navShadow,
          color: 'text.primary',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img 
              src="https://via.placeholder.com/40" 
              alt="Logo" 
              style={{ borderRadius: '50%' }} 
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Franchise Bridge
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {['home', 'about', 'services', 'team'].map((item) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item)}
                sx={{
                  color: activeSection === item ? 'primary.main' : 'inherit',
                  textTransform: 'none',
                  '&:hover': { 
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            ))}
            <IconButton onClick={toggleDarkMode} sx={{ color: 'primary.main' }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button onClick={handleSurprise} variant="contained" color="secondary">
              Surprise Me!
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ pt: 15 }}>
        {/* Home Section with Triangle Shape Slideshow */}
        <Box id="home" sx={{ 
          position: 'relative',
          height: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 0)', // Triangle shape
          background: darkMode 
            ? 'linear-gradient(135deg, #121212 50%, #1e1e1e 50%)' 
            : 'linear-gradient(135deg, #f8f9fa 50%, #ffffff 50%)', // Gradient background
        }}>
          {/* Slideshow Background */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundImage: `url(${slides[currentSlide]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1s ease',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 0)', // Triangle shape
          }} />
          {/* Overlay */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 0,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0 0)', // Triangle shape
          }} />
          {/* Moving Icons Around the Triangle */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            overflow: 'hidden',
          }}>
            {[Email, Phone, LinkedIn, Twitter, Instagram].map((Icon, index) => (
              <Icon key={index} sx={{
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: '2rem',
                color: 'primary.main',
                animation: `${moveIcons} 5s infinite ${index}s`,
              }} />
            ))}
          </Box>
          {/* Content */}
          <Fade in={true} timeout={1000}>
            <Container maxWidth="md" sx={{ zIndex: 2 }}>
              <Typography variant="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
                Welcome to Franchise Bridge
              </Typography>
              <Typography sx={{ 
                fontSize: '1.2rem',
                lineHeight: 1.6,
                mb: 5
              }}>
                Uit velit est quam dolor ad a aliquid qui aliquid. Sequi es ut et est quarent sepul nihil
                ut aliquam. Occaeceiti alias dolorem mollitis ut. Similique es voluptatem. Esse
                doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 1,
                  backgroundColor: 'primary.main',
                  '&:hover': { 
                    backgroundColor: 'secondary.main',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                Read More
              </Button>
            </Container>
          </Fade>
        </Box>

        {/* About Section */}
        <Box id="about" sx={{ py: 10, px: 5, backgroundColor: 'background.paper' }}>
          <Slide in={true} direction="up" timeout={1000}>
            <Container>
              <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
                About Us
              </Typography>
              <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
                We are a team of dedicated professionals committed to helping businesses grow through franchising. Our mission is to bridge the gap between franchisors and franchisees.
              </Typography>
            </Container>
          </Slide>
        </Box>

        {/* Services Section */}
        <Box id="services" sx={{ py: 10, px: 5, backgroundColor: 'background.default' }}>
          <Container>
            <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
              Our Services
            </Typography>
            <Grid container spacing={4}>
              {['Nesciunt Mete', 'Eosie Commodi', 'Ledo Markt', 'Asperiores'].map((service, index) => (
                <Grid item xs={12} md={3} key={service}>
                  <Fade in={true} timeout={1000 + index * 500}>
                    <Card sx={{ 
                      textAlign: 'center',
                      p: 3,
                      boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
                      borderRadius: 2,
                      backgroundColor: 'background.paper',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }
                    }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                          {service}
                        </Typography>
                        {expandedCard === index ? (
                          <Typography sx={{ color: 'text.secondary', mt: 2 }}>
                            Additional details about {service}. This is a placeholder for more information.
                          </Typography>
                        ) : (
                          <Button 
                            onClick={() => handleReadMore(index)}
                            sx={{ 
                              mt: 2,
                              color: 'primary.main',
                              '&:hover': { 
                                color: 'secondary.main',
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s ease'
                              }
                            }}
                          >
                            Read More
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Team Section */}
        <Box id="team" sx={{ py: 10, px: 5, backgroundColor: 'background.paper' }}>
          <Slide in={true} direction="up" timeout={1000}>
            <Container>
              <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
                Our Team
              </Typography>
              <Grid container spacing={4}>
                {teamMembers.map((member, index) => (
                  <Grid item xs={12} md={4} key={member.name}>
                    <Fade in={true} timeout={1000 + index * 500}>
                      <Card sx={{ 
                        textAlign: 'center',
                        p: 3,
                        boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        backgroundColor: 'background.default',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }
                      }}>
                        <CardContent>
                          <Avatar 
                            src={member.image} 
                            alt={member.name} 
                            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                          />
                          <Typography variant="h6" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                            {member.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Slide>
        </Box>
      </Box>

      {/* Footer with Contact Section */}
      <Box component="footer" sx={{ 
        py: 10, 
        px: 5, 
        backgroundColor: 'background.default',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <Container>
          <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
            Contact Us
          </Typography>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            Reach out to us for any inquiries or collaborations.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
            <IconButton sx={{ color: 'primary.main' }}>
              <Email />
            </IconButton>
            <IconButton sx={{ color: 'primary.main' }}>
              <Phone />
            </IconButton>
            <IconButton sx={{ color: 'primary.main' }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: 'primary.main' }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: 'primary.main' }}>
              <Instagram />
            </IconButton>
          </Box>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.9rem' }}>
            © 2023 Franchise Bridge. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;