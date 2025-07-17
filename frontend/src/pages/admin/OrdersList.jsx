import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import API from '../../api/axiosInstance';
import { Link } from "react-router-dom";

const OrdersList = () => {

    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        limit: 10,
    });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async (page = 1, limit = 10) => {
        try {
            const { data } = await API.get(`/orders?page=${page}&limit=${limit}`);
            setOrders(data.orders);
            // console.log(data.orders)
            setPagination({
                currentPage: data.pagination.currentPage,
                totalPages: data.pagination.totalPages,
                totalProducts: data.pagination.totalProducts,
                limit: data.pagination.limit,
            });
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchAllOrders(page, pagination.limit);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">All Orders</h2>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (!orders || orders.length === 0) ? (
                <p className="text-gray-600">There are no orders yet.</p>
            ) : (
                <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">By User</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Paid</th>
                                <th className="p-4">Delivered</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 transition duration-150">
                                    <td className="p-4 font-medium text-gray-800">{order._id.slice(0, 6)}...</td>
                                    <td className="p-4 font-medium ">
                                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                            {order.user.email}
                                        </span></td>
                                    <td className="p-4 text-green-600 font-semibold">EGP {order.totalPrice}</td>
                                    <td className="p-4">
                                        <span className={`inline-block text-xs px-2 py-1 rounded-full ${order.paymentStatus === "pending" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                            {order.paymentStatus === "pending" ? "No" : "Yes"}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block text-xs px-2 py-1 rounded-full ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {order.isDelivered ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <Link
                                            to={`/order/${order._id}`}
                                            className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition hover:scale-105 cursor-pointer"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
}

export default OrdersList;
