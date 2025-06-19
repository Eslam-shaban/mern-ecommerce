import React from 'react'
import { toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';

function Product({ product, onClick }) {

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        if (product.stock <= 0) {
            toast.error(`${product.name} is out of stock.`);
            return;
        }
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="card bg-base-100 shadow-sm border border-gray-100 w-full sm:w-1/3 md:w-1/5 lg:w-1/6 h-[400px]  flex flex-col cursor-pointer hover:shadow-lg hover:scale-101 transition duration-300 ease-in-out" >
            <figure className="flex-2/3 bg-gray-50" onClick={onClick}>
                <img src={product.images[0]} alt={product.name} className="h-full object-contain" />
            </figure>
            <div className="card-body flex-1/3 flex flex-col justify-between " >
                <div onClick={onClick}>
                    <h2 className="card-title text-base-content text-[1rem]">{product.name}</h2>
                    <p className='text-2xl font-bold pl-1'>${product.price}</p>
                </div>
                <div className="card-actions justify-start">
                    <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={() => handleAddToCart(product)}
                    >Add to Cart</button>
                </div>
            </div>
        </div>

        // <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
        //     <img src={product.images[0]} className="w-full h-40 object-cover rounded-md" alt={product.name} />
        //     <h3 className="mt-2 font-semibold">{product.name}</h3>
        //     <p className="text-gray-500">${product.price}</p>
        //     <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md">Add to Cart</button>
        // </div>
    )
}

export default Product