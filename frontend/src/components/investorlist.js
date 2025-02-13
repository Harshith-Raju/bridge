import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';

const InvestorList = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/investors');
        setInvestors(response.data);
      } catch (error) {
        setError('Failed to fetch investors. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Investor List
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date of Birth</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nationality</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Preferred Industry</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Investment Budget Min</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Investment Budget Max</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Preferred Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Franchise Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Educational Qualification</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Professional Experience</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Previous Franchise Experience</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investors.length > 0 ? (
              investors.map((investor, index) => (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                  <TableCell>{investor.fullName || 'N/A'}</TableCell>
                  <TableCell>{new Date(investor.dob).toLocaleDateString() || 'N/A'}</TableCell>
                  <TableCell>{investor.gender || 'N/A'}</TableCell>
                  <TableCell>{investor.email || 'N/A'}</TableCell>
                  <TableCell>{investor.phone || 'N/A'}</TableCell>
                  <TableCell>{investor.address || 'N/A'}</TableCell>
                  <TableCell>{investor.nationality || 'N/A'}</TableCell>
                  <TableCell>{investor.preferredIndustry || 'N/A'}</TableCell>
                  <TableCell>{investor.investmentBudgetMin || 'N/A'}</TableCell>
                  <TableCell>{investor.investmentBudgetMax || 'N/A'}</TableCell>
                  <TableCell>{investor.preferredLocation || 'N/A'}</TableCell>
                  <TableCell>{investor.franchiseType || 'N/A'}</TableCell>
                  <TableCell>{investor.educationalQualification || 'N/A'}</TableCell>
                  <TableCell>{investor.professionalExperience || 'N /A'}</TableCell>
                  <TableCell>{investor.previousFranchiseExperience || 'N/A'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={15} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No investors found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InvestorList;