import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from "../../api/axiosInstance";
import Pagination from '../../components/Pagination';
const UserOrders = () => {

    const { userId } = useParams();
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        limit: 10,
    });
    const [page, setPage] = useState(1);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };

    const fetchOrders = async () => {

        try {
            let url = `/orders/user/${userId}?page=${page}&limit=${pagination.limit}`;
            const { data } = await API.get(url);
            // console.log(data.orders);
            setOrders(data.orders)
            setPagination({
                currentPage: data.pagination.currentPage,
                totalPages: data.pagination.totalPages,
                totalProducts: data.pagination.totalProducts,
                limit: data.pagination.limit,
            });
        } catch (error) {
            console.log("Error fetching orders:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [page])


    return (
        <div className="p-6 bg-white rounded-2xl shadow-md max-w-6xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Orders</h2>
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
                                <th className="p-4">Date</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Paid</th>
                                <th className="p-4">Delivered</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 transition duration-150">
                                    <td className="p-4 font-medium text-gray-800">{order._id.slice(0, 6)}...</td>
                                    <td className="p-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
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

export default UserOrders;

// import { useEffect, useState } from "react";
// import API from "../../api/axiosInstance";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const UserOrders = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const user = useSelector((state) => state.auth.user);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const res = await API.get("/orders/my-orders", {
//                     headers: {
//                         Authorization: `Bearer ${user.token}`,
//                     },
//                 });
//                 setOrders(res.data);
//             } catch (err) {
//                 console.error("Failed to fetch orders", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (user?.token) fetchOrders();
//     }, [user]);

//     return (
//         <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded shadow">
//             <h2 className="text-xl font-bold mb-4">My Orders</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : orders.length === 0 ? (
//                 <p>You have no orders.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-sm text-left border">
//                         <thead className="bg-gray-100">
//                             <tr>
//                                 <th className="p-2 border">ID</th>
//                                 <th className="p-2 border">Date</th>
//                                 <th className="p-2 border">Total</th>
//                                 <th className="p-2 border">Paid</th>
//                                 <th className="p-2 border">Delivered</th>
//                                 <th className="p-2 border">Details</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {orders.map((order) => (
//                                 <tr key={order._id}>
//                                     <td className="p-2 border">{order._id.slice(0, 6)}...</td>
//                                     <td className="p-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
//                                     <td className="p-2 border">EGP {order.totalPrice}</td>
//                                     <td className="p-2 border">
//                                         {order.isPaid ? (
//                                             <span className="text-green-600">Yes</span>
//                                         ) : (
//                                             <span className="text-red-600">No</span>
//                                         )}
//                                     </td>
//                                     <td className="p-2 border">
//                                         {order.isDelivered ? (
//                                             <span className="text-green-600">Yes</span>
//                                         ) : (
//                                             <span className="text-red-600">No</span>
//                                         )}
//                                     </td>
//                                     <td className="p-2 border">
//                                         <Link
//                                             to={`/order/${order._id}`}
//                                             className="text-blue-600 hover:underline"
//                                         >
//                                             View
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserOrders;