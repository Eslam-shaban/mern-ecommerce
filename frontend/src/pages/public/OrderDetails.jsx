import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axiosInstance";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await API.get(`/orders/${orderId}`);
                setOrder(res.data.order);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!order) return <p className="p-4 text-red-500">Order not found</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Order #{order._id}</h1>

            {/* Shipping Info */}
            <div className="bg-white p-4 shadow-lg rounded">
                <h2 className="text-lg font-semibold mb-2">Shipping Info</h2>
                <p><strong>Name:</strong> {order.user.name}</p>
                <p><strong>Email:</strong> {order.user.email}</p>
                <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}</p>
            </div>

            {/* Payment */}
            <div className="bg-white p-4 shadow-lg rounded">
                <h2 className="text-lg font-semibold mb-2">Payment</h2>
                <p><strong>Method:</strong> {order.paymentMethod}</p>
                <p><strong>Status:</strong> {order.paymentStatus}</p>
            </div>
            {/* Items */}
            <div className="bg-white p-4 shadow-lg rounded">
                <h2 className="text-lg font-semibold mb-2">Items</h2>
                <ul className="divide-y divide-gray-500">
                    {order.orderItems.map((item) => (
                        <li key={item.product} className="py-3 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <img src={item.images[0]} alt={item.name} loading="lazy" className="w-16 h-16 object-cover rounded" />
                                <span>{item.name}</span>
                            </div>
                            <div>
                                {item.quantity} × EGP {item.price.toFixed(2)} = <strong>EGP {(item.quantity * item.price).toFixed(2)}</strong>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Total */}
            <div className="bg-white p-4 shadow-lg rounded text-left">
                <p><strong>Items Price:</strong> EGP {order.itemsPrice.toFixed(2)}</p>
                <p><strong>Shipping:</strong> EGP {order.shippingPrice.toFixed(2)}</p>
                <p className="text-lg font-bold"><strong>Total:</strong> EGP {order.totalPrice.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderDetails;
