import React from 'react'
import { toast } from 'react-toastify';
// import { useCart } from '../contexts/CartContext';
import { addToCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

function Product({ product, onClick }) {
    // const { addToCart } = useCart();
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        if (product.stock <= 0) {
            toast.error(`${product.name} is out of stock.`);
            return;
        }
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-gray-100 w-full sm:w-1/3 md:w-1/5 lg:w-1/6 h-[400px]  flex flex-col cursor-pointer hover:shadow-lg hover:scale-101 transition duration-300 ease-in-out" >
            <figure className="flex-2/3 bg-gray-50"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
                onClick={onClick}>
                <img loading="lazy" src={product.images[0]} alt={product.name} className="h-full object-contain" />
            </figure>
            <div className="card-body flex-1/3 flex flex-col justify-between " >
                <div onClick={onClick}>
                    <h2 className="card-title text-base-content text-[1rem]">{product.name}</h2>
                    <p className='text-2xl font-bold pl-1'>${product.price}</p>
                </div>
                <div className="card-actions justify-start">
                    <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={handleAddToCart}
                    >Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product