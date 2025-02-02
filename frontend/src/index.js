import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light', // You can set this to 'dark' if you want a dark theme by default
  },
});

// Create a root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* This will apply a baseline CSS reset */}
    <App /> {/* Render your App component */}
  </ThemeProvider>
);