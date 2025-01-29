import React, { useState } from "react";

const RegisterCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    establishYear: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate Establish Year
    const currentYear = new Date().getFullYear();
    if (
      formData.establishYear.length !== 4 || // Ensure it's exactly 4 digits
      formData.establishYear < 1800 ||
      formData.establishYear > currentYear
    ) {
      alert(`Establishment year must be a valid 4-digit year between 1800 and ${currentYear}.`);
      return;
    }

    // Show success alert and log data
    alert("Application submitted successfully!");
    console.log("Form Data:", formData);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f9",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#007bff",
          fontSize: "2rem",
          marginBottom: "20px",
        }}
      >
        Register Your Company
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Company Name */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Company Name:
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Establish Year */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Establish Year:
          </label>
          <input
            type="number"
            name="establishYear"
            value={formData.establishYear}
            onChange={handleChange}
            placeholder="Enter year in YYYY format"
            required
            min="1800"
            max={new Date().getFullYear()}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Phone Number */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Phone Number:
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;