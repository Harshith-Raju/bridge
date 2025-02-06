import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/Login1";
import Logincmp from "./components/Login-comp";
import Logininv from "./components/Login-inv";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import HomePage from "./components/Homeinv.js";
import HomePageCom from "./components/Homecomp.js";
import AdminHome from "./components/HomeAdmin.js";





import RegisterBusiness from "./components/RegisterCom.js";
import RegisterInvestor from "./components/RegisterInv.js";
import Investorlist from "./components/investorlist.js";
import BusinessList from "./components/BusinessList.js";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login1" element={<LoginPage />} />
        <Route path="/logincmp" element={<Logincmp />} />
        <Route path="/logininv" element={<Logininv />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homecom" element={<HomePageCom />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminhome" element={<Investorlist />} />
        <Route path="/registercom" element={<RegisterBusiness />} />
        <Route path="/registerinv" element={<RegisterInvestor />} />
        
        
        
        
        <Route path="/businesslist" element={<BusinessList />} />
      </Routes>
    </Router>
  );
};

export default App;