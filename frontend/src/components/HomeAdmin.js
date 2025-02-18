import React from "react";
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Business, MonetizationOn, Notifications, BarChart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  // Sections data
  const sections = [
    { title: "Company List", icon: <Business fontSize="large" />, path: "/businesslist" },
    { title: "Investor List", icon: <MonetizationOn fontSize="large" />, path: "/Investorlist" },
    { title: "Notification", icon: <Notifications fontSize="large" />, path: "/NotifyAdmmin" },
    { title: "Reports & Analytics", icon: <BarChart fontSize="large" />, path: "/dashboard" },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 5,
        backgroundColor: "#143645",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Admin Dashboard Title */}
      <Typography
        variant="h3" // Increased size to h3
        align="center"
        gutterBottom
        sx={{ color: "#fff", mb: 6, fontWeight: "bold" }} // Added margin-bottom and bold font
      >
        Admin Dashboard
      </Typography>

      {/* Grid for Cards */}
      <Grid container spacing={4} justifyContent="center" sx={{ width: "100%" }}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                },
                backgroundColor: "#fff",
                borderRadius: 2,
                width: "100%", // Ensure the card takes full width of the grid item
                maxWidth: "500px", // Increased maxWidth for larger boxes
                height: "200px", // Increased height of the boxes
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardActionArea
                onClick={() => navigate(section.path)}
                sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Box sx={{ color: "#143645" }}>{section.icon}</Box>
                  <Typography variant="h5" mt={2} sx={{ color: "#143645", fontWeight: "bold" }}>
                    {section.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminHome;