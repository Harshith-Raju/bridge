import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/HomePage";
import RegisterCompany from "./components/Register";
import RegisterUser from "./components/RegisterCompany";
import CompanyList from "./components/CompanyList";
import LoginPage from "./components/Login1";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login1" element={<LoginPage />} />
        <Route path="/company-list" element={<CompanyList />} />

        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterCompany />} />
      </Routes>
    </Router>
  );
};

export default App;
