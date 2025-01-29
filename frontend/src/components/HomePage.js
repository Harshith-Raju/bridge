import React, { useState } from "react";
import { FiLogOut, FiChevronDown, FiChevronUp } from "react-icons/fi";

const HomePage = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#343a40",
          color: "white",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="logo.png"
            alt="Franchise Bridge Logo"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <h1 style={{ fontSize: "1.5rem" }}>Franchise Bridge</h1>
        </div>

        {/* Search and Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {/* Logout Button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FiLogOut size={18} /> Logout
          </button>
          {/* Profile */}
          <div style={{ position: "relative" }}>
            <img
              src="profile.png"
              alt="User Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={toggleProfileMenu}
            />
            {showProfileMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <button
                  style={{
                    padding: "8px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  View Profile
                </button>
                <button
                  style={{
                    padding: "8px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  Settings
                </button>
                <button
                  style={{
                    padding: "8px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  Help
                </button>
              </div>
            )}
          </div>
          {/* Profile Arrow */}
          <div onClick={toggleProfileMenu} style={{ cursor: "pointer" }}>
            {showProfileMenu ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          padding: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          {/* Register Company Button */}
          <button
            style={{
              padding: "15px 30px",
              fontSize: "1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => (window.location.href = "/register-company")}
          >
            Register Company
          </button>
          {/* Register Investor Button */}
          <button
            style={{
              padding: "15px 30px",
              fontSize: "1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => (window.location.href = "/register-investor")}
          >
            Register Investor
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;