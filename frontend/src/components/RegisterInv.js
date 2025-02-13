import React, { useState } from "react";

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
    professionalExperience: "",
    previousFranchiseExperience: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append all fields to FormData
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/investor", {
        method: "POST",
        body: data, // FormData is sent as the body
      });

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
          professionalExperience: "",
          previousFranchiseExperience: "",
        });
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Investor Registration</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Personal Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
            />
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Contact Information</h2>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address (City, State, Country)"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Investment Preferences</h2>
            <input
              type="text"
              name="preferredIndustry"
              placeholder="Preferred Industry/Category"
              value={formData.preferredIndustry}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="investmentBudgetMin"
              placeholder="Minimum Investment Budget"
              value={formData.investmentBudgetMin}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="investmentBudgetMax"
              placeholder="Maximum Investment Budget"
              value={formData.investmentBudgetMax}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="preferredLocation"
              placeholder="Preferred Location"
              value={formData.preferredLocation}
              onChange={handleChange}
              required
            />
            <select
              name="franchiseType"
              value={formData.franchiseType}
              onChange={handleChange}
              required
            >
              <option value="">Select Franchise Type</option>
              <option value="single-unit">Single Unit</option>
              <option value="multi-unit">Multi-Unit</option>
              <option value="master-franchise">Master Franchise</option>
            </select>
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2>Background and Experience</h2>
            <input
              type="text"
              name="educationalQualification"
              placeholder="Educational Qualification"
              value={formData.educationalQualification}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="professionalExperience"
              placeholder="Professional Experience (Years and Industry)"
              value={formData.professionalExperience}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="previousFranchiseExperience"
              placeholder="Previous Franchise Experience (if any)"
              value={formData.previousFranchiseExperience}
              onChange={handleChange}
            />
            <button type="button" onClick={prevStep}>
              Previous
            </button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterInvestor;