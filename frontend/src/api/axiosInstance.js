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
    const userString = localStorage.getItem("user");
    // console.log(userString)
    if (userString) {
        const user = JSON.parse(userString);
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

// axiosInstance.interceptors.request.use((config) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user)
//     // const token = localStorage.getItem("token");
//     // console.log("Token added to header:", token);
//     if (user.token) {
//         config.headers.Authorization = `Bearer ${user.token}`;
//         // console.log(config.headers.Authorization)
//     }
//     return config;
// });

export default axiosInstance;
