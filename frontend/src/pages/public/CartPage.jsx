import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart, clearCart, decreaseQuantity, calculateTotalPrice } = useCart();


    const total = calculateTotalPrice();

    // Inside the CartPage component
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map(item => (
                            <li key={item._id} className="flex justify-between items-center shadow-[0_8px_24px_0px_rgba(149,157,156,0.4)] p-4 rounded-md">
                                <div className='flex gap-5'>
                                    <div>
                                        <img src={item.images[0]} alt={item.name} className='w-20 h-20' />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold pb-4">{item.name}</h2>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="flex gap-2 text-amber-600 p-2 cursor-pointer rounded-md hover:bg-amber-600/30"
                                        >
                                            <Trash2Icon />  Remove
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <h2 className='text-2xl text-center'>${item.price} </h2>
                                    <div className='flex gap-5'>
                                        <button className={`px-2 rounded-md font-bold text-white text-xl cursor-pointer  ${item.quantity === 1 ? "bg-gray-400 disabled:cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"}`}
                                            onClick={() => decreaseQuantity(item._id)}
                                            disabled={item.quantity === 1}
                                        >-</button>
                                        <p>{item.quantity}</p>
                                        <button className='px-2 bg-amber-500 rounded-md font-bold text-white text-xl cursor-pointer hover:bg-amber-600'
                                            onClick={() => addToCart(item)}>+</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
                        <button
                            onClick={clearCart}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
                        >
                            Clear Cart
                        </button>
                    </div>
                    <button
                        onClick={() => navigate('/shipping')}
                        className={`mt-4 px-4 py-2 rounded text-white ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                        disabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </button>

                </>
            )}
        </div>
    );
};

export default CartPage;
