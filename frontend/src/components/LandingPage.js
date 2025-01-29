import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const pageStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #f8fafc, #e2e8f0)",
      fontFamily: "'Arial', sans-serif",
      padding: "20px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#1a202c",
    },
    image: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      marginBottom: "20px",
      objectFit: "cover",
    },
    linkContainer: {
      display: "flex",
      gap: "15px",
      marginBottom: "30px",
    },
    link: {
      padding: "10px 20px",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "bold",
      color: "#fff",
      transition: "background-color 0.3s ease",
    },
    login: {
      backgroundColor: "#4299e1",
    },
    signup: {
      backgroundColor: "#48bb78",
    },
    about: {
      marginTop: "20px",
      textAlign: "center",
      color: "#4a5568",
    },
    footer: {
      marginTop: "50px",
      fontSize: "0.9rem",
      color: "#718096",
    },
  };

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.heading}>Welcome to Our App</h1>
      <img
        src="https://via.placeholder.com/200" // Replace this URL with an actual image from Google
        alt="Landing"
        style={pageStyles.image}
      />
      <div style={pageStyles.linkContainer}>
        <Link to="/login" style={{ ...pageStyles.link, ...pageStyles.login }}>
          Login
        </Link>
        <Link to="/signup" style={{ ...pageStyles.link, ...pageStyles.signup }}>
          Sign Up
        </Link>
      </div>
      <div style={pageStyles.about}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>About Us</h2>
        <p style={{ maxWidth: "600px", lineHeight: "1.6" }}>
          Our app is designed to help users manage their tasks, collaborate with teams, 
          and achieve their goals effortlessly. We believe in simplicity, efficiency, 
          and providing an excellent user experience.
        </p>
      </div>
      <footer style={pageStyles.footer}>
        © 2025 YourApp. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
