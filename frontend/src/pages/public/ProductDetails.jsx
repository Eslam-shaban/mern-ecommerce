import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axiosInstance";
import { StarIcon } from "lucide-react";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import CartModal from "../../components/CartModal";
import { useCart } from "../../contexts/CartContext";
import { toast } from "react-toastify";




function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [selectedImage, setSelectedImage] = useState(""); // ✅ Track selected thumbnail
    const [isFading, setIsFading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (product.stock <= 0) {
            toast.error(`${product.name} is out of stock.`);
            return;
        }
        addToCart(product);
        setIsModalOpen(true); // Open modal
    };

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data.product);
                setMainImage(data.product.images[0]);
                setSelectedImage(data.product.images[0]); // ✅ Set first selected
            } catch (err) {
                setError("Product not found!", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProductById();
    }, [id]);

    if (loading) return <p>Loading product...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const averageRating =
        product.reviews.length > 0
            ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
            : 0;

    return (
        <div className="bg-gray-100 min-h-screen ">

            <div className="container mx-auto px-4 md:px-10 lg:px-20 py-10 bg-white">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Left side - Images */}
                    <div className="flex flex-col items-center">
                        {/* <img
                            src={mainImage}
                            alt={product.name}
                            className={`w-96 h-96 object-contain rounded-md mb-4 shadow-md
                                transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
                        /> */}
                        <InnerImageZoom
                            src={mainImage}
                            zoomSrc={mainImage} // or use a higher-res version if available
                            zoomType="click"
                            zoomPreload={true}
                            className={`w-96 h-96 object-contain rounded-md mb-4 shadow-md 
                                transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
                        />

                        {/* Thumbnails */}
                        <div className="flex gap-2 my-2">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    className={`w-20 h-20 object-contain cursor-pointer border-2 rounded-md 
                                    ${selectedImage === img ? "border-amber-400" : "border-gray-200"}
                                    hover:border-gray-800`}
                                    onClick={() => {
                                        if (img !== selectedImage) {
                                            setIsFading(true); // Start fade-out
                                            setTimeout(() => {
                                                setMainImage(img);
                                                setSelectedImage(img); // ✅ Set clicked image as selected
                                                setIsFading(false);
                                            }, 200);// Match this to transition duration
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right side - Details */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="text-2xl font-semibold mb-2">${product.price}</div>

                        {/* ⭐ Star rating */}
                        <div className="text-yellow-400 mb-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span key={index}>
                                    {index < Math.round(averageRating) ? "⭐" : "☆"}
                                </span>
                            ))}
                            <span className="text-gray-500 ml-2">
                                ({averageRating.toFixed(1)} rating)
                            </span>
                        </div>

                        {/* <StarRating rating={averageRating} />
                        <span className="text-gray-500 ml-2">
                            ({averageRating.toFixed(1)} rating)
                        </span> */}

                        {/* <div className="flex items-center gap-1 mb-4">
                            {RenderStars(averageRating)}
                            <span className="text-gray-500 ml-2">({averageRating.toFixed(1)} rating)</span>
                        </div> */}

                        <button className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition cursor-pointer"
                            onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && <CartModal product={product} onClose={() => setIsModalOpen(false)} />}
            </div>
        </div >
    );
}

export default ProductDetails;
