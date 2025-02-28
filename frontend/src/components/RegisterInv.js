import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaMoneyBillAlt } from "react-icons/fa";

const RegisterInvestor = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    nationality: "",
    profilePicture: null,
    email: "",
    phone: "",
    address: "",
    preferredIndustry: "",
    investmentBudgetMin: "",
    investmentBudgetMax: "",
    preferredLocation: "",
    franchiseType: "",
    educationalQualification: "",
    previousFranchiseExperience: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [stepErrors, setStepErrors] = useState({}); // Track errors for each step
  const totalSteps = 4; // Total number of steps

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Allow only numbers for investment budget fields
    if (name === "investmentBudgetMin" || name === "investmentBudgetMax") {
      if (!/^\d*$/.test(value)) return; // Only allow digits
    }

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Clear errors when user starts typing
    if (stepErrors[name]) {
      setStepErrors({ ...stepErrors, [name]: "" });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Full Name is required.";
        if (!formData.dob) newErrors.dob = "Date of Birth is required.";
        if (!formData.gender) newErrors.gender = "Gender is required.";
        if (!formData.nationality) newErrors.nationality = "Nationality is required.";
        if (!formData.profilePicture) newErrors.profilePicture = "Profile Picture is required.";
        break;
      case 2:
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.phone) newErrors.phone = "Phone Number is required.";
        if (!formData.address) newErrors.address = "Address is required.";
        break;
      case 3:
        if (!formData.preferredIndustry) newErrors.preferredIndustry = "Preferred Industry is required.";
        if (!formData.investmentBudgetMin) newErrors.investmentBudgetMin = "Minimum Investment Budget is required.";
        if (!formData.investmentBudgetMax) newErrors.investmentBudgetMax = "Maximum Investment Budget is required.";
        if (!formData.preferredLocation) newErrors.preferredLocation = "Preferred Location is required.";
        if (!formData.franchiseType) newErrors.franchiseType = "Franchise Type is required.";
        break;
      case 4:
        if (!formData.educationalQualification) newErrors.educationalQualification = "Educational Qualification is required.";
        break;
      default:
        break;
    }
    setStepErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const data = new FormData();

    // Append all fields to FormData
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/investors", {
        method: "POST",
        body: data, // Sending FormData
      });

      const responseData = await response.json(); // Parse response JSON

      if (response.ok) {
        alert("Registration successful! You will receive a confirmation email.");
        setStep(1);
        setFormData({
          fullName: "",
          dob: "",
          gender: "",
          nationality: "",
          profilePicture: null,
          email: "",
          phone: "",
          address: "",
          preferredIndustry: "",
          investmentBudgetMin: "",
          investmentBudgetMax: "",
          preferredLocation: "",
          franchiseType: "",
          educationalQualification: "",
          previousFranchiseExperience: "",
        });
      } else {
        setErrorMessage(responseData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please check your internet connection and try again.");
    }
  };

  const progress = ((step - 1) / totalSteps) * 100; // Calculate progress percentage

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.headingContainer}>
          <h1 style={styles.heading}>Franchise Investor Registration Form</h1>
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>} {/* Show error message */}

        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }}></div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {step === 1 && (
            <div>
              <h2 style={styles.stepHeading}>Step 1: Personal Information</h2>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Full Name</label>
                <div style={styles.inputContainer}>
                  <FaUser style={styles.icon} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.fullName && <p style={styles.error}>{stepErrors.fullName}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Date of Birth</label>
                <div style={styles.inputContainer}>
                  <FaUser style={styles.icon} />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.dob && <p style={styles.error}>{stepErrors.dob}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Gender</label>
                <div style={styles.inputContainer}>
                  <FaUser style={styles.icon} />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {stepErrors.gender && <p style={styles.error}>{stepErrors.gender}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Nationality</label>
                <div style={styles.inputContainer}>
                  <FaUser style={styles.icon} />
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.nationality && <p style={styles.error}>{stepErrors.nationality}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Profile Picture</label>
                <div style={styles.profilePictureContainer}>
                  {formData.profilePicture && (
                    <img
                      src={URL.createObjectURL(formData.profilePicture)}
                      alt="Profile"
                      style={styles.profilePicture}
                    />
                  )}
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    accept="image/*"
                    style={styles.fileInput}
                    required
                  />
                </div>
                {stepErrors.profilePicture && <p style={styles.error}>{stepErrors.profilePicture}</p>}
              </div>
              <div style={styles.buttonContainer}>
                <button type="button" onClick={nextStep} style={styles.button}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={styles.stepHeading}>Step 2: Contact Information</h2>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Email Address</label>
                <div style={styles.inputContainer}>
                  <FaEnvelope style={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.email && <p style={styles.error}>{stepErrors.email}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Phone Number</label>
                <div style={styles.inputContainer}>
                  <FaPhone style={styles.icon} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.phone && <p style={styles.error}>{stepErrors.phone}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Address</label>
                <div style={styles.inputContainer}>
                  <FaMapMarkerAlt style={styles.icon} />
                  <input
                    type="text"
                    name="address"
                    placeholder="City, State, Country"
                    value={formData.address}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.address && <p style={styles.error}>{stepErrors.address}</p>}
              </div>
              <div style={styles.buttonContainer}>
                <button type="button" onClick={prevStep} style={styles.button}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} style={styles.button}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={styles.stepHeading}>Step 3: Investment Preferences</h2>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Preferred Industry</label>
                <div style={styles.inputContainer}>
                  <FaBriefcase style={styles.icon} />
                  <input
                    type="text"
                    name="preferredIndustry"
                    placeholder="Technology, Retail, etc."
                    value={formData.preferredIndustry}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.preferredIndustry && <p style={styles.error}>{stepErrors.preferredIndustry}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Minimum Investment Budget</label>
                <div style={styles.inputContainer}>
                  <FaMoneyBillAlt style={styles.icon} />
                  <input
                    type="text"
                    name="investmentBudgetMin"
                    placeholder="50000"
                    value={formData.investmentBudgetMin}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.investmentBudgetMin && <p style={styles.error}>{stepErrors.investmentBudgetMin}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Maximum Investment Budget</label>
                <div style={styles.inputContainer}>
                  <FaMoneyBillAlt style={styles.icon} />
                  <input
                    type="text"
                    name="investmentBudgetMax"
                    placeholder="100000"
                    value={formData.investmentBudgetMax}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.investmentBudgetMax && <p style={styles.error}>{stepErrors.investmentBudgetMax}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Preferred Location</label>
                <div style={styles.inputContainer}>
                  <FaMapMarkerAlt style={styles.icon} />
                  <input
                    type="text"
                    name="preferredLocation"
                    placeholder="City, State, Country"
                    value={formData.preferredLocation}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
                {stepErrors.preferredLocation && <p style={styles.error}>{stepErrors.preferredLocation}</p>}
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Franchise Type</label>
                <div style={styles.inputContainer}>
                  <FaBriefcase style={styles.icon} />
                  <select
                    name="franchiseType"
                    value={formData.franchiseType}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Franchise Type</option>
                    <option value="single-unit">Single Unit</option>
                    <option value="multi-unit">Multi-Unit</option>
                    <option value="master-franchise">Master Franchise</option>
                  </select>
                </div>
                {stepErrors.franchiseType && <p style={styles.error}>{stepErrors.franchiseType}</p>}
              </div>
              <div style={styles.franchiseTypeExplanation}>
                <h4>Franchise Type Explanation:</h4>
                <ul>
                  <li>
                    <strong>Single Unit:</strong> You own and operate one franchise location.
                  </li>
                  <li>
                    <strong>Multi-Unit:</strong> You own and operate multiple franchise locations in a specific area.
                  </li>
                  <li>
                    <strong>Master Franchise:</strong> You have the rights to develop and sub-franchise in a specific region.
                  </li>
                </ul>
              </div>
              <div style={styles.buttonContainer}>
                <button type="button" onClick={prevStep} style={styles.button}>
                  Previous
                </button>
                <button type="button" onClick={nextStep} style={styles.button}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={styles.stepHeading}>Step 4: Background and Experience</h2>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Educational Qualification</label>
                <div style={styles.inputContainer}>
                  <FaGraduationCap style={styles.icon} />
                  <select
                    name="educationalQualification"
                    value={formData.educationalQualification}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Educational Qualification</option>
                    <option value="pre-metric">Pre-Metric (High School)</option>
                    <option value="post-metric">Post-Metric (Diploma/Certificate)</option>
                    <option value="undergraduate">Undergraduate (Bachelor's Degree)</option>
                    <option value="postgraduate">Postgraduate (Master's Degree or Higher)</option>
                  </select>
                </div>
                {stepErrors.educationalQualification && <p style={styles.error}>{stepErrors.educationalQualification}</p>}
              </div>
              <div style={styles.educationalQualificationExplanation}>
                <h4>Educational Qualification Explanation:</h4>
                <ul>
                  <li>
                    <strong>Pre-Metric:</strong> High school education or equivalent.
                  </li>
                  <li>
                    <strong>Post-Metric:</strong> Diploma or certificate courses after high school.
                  </li>
                  <li>
                    <strong>Undergraduate:</strong> Bachelor's degree or equivalent.
                  </li>
                  <li>
                    <strong>Postgraduate:</strong> Master's degree or higher.
                  </li>
                </ul>
              </div>
              <div style={styles.fieldContainer}>
                <label style={styles.fieldLabel}>Previous Franchise Experience</label>
                <div style={styles.inputContainer}>
                  <FaBriefcase style={styles.icon} />
                  <input
                    type="text"
                    name="previousFranchiseExperience"
                    placeholder="Managed 2 franchises in Retail"
                    value={formData.previousFranchiseExperience}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.buttonContainer}>
                <button type="button" onClick={prevStep} style={styles.button}>
                  Previous
                </button>
                <button type="submit" style={styles.button}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
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
  profilePictureContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  profilePicture: {
    width: "100px",
    height: "100px",
    borderRadius: "50%", // Oval shape
    objectFit: "cover",
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
  franchiseTypeExplanation: {
    marginTop: "10px",
    textAlign: "left",
    color: "#555",
  },
  educationalQualificationExplanation: {
    marginTop: "10px",
    textAlign: "left",
    color: "#555",
  },
};

export default RegisterInvestor;