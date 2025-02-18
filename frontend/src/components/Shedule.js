import React, { useState } from "react";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";

const ScheduleCall = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    ampm: "AM",
    timeZone: "UTC",
  });

  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setNotification("Call is scheduled and a confirmation email has been sent.");
      } else {
        console.error("Failed to submit form");
        setNotification("Failed to schedule the call. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  // Page background style
  const pageStyle = {
    backgroundColor: "#143645",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  };

  // Transparent form container style
  const containerStyle = {
    maxWidth: "800px",
    padding: "30px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
    position: "relative",
    zIndex: 1,
  };

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
    color: "white",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "transparent",
    color: "white",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "1px solid #007BFF",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
    color: "white",
  };

  // Floating phone icons component
  const FloatingPhoneIcons = () => {
    return (
      <Box sx={{ position: "absolute", width: "100%", height: "100vh", top: 0, left: 0 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 30, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.2 }}
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: "1.5rem",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            ☎
          </motion.div>
        ))}
      </Box>
    );
  };

  return (
    <div style={pageStyle}>
      {/* Floating phone icons in the background */}
      <FloatingPhoneIcons />

      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>Schedule a Call</h2>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px", color: "green" }}>
            <h3>Call Scheduled Successfully!</h3>
            <p>We will contact you on {formData.date} at {formData.time} {formData.ampm}.</p>
            <p>{notification}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" style={inputStyle} value={formData.name} onChange={handleChange} required />

            <label style={labelStyle}>Email</label>
            <input type="email" name="email" style={inputStyle} value={formData.email} onChange={handleChange} required />

            <label style={labelStyle}>Phone Number</label>
            <input type="tel" name="phone" style={inputStyle} value={formData.phone} onChange={handleChange} />

            <label style={labelStyle}>Select Date</label>
            <input type="date" name="date" style={inputStyle} value={formData.date} onChange={handleChange} required />

            <label style={labelStyle}>Select Time</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input type="number" name="time" min="1" max="12" style={{ ...inputStyle, flex: "1" }} value={formData.time} onChange={handleChange} required />
              <select name="ampm" style={{ ...inputStyle, flex: "1" }} value={formData.ampm} onChange={handleChange}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            <label style={labelStyle}>Time Zone</label>
            <select name="timeZone" style={inputStyle} value={formData.timeZone} onChange={handleChange}>
              <option value="UTC">UTC</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
              <option value="IST">IST (Indian Standard Time)</option>
            </select>

            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              Schedule Call
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ScheduleCall;