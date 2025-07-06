import { createSlice } from "@reduxjs/toolkit";

import { jwtDecode } from "jwt-decode"; // Make sure you install this with: npm i jwt-decode

const initialState = {
    user: (() => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser?.token) return null;

            const decoded = jwtDecode(storedUser.token);
            const isExpired = decoded.exp < Date.now() / 1000;

            if (isExpired) {
                localStorage.removeItem("user");
                return null;
            }

            return storedUser;
        } catch (error) {
            console.error("Error parsing or validating token:", error);
            localStorage.removeItem("user");
            return null;
        }
    })()
};

// using cookies instead of localStorage
// if we using cookies instead of localStorage
// user: null, // No need to get from localStorage since we store auth in cookies





const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log(state)
            state.user = action.payload || null;
            localStorage.setItem("user", JSON.stringify(action.payload)); // ❌ WRONG (this adds extra quotes) "\"eyJhbGciOiJIUzI1NiIs...\""
            // localStorage.setItem("token", action.payload); // Store user in localStorage
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user"); // Remove user from localStorage
            localStorage.removeItem("cart");
            localStorage.removeItem("shippingAddress");
        },

    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
