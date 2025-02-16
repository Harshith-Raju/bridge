import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Grid, Card, CardContent, Chip,
  Button, ButtonGroup, TextField, Box, MenuItem, Select,
  FormControl, InputLabel, AppBar, Toolbar, IconButton, useTheme, ThemeProvider, createTheme, CssBaseline, Dialog, DialogContent, DialogTitle
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Dark Mode Theme with Gradient Background
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark' ? {
      background: {
        default: 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
      },
    } : {
      background: {
        default: 'linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)',
        paper: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#666666',
      },
    }),
  },
  shape: {
    borderRadius: 12, // Rounded edges for a modern look
  },
});

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [selectedBusiness, setSelectedBusiness] = useState(null); // Track the selected business for the modal
  const [mode, setMode] = useState('light');
  const theme = useTheme();

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const customTheme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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

  const uniqueIndustries = [...new Set(businesses.map((b) => b.industry?.trim()).filter(Boolean))];

  const filteredBusinesses = businesses.filter((business) => {
    const matchesFilter = filter === 'All' || business.status?.trim().toLowerCase() === filter.toLowerCase();
    const matchesSearch = (business.companyName || 'No Company Name').toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || business.industry === industryFilter;
    return matchesFilter && matchesSearch && matchesIndustry;
  });

  const extractInvestmentValue = (investmentRange) => {
    if (!investmentRange) return 0;
    const match = investmentRange.match(/\d+/g);
    return match ? parseInt(match[0], 10) : 0;
  };

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    const investmentA = extractInvestmentValue(a.investmentRange);
    const investmentB = extractInvestmentValue(b.investmentRange);

    if (sortOrder === 'asc') return investmentA - investmentB;
    if (sortOrder === 'desc') return investmentB - investmentA;
    return 0;
  });

  const handleReadMore = (business) => {
    setSelectedBusiness(business); // Open modal with the selected business details
  };

  const handleCloseModal = () => {
    setSelectedBusiness(null); // Close the modal
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Company Logo" style={{ height: 40, marginRight: 10 }} />
            Company Name
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              label="Search by Company Name"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ backgroundColor: 'background.paper' }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter by Industry</InputLabel>
              <Select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                sx={{ backgroundColor: 'background.paper' }}
              >
                <MenuItem value="All">All Industries</MenuItem>
                {uniqueIndustries.map((industry) => (
                  <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort by Investment</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                sx={{ backgroundColor: 'background.paper' }}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="asc">Lowest to Highest</MenuItem>
                <MenuItem value="desc">Highest to Lowest</MenuItem>
              </Select>
            </FormControl>
            <ButtonGroup variant="outlined" size="small">
              <Button onClick={() => setFilter('All')} sx={{ fontWeight: filter === 'All' ? 'bold' : 'normal' }}>All</Button>
              <Button onClick={() => setFilter('Approved')} sx={{ fontWeight: filter === 'Approved' ? 'bold' : 'normal' }}>Approved</Button>
              <Button onClick={() => setFilter('Rejected')} sx={{ fontWeight: filter === 'Rejected' ? 'bold' : 'normal' }}>Rejected</Button>
              <Button onClick={() => setFilter('Pending')} sx={{ fontWeight: filter === 'Pending' ? 'bold' : 'normal' }}>Pending</Button>
            </ButtonGroup>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          {sortedBusinesses.length > 0 ? (
            sortedBusinesses.map((business) => (
              <Grid item xs={12} sm={6} md={4} key={business._id}>
                <Card
                  sx={{
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                    cursor: 'pointer',
                    borderRadius: 3, // Rounded edges
                  }}
                  onClick={() => handleReadMore(business)} // Open modal on card click
                >
                  <CardContent>
                    <Typography variant="h6">{business.companyName || 'No Company Name'}</Typography>
                    <Typography color="textSecondary">{business.industry || 'No Industry Available'}</Typography>
                    <Typography variant="body2">Investment Range: {business.investmentRange || 'N/A'}</Typography>
                    <Typography variant="body2">Year Established: {business.yearEstablished || 'N/A'}</Typography>
                    <Typography variant="body2">
                      {business.franchiseDescription?.slice(0, 100) || 'No Description Available'}
                      {business.franchiseDescription?.length > 100 && '...'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
                      <Chip
                        label={business.status || 'Unknown'}
                        color={
                          business.status?.trim().toLowerCase() === 'approved'
                            ? 'success'
                            : business.status?.trim().toLowerCase() === 'rejected'
                            ? 'error'
                            : 'warning'
                        }
                        sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ marginTop: 2, color: 'text.secondary' }}>
              No businesses found for "{search}" in "{filter}" under "{industryFilter}" industry.
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Modal for Expanded Business Details */}
      <Dialog open={!!selectedBusiness} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: 'background.paper', borderRadius: '12px 12px 0 0' }}>
          {selectedBusiness?.companyName || 'No Company Name'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'background.paper', borderRadius: '0 0 12px 12px', padding: 3 }}>
          {selectedBusiness && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Industry:</strong> {selectedBusiness.industry || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Investment Range:</strong> {selectedBusiness.investmentRange || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Year Established:</strong> {selectedBusiness.yearEstablished || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Headquarters:</strong> {selectedBusiness.headquarters || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Website:</strong> {selectedBusiness.website || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Franchise Description:</strong> {selectedBusiness.franchiseDescription || 'N/A'}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Status:</strong> 
                <Chip
                  label={selectedBusiness.status || 'Unknown'}
                  color={
                    selectedBusiness.status?.trim().toLowerCase() === 'approved'
                      ? 'success'
                      : selectedBusiness.status?.trim().toLowerCase() === 'rejected'
                      ? 'error'
                      : 'warning'
                  }
                  sx={{ marginLeft: 1 }}
                />
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default BusinessList;