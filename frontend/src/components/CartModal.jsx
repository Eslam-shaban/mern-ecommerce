import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ onClose, product }) => {

    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 bg-black/50  z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-2xl text-center text-amber-600 font-semibold mb-4">Item Added to Cart</h2>
                <div className='flex flex-row items-center gap-2 my-4'>
                    <div>
                        <img src={product.images[0]} alt={
                            product.name} className='w-20 h-20' />
                    </div>
                    <div className='flex flex-col'>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">{product.name}</h3>
                        <div className="text-2xl font-semibold mb-2">${product.price}</div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 "
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={() => {
                            // Navigate to checkout or perform checkout action
                            // onClose();
                            navigate("/products/cart")
                        }}
                        className="px-4 py-2 bg-amber-400 text-white rounded cursor-pointer hover:bg-amber-500 "
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;


// import React from 'react';

// const CartModal = () => {
//     return (
//         <div className='absolute top-2/4 left-2/4 w-90 h-90 bg-gray-200 shadow-md z-50 '>
//             <div className='flex items-center gap-2'>

//                 <button>Continue Shopping</button>
//                 <button>Checkout List</button>
//             </div>
//         </div>
//     );
// }

// export default CartModal;
