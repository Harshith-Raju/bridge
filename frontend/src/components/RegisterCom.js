import React, { useState } from "react";
import axios from "axios";
import { FaBuilding, FaGlobe, FaEnvelope, FaPhone, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

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
    phoneNumber: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // Track current step
  const [errors, setErrors] = useState({}); // Track validation errors
  const totalSteps = 4; // Total number of steps

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for specific fields
    if (name === "investmentRange" || name === "franchiseFee" || name === "royaltyFee") {
      if (!/^\d*$/.test(value)) return; // Only allow digits
    }

    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateStep = () => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.companyName) newErrors.companyName = "Company Name is required.";
        if (!formData.industry) newErrors.industry = "Industry is required.";
        if (!formData.yearEstablished) newErrors.yearEstablished = "Year Established is required.";
        break;
      case 2:
        if (!formData.headquarters) newErrors.headquarters = "Headquarters is required.";
        if (!formData.website) newErrors.website = "Website is required.";
        if (!formData.franchiseName) newErrors.franchiseName = "Franchise Name is required.";
        break;
      case 3:
        if (!formData.franchiseDescription) newErrors.franchiseDescription = "Franchise Description is required.";
        if (!formData.investmentRange) newErrors.investmentRange = "Investment Range is required.";
        if (!formData.franchiseFee) newErrors.franchiseFee = "Franchise Fee is required.";
        break;
      case 4:
        if (!formData.royaltyFee) newErrors.royaltyFee = "Royalty Fee is required.";
        if (!formData.email) {
          newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Invalid email address.";
        }
        if (!formData.phoneNumber) {
          newErrors.phoneNumber = "Phone Number is required.";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = "Invalid phone number (10 digits required).";
        }
        if (!file) newErrors.file = "Financial document is required.";
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

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

  const progress = ((step - 1) / totalSteps) * 100; // Calculate progress percentage

  // Generate years for the "Year Established" dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.headingContainer}>
          <h2 style={styles.heading}>Bussiness Registration Form</h2>
        </div>
        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          {step === 1 && (
            <>
              <h3 style={styles.stepHeading}>Step 1: Company Information</h3>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Company Name</label>
                <div style={styles.inputContainer}>
                  <FaBuilding style={styles.icon} />
                  <input
                    type="text"
                    name="companyName"
                    placeholder="TechCorp Inc."
                    value={formData.companyName}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.companyName && <p style={styles.error}>{errors.companyName}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Industry</label>
                <div style={styles.inputContainer}>
                  <FaBuilding style={styles.icon} />
                  <input
                    type="text"
                    name="industry"
                    placeholder="Technology, Retail"
                    value={formData.industry}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.industry && <p style={styles.error}>{errors.industry}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Year Established</label>
                <div style={styles.inputContainer}>
                  <FaCalendarAlt style={styles.icon} />
                  <select
                    name="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.yearEstablished && <p style={styles.error}>{errors.yearEstablished}</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={styles.stepHeading}>Step 2: Location & Website</h3>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Headquarters</label>
                <div style={styles.inputContainer}>
                  <FaGlobe style={styles.icon} />
                  <input
                    type="text"
                    name="headquarters"
                    placeholder="New York, USA"
                    value={formData.headquarters}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.headquarters && <p style={styles.error}>{errors.headquarters}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Website</label>
                <div style={styles.inputContainer}>
                  <FaGlobe style={styles.icon} />
                  <input
                    type="text"
                    name="website"
                    placeholder="www.example.com"
                    value={formData.website}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.website && <p style={styles.error}>{errors.website}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Franchise Name</label>
                <div style={styles.inputContainer}>
                  <FaBuilding style={styles.icon} />
                  <input
                    type="text"
                    name="franchiseName"
                    placeholder="TechCorp Franchise"
                    value={formData.franchiseName}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.franchiseName && <p style={styles.error}>{errors.franchiseName}</p>}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 style={styles.stepHeading}>Step 3: Franchise Details</h3>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Franchise Description</label>
                <div style={styles.inputContainer}>
                  <FaBuilding style={styles.icon} />
                  <input
                    type="text"
                    name="franchiseDescription"
                    placeholder="Fast-growing tech franchise"
                    value={formData.franchiseDescription}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.franchiseDescription && <p style={styles.error}>{errors.franchiseDescription}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Investment Range</label>
                <div style={styles.inputContainer}>
                  <FaDollarSign style={styles.icon} />
                  <input
                    type="text"
                    name="investmentRange"
                    placeholder="50000 - 100000"
                    value={formData.investmentRange}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.investmentRange && <p style={styles.error}>{errors.investmentRange}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Franchise Fee</label>
                <div style={styles.inputContainer}>
                  <FaDollarSign style={styles.icon} />
                  <input
                    type="text"
                    name="franchiseFee"
                    placeholder="30000"
                    value={formData.franchiseFee}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.franchiseFee && <p style={styles.error}>{errors.franchiseFee}</p>}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3 style={styles.stepHeading}>Step 4: Financial & Contact Info</h3>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Royalty Fee</label>
                <div style={styles.inputContainer}>
                  <FaDollarSign style={styles.icon} />
                  <input
                    type="text"
                    name="royaltyFee"
                    placeholder="5"
                    value={formData.royaltyFee}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.royaltyFee && <p style={styles.error}>{errors.royaltyFee}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Email</label>
                <div style={styles.inputContainer}>
                  <FaEnvelope style={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="contact@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.email && <p style={styles.error}>{errors.email}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Phone Number</label>
                <div style={styles.inputContainer}>
                  <FaPhone style={styles.icon} />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="1234567890"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {errors.phoneNumber && <p style={styles.error}>{errors.phoneNumber}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Financial Documents</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={styles.fileInput}
                  required
                />
                {errors.file && <p style={styles.error}>{errors.file}</p>}
              </div>
            </>
          )}

          <div style={styles.buttonContainer}>
            {step > 1 && (
              <button type="button" onClick={handlePrevious} style={styles.button}>
                Previous
              </button>
            )}
            {step < totalSteps ? (
              <button type="button" onClick={handleNext} style={styles.button}>
                Next
              </button>
            ) : (
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: "url('https://www.transparenttextures.com/patterns/inspiration-geometry.png')",
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    animation: "moveBackground 10s linear infinite",
  },
  container: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  headingContainer: {
    backgroundColor: "#007BFF",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  heading: {
    color: "#ffffff",
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  progressBarContainer: {
    width: "100%",
    height: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007BFF",
    borderRadius: "5px",
    transition: "width 0.3s ease",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  stepHeading: {
    color: "#007BFF",
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "600",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
  },
  fieldContainer: {
    textAlign: "left",
  },
  fieldLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#007BFF",
    marginBottom: "5px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    color: "#007BFF",
    fontSize: "20px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  fileInput: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
  error: {
    color: "#ff0000",
    fontSize: "14px",
    marginTop: "5px",
  },
  message: {
    marginTop: "20px",
    color: "#007BFF",
    fontSize: "16px",
  },
};

export default RegisterCom;