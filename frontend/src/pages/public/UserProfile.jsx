import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice"
import { Link } from 'react-router-dom';
import API from "../../api/axiosInstance";


const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            if (!user || !user.token) return;
            try {
                const response = await API.get("/users/profile", {
                    headers: { Authorization: `Bearer ${user.token}` },
                    withCredentials: false,
                });
                const updatedUser = { ...user, ...response.data.user };
                dispatch(setUser(updatedUser));
                // dispatch(setUser(response.data.user));
                // console.log(user)
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        // Call fetchUser here
        fetchUser();


    }, [dispatch, user?.token]);






    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Sidebar - shown second on small screens, left side on md+ */}
            <aside className="md:col-span-1 space-y-4 order-2 md:order-none">
                <Link
                    to={`/orders/${user.id}`}
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                >
                    My Orders
                </Link>
                <Link
                    to={`/address/${user.id}`}
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                >
                    Address
                </Link>
                <Link
                    to={`/change-password/${user.id}`}
                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                >
                    Change password
                </Link>
            </aside>

            {/* Main Content - shown first on small screens */}
            <main className="md:col-span-3 order-1 md:order-none bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">User Information</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                </form>
            </main>


        </div>


    );
}

export default UserProfile;
