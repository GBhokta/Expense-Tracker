import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use(
  (config) => {
    // DO NOT attach token for login
    if (!config.url.includes("token")) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
