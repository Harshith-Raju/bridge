import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const ComList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/businesses");
        const approvedBusinesses = response.data.filter(
          (business) => business.status === "approved"
        );
        setBusinesses(approvedBusinesses);
      } catch (error) {
        setError("Failed to fetch businesses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Approved Business List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <Grid item xs={12} sm={6} md={4} key={business._id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold">
                      {business.title}
                    </Typography>
                    <Typography color="textSecondary">
                      Reg No: {business.registrationNumber}
                    </Typography>
                    <Typography variant="body2">
                      🌐{" "}
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1565c0", textDecoration: "none" }}
                      >
                        {business.website}
                      </a>
                    </Typography>
                    <Typography variant="body2">📞 {business.phoneNumber}</Typography>
                    {business.financialDocuments && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        📂{" "}
                        <a
                          href={business.financialDocuments}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#2e7d32", textDecoration: "none" }}
                        >
                          View Financial Document
                        </a>
                      </Typography>
                    )}
                    <Chip label="Approved" color="success" sx={{ mt: 2 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No approved businesses found.
            </Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default ComList;
