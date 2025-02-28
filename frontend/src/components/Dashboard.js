import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Box, Typography, Paper } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [investorData, setInvestorData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [pendingBusinessData, setPendingBusinessData] = useState([]);
  const [userData, setUserData] = useState([]);

  // Colors for pie charts
  const investorColors = ["#00C49F", "#FF8042", "#FFBB28"];
  const companyColors = ["#0088FE", "#FFC300", "#FF5733"];
  const pendingBusinessColors = ["#FF5733", "#00C49F", "#FFBB28"];
  const userColors = ["#0088FE", "#FFC300", "#FF5733"];

  // Fetch investor data
  useEffect(() => {
    axios.get("http://localhost:5000/api/investors")
      .then((response) => {
        const data = response.data;
        const statusCounts = data.reduce((acc, investor) => {
          acc[investor.status] = (acc[investor.status] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(statusCounts).map((status) => ({
          name: status,
          value: statusCounts[status],
        }));

        setInvestorData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching investor data:", error);
      });
  }, []);

  // Fetch company data
  useEffect(() => {
    axios.get("http://localhost:5000/api/companies")
      .then((response) => {
        const data = response.data;
        const categoryCounts = data.reduce((acc, company) => {
          acc[company.category] = (acc[company.category] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(categoryCounts).map((category) => ({
          name: category,
          value: categoryCounts[category],
        }));

        setCompanyData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, []);

  // Fetch pending business data
  useEffect(() => {
    axios.get("http://localhost:5000/api/pendingbusinesses")
      .then((response) => {
        const data = response.data;
        const statusCounts = data.reduce((acc, business) => {
          acc[business.status] = (acc[business.status] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(statusCounts).map((status) => ({
          name: status,
          value: statusCounts[status],
        }));

        setPendingBusinessData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching pending business data:", error);
      });
  }, []);

  // Fetch user data
  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then((response) => {
        const data = response.data;
        const roleCounts = data.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(roleCounts).map((role) => ({
          name: role,
          value: roleCounts[role],
        }));

        setUserData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      {/* Investor Status Pie Chart */}
      <Paper
        sx={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          margin: "10px",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Investor Status
        </Typography>
        <PieChart width={400} height={400}>
          <Pie
            data={investorData}
            cx={200}
            cy={200}
            labelLine={false}
            label
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {investorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={investorColors[index % investorColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>

      {/* Company Categories Pie Chart
      <Paper
        sx={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          margin: "10px",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Company Categories
        </Typography>
        <PieChart width={400} height={400}>
          <Pie
            data={companyData}
            cx={200}
            cy={200}
            labelLine={false}
            label
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {companyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={companyColors[index % companyColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper> */}

      {/* Pending Businesses Pie Chart */}
      <Paper
        sx={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          margin: "10px",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Pending Businesses
        </Typography>
        <PieChart width={400} height={400}>
          <Pie
            data={pendingBusinessData}
            cx={200}
            cy={200}
            labelLine={false}
            label
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {pendingBusinessData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pendingBusinessColors[index % pendingBusinessColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>

      {/* User Roles Pie Chart */}
      <Paper
        sx={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          margin: "10px",
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          User Roles
        </Typography>
        <PieChart width={400} height={400}>
          <Pie
            data={userData}
            cx={200}
            cy={200}
            labelLine={false}
            label
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {userData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={userColors[index % userColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>
    </Box>
  );
};

export default Dashboard;