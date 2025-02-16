import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFilter,
  FaSignOutAlt,
  FaUserPlus,
  FaChartLine,
  FaQuestionCircle,
  FaBuilding,
  FaBell,
  FaHeart,
  FaCoins,
  FaArrowUp,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const speed = 1;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += speed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  const handleLogout = () => navigate("/");
  const handleProfileClick = () => navigate("/profile");
  const handleNotificationClick = () => navigate("/notification");
  const handleWishlistClick = () => navigate("/wishlist");
  const handleBlockClick = () => navigate("/blank");

  const handleQuickAccessClick = (route) => {
    navigate(route);
  };

  // Dynamic styles based on theme
  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      height: "100vh",
      overflowY: "scroll",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
      position: "relative",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: isDarkMode ? "#333333" : "#143645",
      color: "#ffffff",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: "0",
      zIndex: "10",
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logo: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    searchBar: {
      width: "400px",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
      backgroundColor: isDarkMode ? "#444444" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    profileSection: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    iconButton: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      backgroundColor: "transparent",
      border: "none",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "16px",
      transition: "color 0.3s ease-in-out",
    },
    iconButtonHover: {
      color: "#ffcc00",
    },
    profileImage: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid #ffffff",
      transition: "border-color 0.3s ease-in-out",
    },
    profileImageHover: {
      borderColor: "#ffcc00",
    },
    blocksContainer: {
      display: "flex",
      overflowX: "hidden",
      whiteSpace: "nowrap",
      gap: "20px",
      padding: "20px",
      backgroundColor: isDarkMode ? "#2a2a2a" : "#f0f4f8",
      position: "relative",
    },
    block: {
      minWidth: "350px",
      padding: "70px",
      textAlign: "center",
      backgroundColor: isDarkMode ? "#444444" : "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
      color: isDarkMode ? "#ffffff" : "#143645",
    },
    quickAccessBlock: {
      width: "45%", // Adjusted width to fit two blocks per row
      padding: "30px",
      textAlign: "center",
      backgroundColor: isDarkMode ? "#444444" : "#ffffff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    },
    footer: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: isDarkMode ? "#333333" : "#143645",
      color: "#ffffff",
      textAlign: "center",
    },
    footerBlock: {
      marginBottom: "20px",
      padding: "20px",
      backgroundColor: isDarkMode ? "#444444" : "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      textAlign: "center",
    },
    footerHeading: { fontSize: "18px", marginBottom: "10px", fontWeight: "600" },
    icon: {
      fontSize: "24px",
      color: isDarkMode ? "#ffffff" : "#143645",
      transition: "color 0.3s ease-in-out",
    },
    middleSection: {
      position: "relative",
      padding: "40px 20px 100px 20px", // Added padding-bottom to create space for the graph bars
      textAlign: "center",
      backgroundColor: isDarkMode ? "#2a2a2a" : "#f0f4f8",
      overflow: "hidden",
    },
    animatedBackground: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: isDarkMode
        ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))"
        : "linear-gradient(to bottom, rgba(20, 54, 69, 0.05), rgba(20, 54, 69, 0.05))",
      zIndex: "0",
    },
    graphContainer: {
      position: "absolute",
      bottom: "20px", // Adjusted bottom position to create space
      left: "0",
      width: "100%",
      height: "50px", // Reduced height for the graph container
      display: "flex",
      alignItems: "flex-end",
      gap: "2px", // Reduced gap between bars
      padding: "0 20px",
      zIndex: "1",
      overflow: "hidden",
    },
    graphBar: {
      flex: 1,
      height: "50px", // Reduced height for the bars
      backgroundColor: isDarkMode ? "#ffffff" : "#143645",
      animation: "rise 3s infinite ease-in-out",
    },
    floatingIcon: {
      position: "absolute",
      fontSize: "24px",
      color: isDarkMode ? "#ffffff" : "#143645",
      animation: "float 6s infinite ease-in-out",
    },
    quickAccessContainer: {
      display: "flex",
      flexWrap: "wrap", // Allow wrapping of blocks
      justifyContent: "center",
      gap: "20px", // Space between blocks
      position: "relative",
      zIndex: "1",
    },
  };

  const franchises = [
    { name: "KFC", logo: "/images/kfc.png" },
    { name: "McDonald's", logo: "/images/mcdonalds.png" },
    { name: "Subway", logo: "/images/subway.png" },
    { name: "Domino's", logo: "/images/dominos.png" },
    { name: "Jockey", logo: "/images/jockey.png" },
    { name: "DFC", logo: "/images/dfc.png" },
    { name: "Lenskart", logo: "/images/lenskart.png" },
    { name: "Amul", logo: "/images/amul.png" },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        {/* Logo and Title */}
        <div style={styles.logoSection}>
          <img src="/path/to/logo.png" alt="Logo" style={styles.logo} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Franchise Bridge</span>
        </div>

        {/* Search Bar and Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="text" placeholder="Search..." style={styles.searchBar} />
          <button style={styles.iconButton}>
            <FaFilter /> Filter
          </button>
        </div>

        {/* Profile and Icons */}
        <div style={styles.profileSection}>
          <button
            style={styles.iconButton}
            onClick={handleNotificationClick}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            <FaBell /> Notifications
          </button>
          <button
            style={styles.iconButton}
            onClick={handleWishlistClick}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            <FaHeart /> Wishlist
          </button>
          <button
            style={styles.iconButton}
            onClick={toggleTheme}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />} {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            style={styles.iconButton}
            onClick={handleLogout}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
          >
            <FaSignOutAlt /> Logout
          </button>
          <img
            src="/path/to/profile.jpg"
            alt="Profile"
            style={styles.profileImage}
            onClick={handleProfileClick}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffcc00")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#ffffff")}
          />
        </div>
      </div>

      {/* Scrolling Blocks Section */}
      <div style={styles.blocksContainer} ref={scrollContainerRef}>
        <div style={styles.animatedBackground}></div>
        {franchises.concat(franchises).map((franchise, index) => (
          <div
            key={index}
            style={styles.block}
            onClick={handleBlockClick}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img src={franchise.logo} alt={franchise.name} style={styles.logo} />
            {franchise.name}
          </div>
        ))}
      </div>

      {/* Middle Section with Professional Investor-Themed Animation */}
      <div style={styles.middleSection}>
        <div style={styles.animatedBackground}></div>
        {/* Graph Bars Animation */}
        <div style={styles.graphContainer}>
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              style={{
                ...styles.graphBar,
                height:` ${Math.random() * 50}px`, // Random height for variety
                animationDelay:` ${index * 0.1}s`, // Staggered animation
              }}
            ></div>
          ))}
        </div>
        {/* Floating Icons */}
        <FaCoins style={{ ...styles.floatingIcon, top: "10%", left: "5%", animationDelay: "0s" }} />
        <FaChartLine style={{ ...styles.floatingIcon, top: "20%", left: "30%", animationDelay: "2s" }} />
        <FaArrowUp style={{ ...styles.floatingIcon, top: "15%", left: "70%", animationDelay: "4s" }} />
        <h2 style={{ marginBottom: "20px", color: isDarkMode ? "#ffffff" : "#143645", position: "relative", zIndex: "1" }}>Quick Access</h2>
        <div style={styles.quickAccessContainer}>
          {[
            { icon: <FaUserPlus size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "Register", route: "/registerin" },
            { icon: <FaChartLine size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "Track Progress", route: "/progress" },
            { icon: <FaQuestionCircle size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "FAQs", route: "/invoffer" },
            { icon: <FaBuilding size={40} color={isDarkMode ? "#ffffff" : "#143645"} />, label: "View Companies", route: "/comlist" },
          ].map((item, index) => (
            <div
              key={index}
              style={styles.quickAccessBlock}
              onClick={() => handleQuickAccessClick(item.route)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              {item.icon}
              <p style={{ fontSize: "18px", fontWeight: "600", marginTop: "15px", color: isDarkMode ? "#ffffff" : "#143645" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div style={styles.footer}>
        <div style={styles.footerBlock}>
          <div style={styles.footerHeading}>About Us</div>
          <p>Franchise Bridge connects entrepreneurs with top franchise opportunities.</p>
        </div>
        <div style={styles.footerBlock}>
          <div style={styles.footerHeading}>Our Achievements</div>
          <p>We have successfully helped over 1,000 businesses find the perfect franchise match.</p>
          <p>Rated #1 in Franchise Consulting Services for three consecutive years.</p>
        </div>
        <div style={styles.footerBlock}>
          <div style={styles.footerHeading}>Contact Details</div>
          <p>Email: support@franchisebridge.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      {/* Add CSS Animation */}
      <style>
        {`
          @keyframes rise {
            0% {
              height: 0;
            }
            50% {
              height: 50px;
            }
            100% {
              height: 0;
            }
          }
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;