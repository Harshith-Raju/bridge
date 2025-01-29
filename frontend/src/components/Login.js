import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Sending login request:", formData);

      const response = await api.post("/login", formData);

      console.log("✅ Login Successful:", response.data);

      // ✅ Store token in localStorage
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error("❌ Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <Link to="/forgot-password">Forgot your password?</Link>
      <p>
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
