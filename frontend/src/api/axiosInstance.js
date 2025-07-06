import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { logout } from "../store/authSlice";
import store from "../store/store"; // ✅ import the store directly

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

// ✅ Inject token into headers
axiosInstance.interceptors.request.use((config) => {
    const userString = localStorage.getItem("user");
    if (userString) {
        const user = JSON.parse(userString);

        // Check if token is expired
        try {
            const decoded = jwtDecode(user.token);
            const isExpired = decoded.exp < Date.now() / 1000;
            if (isExpired) {
                localStorage.removeItem("user");
                store.dispatch(logout());
                return Promise.reject(new Error("Token expired"));
            }

            config.headers.Authorization = `Bearer ${user.token}`;
        } catch (err) {
            console.error("Error decoding token:", err);
            localStorage.removeItem("user");
            store.dispatch(logout());
            return Promise.reject(err);
        }
    }
    return config;
});

// ✅ Handle 401 errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized. Logging out...");
            localStorage.removeItem("user");
            store.dispatch(logout());
        }

        return Promise.reject(error); // ❗️Return the rejected promise
    }
);

export default axiosInstance;



// axiosInstance.interceptors.request.use((config) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user)
//     // const token = localStorage.getItem("token");
//     // console.log("Token added to header:", token);
//     if (user.token) {
//         config.headers.Authorization = `Bearer ${user.token}`;
//         // console.log(config.headers.Authorization)
//     }
// });


