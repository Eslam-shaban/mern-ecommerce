import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: (() => {   // Define an arrow function
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
            // return localStorage.getItem("token") || null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    })(),  // <-- Immediately invoking it

    // using cookies instead of localStorage
    // if we using cookies instead of localStorage
    // user: null, // No need to get from localStorage since we store auth in cookies


};


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
