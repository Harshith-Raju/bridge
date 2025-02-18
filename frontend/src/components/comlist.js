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

  // Filter businesses based on status, industry, and search query
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
    <Box sx={{ backgroundColor: '#143645', minHeight: '100vh', padding: 3, position: 'relative' }}>
      {/* Background Shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="circlePattern" patternUnits="userSpaceOnUse" width="200" height="200">
              <circle cx="50" cy="50" r="40" fill="rgba(255, 255, 255, 0.1)" />
            </pattern>
            <pattern id="trianglePattern" patternUnits="userSpaceOnUse" width="200" height="200">
              <polygon points="100,0 200,200 0,200" fill="rgba(255, 255, 255, 0.1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circlePattern)" />
          <rect width="100%" height="100%" fill="url(#trianglePattern)" opacity="0.5" />
        </svg>
      </Box>

      <Container>
        {/* Business List Title */}
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Business List
        </Typography>

        {/* Search, Filter, Sorting & Industry Selection */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexWrap: 'wrap' }}>
          {/* Search Bar */}
          <TextField 
            label="Search by Company Name" 
            variant="outlined" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            sx={{ 
              flex: 1, 
              minWidth: 250,
              '& .MuiInputLabel-root': { color: 'white' }, // Label color
              '& .MuiOutlinedInput-root': { 
                '& fieldset': { borderColor: 'white' }, // Border color
                '& input': { color: 'white' }, // Input text color
              },
            }}
          />

          {/* Industry Filter Dropdown */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: 'white' }}>Filter by Industry</InputLabel>
            <Select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              sx={{ 
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '& .MuiSvgIcon-root': { color: 'white' },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    '& .MuiMenuItem-root': {
                      color: 'black', // Black text for menu items
                    },
                  },
                },
              }}
            >
              <MenuItem value="All">All Industries</MenuItem>
              {uniqueIndustries.map((industry) => (
                <MenuItem key={industry} value={industry}>{industry}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sorting Dropdown */}
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel sx={{ color: 'white' }}>Sort by Investment</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{ 
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '& .MuiSvgIcon-root': { color: 'white' },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    '& .MuiMenuItem-root': {
                      color: 'black', // Black text for menu items
                    },
                  },
                },
              }}
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
                <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: 'white' }}>{business.companyName || 'No Company Name'}</Typography>
                    <Typography color="textSecondary">{business.industry || 'No Industry Available'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Year Established: {business.yearEstablished || 'N/A'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Headquarters: {business.headquarters || 'N/A'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Website: {business.website || 'No Website Available'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Franchise Name: {business.franchiseName || 'N/A'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Franchise Description: {business.franchiseDescription || 'N/A'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Investment Range: {business.investmentRange || 'N/A'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Franchise Fee: {business.franchiseFee || 'N/A'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Royalty Fee: {business.royaltyFee || 'N/A'}</Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>Email: {business.email || 'No Email Available'}</Typography>
                    {business.financialDocuments ? (
                      <Typography variant="body2" sx={{ color: 'white' }}>
                        <a href={business.financialDocuments} target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue' }}>
                          View Financial Document
                        </a>
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'white' }}>No Financial Document Available</Typography>
                    )}
                    <Typography variant="body2" sx={{ color: 'white' }}>
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
    </Box>
  );
};

export default ComList;