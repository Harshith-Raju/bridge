import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Grid, Card, CardContent, Chip, 
  Button, TextField, Box, MenuItem, Select, 
  FormControl, InputLabel 
} from '@mui/material';

const ComList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState(''); // Search query
  const [sortOrder, setSortOrder] = useState('none'); // Sorting state: 'none', 'asc', 'desc'
  const [industryFilter, setIndustryFilter] = useState('All'); // Industry filter

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/businesses');
        setBusinesses(response.data);
        console.log("Fetched Businesses:", response.data); // Debugging log
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBusinesses();
  }, []);

  // Extract unique industries from business data
  const uniqueIndustries = [...new Set(businesses.map((b) => b.industry?.trim()).filter(Boolean))];

  // Filter businesses to only include approved companies and match search query and industry
  const filteredBusinesses = businesses.filter((business) => {
    const isApproved = business.status?.trim().toLowerCase() === 'approved';
    const matchesSearch = (business.companyName || 'No Company Name').toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || business.industry === industryFilter;
    return isApproved && matchesSearch && matchesIndustry;
  });

  // Extract numeric investment values from ranges like "₹10L - ₹20L"
  const extractInvestmentValue = (investmentRange) => {
    if (!investmentRange) return 0;
    const match = investmentRange.match(/\d+/g); // Extract numbers
    return match ? parseInt(match[0], 10) : 0; // Use the first number as sorting value
  };

  // Sort businesses based on investment range
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    const investmentA = extractInvestmentValue(a.investmentRange);
    const investmentB = extractInvestmentValue(b.investmentRange);

    if (sortOrder === 'asc') return investmentA - investmentB;
    if (sortOrder === 'desc') return investmentB - investmentA;
    return 0;
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Business List
      </Typography>

      {/* Search, Industry Selection & Sorting */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexWrap: 'wrap' }}>
        {/* Search Bar */}
        <TextField 
          label="Search by Company Name" 
          variant="outlined" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          sx={{ flex: 1, minWidth: 250 }}
        />

        {/* Industry Filter Dropdown */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Industry</InputLabel>
          <Select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
          >
            <MenuItem value="All">All Industries</MenuItem>
            {uniqueIndustries.map((industry) => (
              <MenuItem key={industry} value={industry}>{industry}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sorting Dropdown */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Sort by Investment</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="asc">Lowest to Highest</MenuItem>
            <MenuItem value="desc">Highest to Lowest</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {sortedBusinesses.length > 0 ? (
          sortedBusinesses.map((business) => (
            <Grid item xs={12} sm={6} md={4} key={business._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{business.companyName || 'No Company Name'}</Typography>
                  <Typography color="textSecondary">{business.industry || 'No Industry Available'}</Typography>
                  <Typography variant="body2">Year Established: {business.yearEstablished || 'N/A'}</Typography>
                  <Typography variant="body2">Headquarters: {business.headquarters || 'N/A'}</Typography>
                  <Typography variant="body2">Website: {business.website || 'No Website Available'}</Typography>
                  <Typography variant="body2">Franchise Name: {business.franchiseName || 'N/A'}</Typography>
                  <Typography variant="body2">Franchise Description: {business.franchiseDescription || 'N/A'}</Typography>
                  <Typography variant="body2">Investment Range: {business.investmentRange || 'N/A'}</Typography>
                  <Typography variant="body2">Franchise Fee: {business.franchiseFee || 'N/A'}</Typography>
                  <Typography variant="body2">Royalty Fee: {business.royaltyFee || 'N/A'}</Typography>
                  <Typography variant="body2">Email: {business.email || 'No Email Available'}</Typography>
                  {business.financialDocuments ? (
                    <Typography variant="body2">
                      <a href={business.financialDocuments} target="_blank" rel="noopener noreferrer">
                        View Financial Document
                      </a>
                    </Typography>
                  ) : (
                    <Typography variant="body2">No Financial Document Available</Typography>
                  )}
                  <Typography variant="body2">
                    Status: 
                    <Chip 
                      label={business.status || 'Unknown'} 
                      color="success" // Since we only show approved companies, the status is always "Approved"
                      sx={{ marginLeft: 1 }}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ marginTop: 2, color: 'gray' }}>
            No approved businesses found for "{search}" under "{industryFilter}" industry.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ComList;