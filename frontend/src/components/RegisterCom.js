import React, { useState } from "react";
import axios from "axios";

const RegisterCom = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    yearEstablished: "",
    headquarters: "",
    website: "",
    franchiseName: "",
    franchiseDescription: "",
    investmentRange: "",
    franchiseFee: "",
    royaltyFee: "",
    email: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (file) {
      data.append("financialDocuments", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/businesses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Business registered! Awaiting admin approval.");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage("Error registering business.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "50%", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Register Business</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input type="text" name="industry" placeholder="Industry" onChange={handleChange} required />
        <input type="text" name="yearEstablished" placeholder="Year Established" onChange={handleChange} required />
        <input type="text" name="headquarters" placeholder="Headquarters" onChange={handleChange} required />
        <input type="text" name="website" placeholder="Website" onChange={handleChange} required />
        <input type="text" name="franchiseName" placeholder="Franchise Name" onChange={handleChange} required />
        <input type="text" name="franchiseDescription" placeholder="Franchise Description" onChange={handleChange} required />
        <input type="text" name="investmentRange" placeholder="Investment Range" onChange={handleChange} required />
        <input type="text" name="franchiseFee" placeholder="Franchise Fee" onChange={handleChange} required />
        <input type="text" name="royaltyFee" placeholder="Royalty Fee" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterCom;