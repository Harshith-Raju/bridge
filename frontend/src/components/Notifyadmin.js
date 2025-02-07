import React, { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/notifications/${id}/approve`);
      fetchNotifications();
    } catch (error) {
      console.error("Error approving business:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/notifications/${id}/reject`);
      fetchNotifications();
    } catch (error) {
      console.error("Error rejecting business:", error);
    }
  };

  return (
    <div style={{ width: "50%", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Admin Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <h3>{notification.businessId.title}</h3>
            <p>Registration Number: {notification.businessId.registrationNumber}</p>
            <p>Tax ID: {notification.businessId.taxId}</p>
            <p>Status: {notification.status}</p>
            <button onClick={() => handleApprove(notification._id)}>Approve</button>
            <button onClick={() => handleReject(notification._id)}>Reject</button>
          </div>
        ))
      ) : (
        <p>No pending notifications</p>
      )}
    </div>
  );
};

export default Notification;