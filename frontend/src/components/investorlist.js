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
  TextField,
  IconButton,
  Pagination,
  Toolbar,
  AppBar,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Modal,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Tooltip,
} from '@mui/material';
import { Brightness4, Brightness7, FileDownload, FilterList, Visibility, VisibilityOff } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Custom dark and light themes
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
          },
        }
      : {
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#666666',
          },
        }),
  },
});

const InvestorList = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [darkMode, setDarkMode] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({
    fullName: true,
    dob: true,
    gender: true,
    email: true,
    phone: true,
    address: true,
    nationality: true,
    preferredIndustry: true,
    investmentBudgetMin: true,
    investmentBudgetMax: true,
    preferredLocation: true,
    franchiseType: true,
    educationalQualification: true,
    professionalExperience: true,
    previousFranchiseExperience: true,
  });
  const [filters, setFilters] = useState({
    industry: '',
    budgetMin: '',
    budgetMax: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const customTheme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

  // Handle search
  const filteredInvestors = investors.filter(
    (investor) =>
      investor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle advanced filters
  const applyFilters = (investors) => {
    return investors.filter((investor) => {
      return (
        (!filters.industry || investor.preferredIndustry === filters.industry) &&
        (!filters.budgetMin || investor.investmentBudgetMin >= filters.budgetMin) &&
        (!filters.budgetMax || investor.investmentBudgetMax <= filters.budgetMax)
      );
    });
  };

  const filteredAndSearchedInvestors = applyFilters(filteredInvestors);

  // Handle sorting
  const sortedInvestors = [...filteredAndSearchedInvestors].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle pagination
  const paginatedInvestors = sortedInvestors.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handle column sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedInvestors);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Investors');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'investors.xlsx');
    setSnackbarMessage('Data exported successfully!');
    setSnackbarOpen(true);
  };

  // Column visibility menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openColumnMenu = Boolean(anchorEl);
  const handleColumnMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleColumnMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle column visibility toggle
  const toggleColumnVisibility = (column) => {
    setColumnVisibility({ ...columnVisibility, [column]: !columnVisibility[column] });
  };

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
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Investor List
          </Typography>
          <TextField
            label="Search Investors"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2, width: 300 }}
          />
          <Tooltip title="Export to Excel">
            <IconButton onClick={exportToExcel} color="inherit">
              <FileDownload />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Dark Mode">
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Column Visibility">
            <IconButton onClick={handleColumnMenuClick} color="inherit">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={openColumnMenu}
            onClose={handleColumnMenuClose}
          >
            {Object.keys(columnVisibility).map((column) => (
              <MenuItem key={column}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={columnVisibility[column]}
                      onChange={() => toggleColumnVisibility(column)}
                    />
                  }
                  label={column.replace(/([A-Z])/g, ' $1').toUpperCase()}
                />
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingY: 4 }}>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5' }}>
                {Object.keys(columnVisibility).map((column) =>
                  columnVisibility[column] && (
                    <TableCell
                      key={column}
                      sx={{ fontWeight: 'bold' }}
                      onClick={() => handleSort(column)}
                    >
                      {column.replace(/([A-Z])/g, ' $1').toUpperCase()}
                      {sortConfig.key === column && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvestors.map((investor, index) => (
                <TableRow
                  key={index}
                  onClick={() => setSelectedInvestor(investor)}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: darkMode ? '#2a2a2a' : '#fafafa' },
                    '&:hover': { backgroundColor: darkMode ? '#333333' : '#eeeeee' },
                    cursor: 'pointer',
                  }}
                >
                  {Object.keys(columnVisibility).map((column) =>
                    columnVisibility[column] && (
                      <TableCell key={column}>
                        {investor[column] || 'N/A'}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(filteredAndSearchedInvestors.length / rowsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Container>
      <Modal open={Boolean(selectedInvestor)} onClose={() => setSelectedInvestor(null)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h6">Investor Details</Typography>
          <pre>{JSON.stringify(selectedInvestor, null, 2)}</pre>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
};

export default InvestorList;