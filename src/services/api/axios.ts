import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default apiClient;
