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
  Avatar,
} from '@mui/material';
import { Email, Phone, LinkedIn, Twitter, Instagram, Brightness4, Brightness7 } from '@mui/icons-material';
import { keyframes } from '@mui/system';
import useSound from 'use-sound';
import soundEffect from './background-sound.mp3';
import Chatbot from './chat'; // Import the Chatbot component

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
  { name: 'Lakshita', image: 'https://via.placeholder.com/100' },
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
      main: mode === 'dark' ? '#6a1b9a' : '#143645', // Purple for dark mode, original for light
    },
    secondary: {
      main: mode === 'dark' ? '#ffab40' : '#0056b3', // Orange for dark mode, original for light
    },
    background: {
      default: mode === 'dark' ? '#0a0a0a' : '#f8f9fa', // Very dark for dark mode
      paper: mode === 'dark' ? '#1a1a1a' : '#ffffff', // Slightly lighter than default for dark mode
    },
    text: {
      primary: mode === 'dark' ? '#e0e0e0' : '#000000', // Light gray for dark mode
      secondary: mode === 'dark' ? '#b0b0b0' : '#666666', // Lighter gray for dark mode
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
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)', // Subtle border for cards
          boxShadow: mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 2px 15px rgba(0, 0, 0, 0.1)', // Stronger shadow in dark mode
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1a1a1a' : '#ffffff', // Match paper background
        },
      },
    },
  },
});

const LandingPage = () => {
  const [navShadow, setNavShadow] = useState('0 2px 5px rgba(0,0,0,0.1)');
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [playSound] = useSound(soundEffect);

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
    }, 5000);
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

  return (
    <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'background.paper', 
          boxShadow: navShadow,
          color: 'text.primary',
          transition: 'box-shadow 0.3s ease, background-color 0.3s ease'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img 
              src="C:\Users\harsh\OneDrive\Desktop\fran logo.png"
              alt="Logo" 
              style={{ borderRadius: '50%' }} // Corrected syntax
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}>
              Franchise Bridge
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {['home', 'about', 'services', 'team'].map((item) => (
              <Button
                key={item}
                onClick={() => scrollToSection(item)}
                sx={{
                  color: activeSection === item ? 'primary.main' : (darkMode ? 'white' : 'inherit'),
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
            <IconButton onClick={toggleDarkMode} sx={{ color: darkMode ? 'white' : 'primary.main' }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button onClick={() => window.location.href = "/login1"} variant="contained" color="secondary">
              Sign In {/* Changed from Login to Sign In */}
            </Button>
            <Button onClick={() => window.location.href = "/signup"} variant="outlined" color="secondary">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ pt: 0 }}> {/* Adjusted padding to remove gap */}
        {/* Home Section with Rounded Rectangle Shape */}
        <Box id="home" sx={{ 
          position: 'relative',
          height: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          clipPath: 'inset(0% round 20px)', // Rounded rectangle shape
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
            clipPath: 'inset(0% round 20px)', // Rounded rectangle shape
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
            clipPath: 'inset(0% round 20px)', // Rounded rectangle shape
          }} />
          {/* Moving Icons Around the Rounded Rectangle */}
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
            <Container maxWidth="md" sx={{ zIndex:  2 }}>
              <Typography variant="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
              Welcome to Franchise Bridge – Your Gateway to Success!
              </Typography>
              <Typography sx={{ 
                fontSize: '1.2rem',
                lineHeight: 1.6,
                mb: 5
              }}>
                At Franchise Bridge, we connect ambitious entrepreneurs with the perfect business opportunities.
                 Whether you’re looking to start your own venture or expand an existing brand, we simplify the franchising journey by providing expert insights, trusted connections, and the right resources.
                 Our platform serves as a bridge between visionary business owners and aspiring franchisees, fostering partnerships that lead to long-term success.
              </Typography>
              {/* Removed Click Here button */}
            </Container>
          </Fade>
        </Box>

        {/* Video Section */}
<Box sx={{ display: 'flex', py: 10, px: 5, backgroundColor: 'background.paper' }}>
  <Box sx={{ flex: 1, pr: 2 }}>
    <iframe
      width="100%"
      height="315"
      src="https://www.youtube.com/embed/Kp-0AhgBiDg" // Replace with your YouTube embed URL
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </Box>
  <Box sx={{ flex: 1, pl: 2 }}>
    <Typography variant="h4" sx={{ mb: 2, color: darkMode ? '#ffffff' : 'text.primary' }}>
      About Our Services
    </Typography>
    <Typography sx={{ color: darkMode ? '#ffffff' : 'text.secondary' }}>
      We connect aspiring entrepreneurs with the right business opportunities by understanding their goals, budget, and interests.
      Our expert consultants provide insights and guidance to help you make informed decisions about franchising opportunities.
      We assist in understanding legal agreements, franchise fees, and financial planning to ensure a smooth investment process.
      Get access to strategic marketing solutions to promote your franchise and grow your brand effectively.
    </Typography>
  </Box>
</Box>

        {/* Opposite Video Section */}
<Box sx={{ display: 'flex', py: 10, px: 5, backgroundColor: 'background.default' }}>
  <Box sx={{ flex: 1, pr: 2 }}>
    <Typography variant="h4" sx={{ mb: 2, color: darkMode ? '#ffffff' : 'text.primary' }}>
      Our Mission
    </Typography>
    <Typography sx={{ color: darkMode ? '#ffffff' : 'text.secondary' }}>
      At Franchise Bridge, our mission is to empower aspiring entrepreneurs by connecting them with the right business opportunities.
      We aim to simplify the franchising process by providing expert guidance, resources, and support, ensuring a seamless journey from idea to ownership.
      We believe in fostering strong partnerships between business owners and franchise seekers, creating a thriving ecosystem of successful enterprises.
      Our goal is to make franchising accessible, transparent, and rewarding for everyone, helping businesses grow and entrepreneurs achieve their dreams.
    </Typography>
  </Box>
  <Box sx={{ flex: 1, pl: 2 }}>
    <iframe
      width="100%"
      style={{ aspectRatio: '16/9', border: 'none' }} // Responsive height and no border
      src="https://www.youtube.com/embed/Kp-0AhgBiDg" // Replace with your YouTube embed URL
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </Box>
</Box>

        {/* Advisors Section */}
        <Box sx={{ py: 10, px: 5, backgroundColor: 'background.paper' }}>
          <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'text.primary' }}>
            Our Advisors
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Avatar src="financial-advisor-image-url" alt="Financial Advisor" sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
                <Typography variant="h6">Financial Advisor</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Avatar src="legal-advisor-image-url" alt="Legal Advisor" sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
                <Typography variant="h6">Legal Advisor</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Services Section */}
        <Box id="services" sx={{ py: 10, px: 5, backgroundColor: 'background.default' }}>
          <Container>
            <Typography variant="h2" sx={{ mb: 4, textAlign : 'center', color: 'text.primary' }}>
              Our Services
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: 'Customer Support',
                  description: ' Whether you need help with your franchise application or have questions about our services, we are available 24/7 to help you.',
                },
                {
                  title: 'Legal Support',
                  description: '. Our legal experts assist with contract reviews, franchise agreements, and regulatory compliance to give you a legal support for any franchise.',
                },
                {
                  title: 'Financial Support',
                  description: 'Empowering your franchise journey with expert financial planning and investment strategies to ensure sustainable growth and success.',
                },
                {
                  title: 'Trusted Companies',
                  description: 'We partner with trusted and reputable companies . Our network includes industry leaders with proven track records of success.',
                },
              ].map((service, index) => (
                <Grid item xs={12} md={3} key={service.title}>
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
                          {service.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mt: 2 }}>
                          {service.description}
                        </Typography>
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
          {/* Contact Details with Icons */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              <Email sx={{ verticalAlign: 'middle', mr: 1 }} /> Email: harshithraju2005@gmail.com
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              <Phone sx={{ verticalAlign: 'middle', mr: 1 }} /> Contact No: 7013837019
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              <LinkedIn sx={{ verticalAlign: 'middle', mr: 1 }} /> LinkedIn: http://www.linkedin.com/in/harshithgrandhi
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 2 }}>
              <Instagram sx={{ verticalAlign: 'middle', mr: 1 }} /> Instagram: harshith__grandhi
            </Typography>
          </Box>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.9rem' }}>
            © 2023 Franchise Bridge. All rights reserved.
          </Typography>
        </Container>
      </Box>

      <Chatbot /> {/* Include the Chatbot component here */}
    </ThemeProvider>
  );
};

export default LandingPage;