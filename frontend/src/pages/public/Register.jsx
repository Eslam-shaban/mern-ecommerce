import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/users/register", formData);
            // console.log(response.data);
            const user = response.data.user;
            dispatch(setUser(user));
            toast.success("Registration successful! 🎉");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed!");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
                <button type="submit" className="bg-green-500 text-white p-2 rounded w-full cursor-pointer">Register</button>
            </form>
        </div>
    );
};

export default Register;
