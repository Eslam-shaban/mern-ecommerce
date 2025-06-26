import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/users/login", formData);
            const user = response.data.user;
            dispatch(setUser(user));
            toast.success("Login successful! 🎉");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-300 via-yellow-100 to-orange-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-orange-600">Welcome Back</h2>
                <p className="text-sm text-gray-500 text-center">Login to your account</p>

                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder=" "
                    />
                    <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500">
                        Email
                    </label>
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="peer w-full px-4 pt-6 pb-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder=" "
                    />
                    <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-orange-500">
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600 transition duration-200"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-orange-600 font-medium hover:underline cursor-pointer"
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
