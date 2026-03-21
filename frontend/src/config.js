const API_BASE_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL?.replace(/\/$/, "") || "http://localhost:5000";

export { API_BASE_URL, SOCKET_URL };
