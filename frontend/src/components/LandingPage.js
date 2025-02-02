import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [darkTheme, setDarkTheme] = useState(false);

  const images = [
    "https://via.placeholder.com/600x300?text=Image+1",
    "https://via.placeholder.com/600x300?text=Image+2",
    "https://via.placeholder.com/600x300?text=Image+3",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div
      style={{
        ...styles.landingPage,
        backgroundColor: darkTheme ? "#1E1E2E" : "#F4F7FC",
        color: darkTheme ? "#EAEAEA" : "#1A1A1A",
      }}
    >
      <header
        style={{
          ...styles.header,
          backgroundColor: darkTheme ? "#282C34" : "#0056B3",
        }}
      >
        <h1 style={styles.siteName}>Franchise Bridge</h1>
        <button onClick={toggleTheme} style={styles.themeToggle}>
          {darkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </header>
      <div style={styles.logoQuote}>
        <div style={styles.logo}>
          <img
            src="https://files.oaiusercontent.com/file-KhDQZ5BPHzqQiXk1xoc4d2" // Updated logo
            alt="Website Logo"
            style={styles.logoImg}
          />
        </div>
        <p style={styles.quote}>
          "Connecting opportunities, building success."
        </p>
      </div>
      <div style={styles.slider}>
        <button onClick={prevImage} style={styles.sliderBtn}>&#8592;</button>
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          style={styles.sliderImage}
        />
        <button onClick={nextImage} style={styles.sliderBtn}>&#8594;</button>
      </div>
      <div style={styles.description}>
        <p>
          Franchise Bridge is your ultimate solution to discover, connect, and
          manage franchise opportunities. We help bridge the gap between
          aspiring entrepreneurs and established businesses looking to expand.
        </p>
        <p>
          Our mission is to empower individuals and businesses by providing a
          comprehensive platform for collaboration, innovation, and success.
        </p>
      </div>
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresHeading}>Why Choose Us?</h2>
        <ul style={styles.featuresList}>
          <li>Extensive database of franchise opportunities.</li>
          <li>Expert insights and guidance for franchise selection.</li>
          <li>Networking opportunities with industry leaders.</li>
          <li>Interactive tools for decision-making and planning.</li>
        </ul>
      </div>
      <div style={styles.loginButton}>
        <button
          onClick={() => (window.location.href = "/login1")}
          style={styles.loginButtonStyle}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const styles = {
  landingPage: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    padding: "20px",
    lineHeight: "1.6",
    minHeight: "100vh",
    overflowY: "scroll",
    transition: "background-color 0.3s, color 0.3s",
  },
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  siteName: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  themeToggle: {
    position: "absolute",
    left: "20px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#fff",
    color: "#007BFF",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    transition: "background-color 0.3s, color 0.3s",
  },
  logoQuote: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "120px 0 30px",
  },
  logo: {
    marginRight: "20px",
  },
  logoImg: {
    width: "250px",
    height: "auto",
    borderRadius: "20px",
  },
  quote: {
    fontStyle: "italic",
    fontSize: "1.5rem",
  },
  slider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "30px",
  },
  sliderBtn: {
    fontSize: "2rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#0056B3",
    margin: "0 10px",
  },
  sliderImage: {
    width: "600px",
    height: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  description: {
    marginBottom: "30px",
    fontSize: "1.2rem",
    padding: "0 20px",
  },
  featuresSection: {
    marginBottom: "30px",
  },
  featuresHeading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  featuresList: {
    listStyleType: "disc",
    textAlign: "left",
    margin: "0 auto",
    maxWidth: "600px",
    paddingLeft: "20px",
    fontSize: "1rem",
  },
  loginButton: {
    marginTop: "30px",
  },
  loginButtonStyle: {
    fontSize: "1.2rem",
    padding: "15px 30px",
    backgroundColor: "#0056B3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default LandingPage;