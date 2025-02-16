import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";

const Admoffer = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch initial announcements
    axios.get("http://localhost:5000/api/announcements")
      .then((res) => setAnnouncements(res.data));

    // Listen for new announcements
    socket.on("newAnnouncement", (newAnnouncement) => {
      setAnnouncements((prev) => [newAnnouncement, ...prev]);
    });

    // Listen for deleted announcements
    socket.on("announcementDeleted", (id) => {
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    });

    return () => {
      socket.off("newAnnouncement");
      socket.off("announcementDeleted");
    };
  }, []);

  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
    } catch (err) {
      console.error("Error deleting announcement:", err);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {announcements.map((announcement) => (
        <div key={announcement._id}>
          <p>{announcement.message}</p>
          <button onClick={() => handleDeleteAnnouncement(announcement._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admoffer;