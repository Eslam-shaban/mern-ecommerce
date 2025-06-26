import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const { user } = useSelector((state) => state.auth);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return toast.error("New passwords do not match.");
        }
        setLoading(true);
        try {
            const res = await API.put(
                `/users/change-password`,
                {
                    oldPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            toast.success(res.data.message || "Password changed successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                dispatch(logout()); // ✅ this actually updates Redux and clears localStorage
                navigate("/login");
            }, 1500); // wait 1.5 seconds before redirec

        } catch (err) {
            const errorData = err.response?.data;
            console.log(errorData)
            if (Array.isArray(errorData?.errors)) {
                errorData.errors.forEach((error) => {
                    // console.log(error)
                    toast.error(error.msg);
                });
            }
            else {
                toast.error(err.response?.data?.message || "Something went wrong.");
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded disabled:cursor-not-allowed"
                >
                    {loading ? "Changing..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
