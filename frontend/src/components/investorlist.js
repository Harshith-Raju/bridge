import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Investorlist = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/investors')
      .then(response => {
        setInvestors(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Investor List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investors.map((investor, index) => (
              <TableRow key={index}>
                <TableCell>{investor.fullName}</TableCell>
                <TableCell>{new Date(investor.dob).toLocaleDateString()}</TableCell>
                <TableCell>{investor.email}</TableCell>
                <TableCell>{investor.phone}</TableCell>
                <TableCell>{investor.address}</TableCell>
                <TableCell>{investor.nationality}</TableCell>
                <TableCell>{investor.location}</TableCell>
                <TableCell>{investor.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Investorlist;