import React, { useState } from "react";
import { TextField, Button, MenuItem, Container, Typography, Box } from "@mui/material";
import axios from 'axios';

const RegisterInvestor = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    description: "",
    location: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
    }
    if (!phonePattern.test(formData.phone)) {
      formErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:5000/api/investors', formData)
        .then(response => {
          alert("Investor Registered Successfully!");
          // Optionally reset the form
          setFormData({
            fullName: "",
            dob: "",
            email: "",
            phone: "",
            address: "",
            nationality: "",
            description: "",
            location: "",
          });
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Investor Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField name="fullName" label="Full Name" value={formData.fullName} onChange={handleInputChange} required />
        <TextField name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleInputChange} required />
        <TextField name="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} required error={!!errors.email} helperText={errors.email} />
        <TextField name="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleInputChange} required error={!!errors.phone} helperText={errors.phone} />
        <TextField name="address" label="Address (City, State, Country)" value={formData.address} onChange={handleInputChange} required />
        <TextField select name="nationality" label="Nationality" value={formData.nationality} onChange={handleInputChange} required>
          <MenuItem value="">Select Nationality</MenuItem>
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
          <MenuItem value="India">India</MenuItem>
        </TextField>
        <TextField name="location" label="Location" value={formData.location} onChange={handleInputChange} required />
        <TextField name="description" label="Your Description" multiline rows={3} value={formData.description} onChange={handleInputChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register Investor
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterInvestor;