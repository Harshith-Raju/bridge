import React, { useState } from "react";
import axios from "axios";

const RegisterBusiness = () => {
  const [formData, setFormData] = useState({
    title: "",
    registrationNumber: "",
    taxId: "",
    website: "",
    phoneNumber: "",
    financialDocuments: null, // File input
    isAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Save file object
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked }); // Handle checkbox
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("registrationNumber", formData.registrationNumber);
    formDataToSend.append("taxId", formData.taxId);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    if (formData.financialDocuments) {
      formDataToSend.append("financialDocuments", formData.financialDocuments);
    }
    formDataToSend.append("isAgreed", formData.isAgreed);

    try {
      const response = await axios.post("http://localhost:5000/api/businesses", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Business Registered Successfully!");
      console.log("Response:", response.data);
      setFormData({
        title: "",
        registrationNumber: "",
        taxId: "",
        website: "",
        phoneNumber: "",
        financialDocuments: null,
        isAgreed: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Error registering business.");
    }
  };

  return (
    <div style={{ width: "50%", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Register Your Business</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Business Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Registration Number:</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Tax ID:</label>
          <input type="text" name="taxId" value={formData.taxId} onChange={handleChange} required />
        </div>
        <div>
          <label>Website:</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div>
          <label>Upload Financial Document:</label>
          <input type="file" name="financialDocuments" accept=".pdf,.doc,.jpg,.png" onChange={handleChange} />
        </div>
        <div>
          <label>
            <input type="checkbox" name="isAgreed" checked={formData.isAgreed} onChange={handleChange} />
            I Agree to Terms & Conditions
          </label>
        </div>
        <button type="submit">Register Business</button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
