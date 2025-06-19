import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

// ✅ Inject token from localStorage
axiosInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    // const token = localStorage.getItem("token");
    // console.log("Token added to header:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // console.log(config.headers.Authorization)
    }
    return config;
});

export default axiosInstance;
