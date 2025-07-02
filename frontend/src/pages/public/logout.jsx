import API from "../../api/axiosInstance";

import { logout } from "../../store/authSlice";

export const logoutUser = () => async (dispatch) => {
    try {
        // await API.post("/users/logout"); // i using cookies to store token
        dispatch(logout());
    } catch (error) {
        console.error("Logout failed:", error);
    }
};