import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import API from '../../api/axiosInstance';
import { Link } from "react-router-dom";

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        limit: 10,
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchAllUsers = async (page = 1, limit = 10) => {
        try {
            const { data } = await API.get(`/users?page=${page}&limit=${limit}`);
            setUsers(data.users);
            setPagination({
                currentPage: data.pagination.currentPage,
                totalPages: data.pagination.totalPages,
                totalProducts: data.pagination.totalProducts,
                limit: data.pagination.limit,
            });
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchAllUsers(page, pagination.limit);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };

    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This user will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await API.delete(`/users/${userId}`);
                setUsers((prev) => prev.filter((u) => u._id !== userId));
                // fetchProducts(pagination.currentPage); // refresh the list
                Swal.fire("Deleted!", "Product has been deleted.", "success");
            } catch (error) {
                console.error("Delete failed:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };
    return (

        <div className="p-6 bg-white rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">All Users</h2>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (!users || users.length === 0) ? (
                <p className="text-gray-600">There are no Users.</p>
            ) : (
                <div className="overflow-x-auto rounded-2xl">
                    <table className="min-w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4">Actions</th>
                                <th className="p-4">Orders</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-50 transition duration-150">
                                    <td className="p-4 flex items-center gap-3">
                                        <span className="font-medium text-gray-800">{user.name}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                            {user.email}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-block text-xs px-2 py-1 rounded-full ${user.isAdmin ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {user.isAdmin ? "Admin" : "Customer"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition hover:scale-105 cursor-pointer"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <Link
                                            to={`/orders/user/${user._id}`}
                                            className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition hover:scale-105 cursor-pointer"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
}

export default UsersList;
