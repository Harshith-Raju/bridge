import React, { useState } from "react";
import api from "../api";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", formData); // Send data to backend
      console.log("Registration Success:", response.data);
      setSuccess("User registered successfully!");
      setError("");
    } catch (err) {
      console.error("Registration Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9fafb",
      padding: "20px",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      textAlign: "center",
    },
    heading: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2d3748",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#48bb78",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#38a169",
    },
    success: {
      color: "#38a169",
      fontSize: "14px",
      marginBottom: "10px",
    },
    error: {
      color: "#e53e3e",
      fontSize: "14px",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          {success && <p style={styles.success}>{success}</p>}
          {error && <p style={styles.error}>{error}</p>}
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
