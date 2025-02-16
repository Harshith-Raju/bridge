import React, { useState } from "react";
import axios from "axios";
import socket from "../socket";

const Comoffer = ({ companyId }) => {
  const [message, setMessage] = useState("");

  const handleSendAnnouncement = async () => {
    if (!message) return alert("Message cannot be empty");
    try {
      await axios.post("http://localhost:5000/api/announcements", {
        companyId,
        message,
      });
      setMessage("");
    } catch (err) {
      console.error("Error sending announcement:", err);
    }
  };

  return (
    <div>
      <h1>Company Page</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your announcement"
      />
      <button onClick={handleSendAnnouncement}>Send Announcement</button>
    </div>
  );
};

export default Comoffer;