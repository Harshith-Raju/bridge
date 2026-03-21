import { io } from "socket.io-client";
import { SOCKET_URL } from "./config";

// Create a Socket.IO connection to the backend
const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true, // Automatically connect when the socket is created
});

// Log connection status
socket.on("connect", () => {
  console.log("Connected to Socket.IO server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from Socket.IO server");
});

// Handle connection errors
socket.on("connect_error", (err) => {
  console.error("Socket.IO connection error:", err);
});

export default socket;