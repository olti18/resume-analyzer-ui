import axios from "axios";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: "http://localhost:3000/Resume_Analyzer_db",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add function to check if token exists and is valid
const isTokenValid = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  // Check if token is expired (if your token includes expiration)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("access_token");
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

instance.interceptors.request.use(
  (config) => {
    if (!isTokenValid()) {
      throw new Error("Invalid token");
    }
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Invalid token" || error.response?.status === 401) {
      localStorage.removeItem("access_token");
      // Don't redirect if we're already on the login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
