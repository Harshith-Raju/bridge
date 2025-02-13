import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, Chip, Button } from '@mui/material';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/notifications/${id}/approve`);
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, status: 'approved' } : notification
      ));
    } catch (error) {
      console.error('Error approving notification:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/notifications/${id}/reject`);
      setNotifications(notifications.map(notification =>
        notification._id === id ? { ...notification, status: 'rejected' } : notification
      ));
    } catch (error) {
      console.error('Error rejecting notification:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Grid container spacing={3}>
        {notifications.map((notification) => (
          <Grid item xs={12} sm={6} md={4} key={notification._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{notification.businessId.companyName}</Typography>
                <Typography color="textSecondary">{notification.businessId.industry}</Typography>
                <Typography variant="body2" component="p">
                  Year Established: {notification.businessId.yearEstablished}
                </Typography>
                <Typography variant="body2" component="p">
                  Headquarters: {notification.businessId.headquarters}
                </Typography>
                <Typography variant="body2" component="p">
                  Website: {notification.businessId.website}
                </Typography>
                <Typography variant="body2" component="p">
                  Franchise Name: {notification.businessId.franchiseName}
                </Typography>
                <Typography variant="body2" component="p">
                  Franchise Description: {notification.businessId.franchiseDescription}
                </Typography>
                <Typography variant="body2" component="p">
                  Investment Range: {notification.businessId.investmentRange}
                </Typography>
                <Typography variant="body2" component="p">
                  Franchise Fee: {notification.businessId.franchiseFee}
                </Typography>
                <Typography variant="body2" component="p">
                  Royalty Fee: {notification.businessId.royaltyFee}
                </Typography>
                <Typography variant="body2" component="p">
                  Email: {notification.businessId.email}
                </Typography>
                {notification.businessId.financialDocuments && (
                  <Typography variant="body2" component="p">
                    <a href={notification.businessId.financialDocuments} target="_blank" rel="noopener noreferrer">
                      View Financial Document
                    </a>
                  </Typography>
                )}
                <Typography variant="body2" component="p">
                  Status: <Chip label={notification.status} color={notification.status === 'approved' ? 'success' : 'warning'} />
                </Typography>
                {notification.status === 'pending' && (
                  <div>
                    <Button variant="contained" color="success" onClick={() => handleApprove(notification._id)}>
                      Approve
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleReject(notification._id)} style={{ marginLeft: '10px' }}>
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notification;