import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/businesses')
      .then(response => {
        setBusinesses(response.data);
      })
      .catch(error => {
        console.error('Error fetching businesses:', error);
      });
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Registered Businesses</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Registration Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tax ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Website</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Agreed to Policy</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{business.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{business.registrationNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{business.taxId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{business.website}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{business.phoneNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{business.isAgreed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessList;