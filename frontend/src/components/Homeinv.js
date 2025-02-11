import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaSignOutAlt } from "react-icons/fa";
import { FaUserPlus, FaChartLine, FaQuestionCircle, FaBuilding } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

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

  // Navigation for Quick Access boxes
  const handleQuickAccessClick = (route) => {
    navigate(route);
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      height: "100vh",
      overflowY: "scroll",
      backgroundColor: "#f9f9f9",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 20px",
      backgroundColor: "#f4f4f4",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: "0",
      zIndex: "10",
    },
    blocksContainer: {
      display: "flex",
      overflowX: "hidden",
      whiteSpace: "nowrap",
      gap: "20px",
      padding: "20px",
    },
    block: {
      minWidth: "350px",
      padding: "70px",
      textAlign: "center",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "15px",
    },
    quickAccessBlock: {
      width: "500px",
      padding: "90px",
      textAlign: "center",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "transform 0.3s ease-in-out",
    },
    logo: {
      width: "550px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
    },
    searchBar: {
      width: "500px",
      padding: "12px",
      fontSize: "18px",
      borderRadius: "10px",
      border: "1px solid #ccc",
    },
    footer: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      textAlign: "center",
      boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
    },
    footerBlock: {
      marginBottom: "20px",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      textAlign: "center",
    },
    footerHeading: { fontSize: "18px", marginBottom: "10px", fontWeight: "bold" },
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
        <div>
          <img src="/path/to/logo.png" alt="Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Franchise Bridge</span>
        </div>
        <div>
          <input type="text" placeholder="Search..." style={styles.searchBar} />
          <button style={{ marginLeft: "10px", cursor: "pointer" }}>
            <FaFilter /> Filter
          </button>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <span style={{ cursor: "pointer" }} onClick={handleNotificationClick}>🔔</span>
          <span style={{ cursor: "pointer" }} onClick={handleWishlistClick}>❤</span>
          <FaSignOutAlt style={{ cursor: "pointer" }} onClick={handleLogout} title="Logout" />
          <span style={{ cursor: "pointer" }} onClick={handleProfileClick}>👤</span>
        </div>
      </div>

      {/* Scrolling Blocks Section */}
      <div style={styles.blocksContainer} ref={scrollContainerRef}>
        {franchises.concat(franchises).map((franchise, index) => (
          <div
            key={index}
            style={styles.block}
            onClick={handleBlockClick}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img src={franchise.logo} alt={franchise.name} style={styles.logo} />
            {franchise.name}
          </div>
        ))}
      </div>

      {/* Quick Access Section */}
      <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f9f9f9" }}>
        <h2 style={{ marginBottom: "20px" }}>Quick Access</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {[
            { icon: <FaUserPlus size={50} color="#007bff" />, label: "Register", route: "/registerin" },
            { icon: <FaChartLine size={50} color="#28a745" />, label: "Track Your Progress", route: "/progress" },
            { icon: <FaQuestionCircle size={50} color="#ffc107" />, label: "FAQs", route: "/faqs" },
            { icon: <FaBuilding size={50} color="#dc3545" />, label: "View All Companies", route: "/comlist" },
          ].map((item, index) => (
            <div
              key={index}
              style={styles.quickAccessBlock}
              onClick={() => handleQuickAccessClick(item.route)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {item.icon}
              <p style={{ fontSize: "20px", fontWeight: "bold", marginTop: "15px" }}>{item.label}</p>
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
    </div>
  );
};

export default HomePage;