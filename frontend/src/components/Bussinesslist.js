import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/businesses');
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Business List
      </Typography>
      <Grid container spacing={3}>
        {businesses.map((business) => (
          <Grid item xs={12} sm={6} md={4} key={business._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{business.companyName || 'No Company Name Available'}</Typography>
                <Typography color="textSecondary">{business.industry || 'No Industry Available'}</Typography>
                <Typography variant="body2" component="p">
                  Year Established: {business.yearEstablished || 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                  Headquarters: {business.headquarters || 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                  Website: {business.website || 'No Website Available'}
                </Typography>
                <Typography variant="body2" component="p">
                  Franchise Name: {business.franchiseName || 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                  Franchise Description: {business.franchiseDescription || 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                  Investment Range: {business.investmentRange || 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                  Franchise Fee: {business.franchiseFee || 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                  Royalty Fee: {business.royaltyFee || 'N/A'}
                </Typography>
                <Typography variant="body2" component="p">
                  Email: {business.email || 'No Email Available'}
                </Typography>
                {business.financialDocuments ? (
                  <Typography variant="body2" component="p">
                    <a href={business.financialDocuments} target="_blank" rel="noopener noreferrer">
                      View Financial Document
                    </a>
                  </Typography>
                ) : (
                  <Typography variant="body2" component="p">No Financial Document Available</Typography>
                )}
                <Typography variant="body2" component="p">
                  Status: <Chip label={business.status || 'Unknown'} color={business.status === 'Approved' ? 'success' : 'warning'} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BusinessList;