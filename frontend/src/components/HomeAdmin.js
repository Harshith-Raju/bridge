import React from "react";
import { Box, Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Business, MonetizationOn, People, BarChart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

// Styled component for hover effect
const StyledCard = styled(Card)({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  },
});

const AdminHome = () => {
  const navigate = useNavigate();

  // Sections data
  const sections = [
    { title: "Company List", icon: <Business fontSize="large" />, path: "/businesslist" },
    { title: "Investor List", icon: <MonetizationOn fontSize="large" />, path: "/Investorlist" },
    { title: "User Management", icon: <People fontSize="large" />, path: "/NotifyAdmmin" },
    { title: "Reports & Analytics", icon: <BarChart fontSize="large" />, path: "/dashboard" },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 5, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StyledCard>
              <CardActionArea onClick={() => navigate(section.path)}>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  {section.icon}
                  <Typography variant="h6" mt={2}>
                    {section.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminHome;
