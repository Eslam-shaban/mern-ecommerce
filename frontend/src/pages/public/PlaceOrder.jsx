import React from 'react';

import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../contexts/CartContext';
import { clearCart } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';
import API from '../../api/axiosInstance';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const PlaceOrder = () => {
    // const { cartItems, clearCart, calculateTotalPrice } = useCart();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [paymentMethod, setPaymentMethod] = useState('cash-on-delivery');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 20;
    const totalPrice = itemsPrice + shippingPrice;
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {
        address: '',
        city: '',
        state: '',
        country: ''
    };

    const placeOrder = async () => {
        const orderItems = cartItems.map(item => ({
            product: item._id,
            name: item.name || '',
            images: item.images || [],
            price: item.price,
            quantity: item.quantity
        }));
        try {
            const orderData = {
                shippingAddress,
                orderItems,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
            };

            const res = await API.post('/orders', orderData);
            console.log('Order response:', res.data);

            if (res.data.createdOrder?._id) {
                console.log("Order ID:", res.data.createdOrder._id);

                if (paymentMethod === 'cash-on-delivery') {
                    // console.log("here inside cash on delivery")
                    dispatch(clearCart()); // ✅ you're doing this
                    // localStorage.removeItem('cart'); // ✅ fix the key name
                    navigate(`/order/${res.data.createdOrder._id}`);
                } else if (paymentMethod === 'card-stripe') {
                    navigate(`/payment/stripe/${res.data.createdOrder._id}`);
                }
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            toast.error('Failed to place order. Try again.');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                {/* Shipping Info */}
                <div className="bg-white p-4 rounded shadow-[1px_1px_3px_2px_rgba(0,0,0,0.1)]">
                    <h3 className="text-xl font-semibold mb-2">Shipping</h3>
                    <p><strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.country}</p>
                </div>

                {/* Cart Items */}
                <div className="bg-white p-4 rounded shadow-[1px_1px_3px_2px_rgba(0,0,0,0.1)]">
                    <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map(item => (
                                <li key={item._id} className="flex justify-between  not-last:border-b border-gray-400 pb-2">
                                    <div className="flex gap-4 items-center">
                                        <img loading="lazy" src={item.images[0]} alt={item.name} className="w-16 h-16 object-contain rounded" />
                                        <span>{item.name}</span>
                                    </div>
                                    <div>
                                        {item.quantity} x EGP {item.price.toFixed(2)} = <strong>EGP {(item.quantity * item.price).toFixed(2)}</strong>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Summary */}
            <div className="bg-white p-4 rounded shadow-[1px_1px_3px_2px_rgba(0,0,0,0.1)] h-fit">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <ul className="space-y-2">
                    <li className="flex justify-between">
                        <span>Items:</span>
                        <span>EGP {itemsPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Shipping:</span>
                        <span>EGP {shippingPrice.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>EGP {totalPrice.toFixed(2)}</span>
                    </li>
                </ul>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="cash-on-delivery">Cash on Delivery</option>
                        <option value="card-stripe">Using Card</option>
                    </select>
                </div>
                <button
                    onClick={placeOrder}
                    disabled={cartItems.length === 0}
                    className="mt-6 w-full py-2 cursor-pointer bg-amber-500 text-white font-semibold rounded hover:bg-amber-600"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default PlaceOrder;
