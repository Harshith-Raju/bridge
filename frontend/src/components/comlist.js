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
  Rating,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { StarBorder } from "@mui/icons-material";

const ComList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

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

  const handleReviewDialogOpen = (business) => {
    setSelectedBusiness(business);
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
    setReviewText("");
    setRating(0);
  };

  const handleReviewSubmit = async () => {
    if (!selectedBusiness || !reviewText || rating === 0) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/businesses/${selectedBusiness._id}/reviews`,
        { text: reviewText, rating }
      );
      const updatedBusinesses = businesses.map((business) =>
        business._id === selectedBusiness._id
          ? { ...business, reviews: [...(business.reviews || []), response.data] }
          : business
      );
      setBusinesses(updatedBusinesses);
      handleReviewDialogClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleReviewDialogOpen(business)}
                      >
                        Add Review
                      </Button>
                    </Box>
                    {business.reviews && business.reviews.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Reviews:</Typography>
                        {business.reviews.map((review, index) => (
                          <Box key={index} sx={{ mt: 1 }}>
                            <Rating value={review.rating} readOnly />
                            <Typography variant="body2">{review.text}</Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
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

      <Dialog open={reviewDialogOpen} onClose={handleReviewDialogClose}>
        <DialogTitle>Add Review for {selectedBusiness?.title}</DialogTitle>
        <DialogContent>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            emptyIcon={<StarBorder fontSize="inherit" />}
          />
          <TextField
            label="Your Review"
            multiline
            rows={4}
            fullWidth
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose}>Cancel</Button>
          <Button onClick={handleReviewSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ComList;