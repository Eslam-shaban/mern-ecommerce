import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactSortable } from "react-sortablejs";
import BackBtn from "../../components/BackBtn";

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
        images: [],
    });

    // Fetch product data
    const fetchProduct = async () => {
        try {
            const { data } = await API.get(`/products/${id}`);
            // console.log("data:", data);
            setFormData({
                name: data.product.name || "",
                price: data.product.price || "",
                stock: data.product.stock || "",
                category: data.product.category || "",
                description: data.product.description || "",
                images: data.product.images || [],
            });

        } catch (err) {
            toast.error("Failed to fetch product");
            console.error(err);
        }
    };


    const fetchCategories = async () => {
        try {
            const { data } = await API.get("/products/categories");
            setCategories(data.categories);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_unsigned_preset");

        try {
            setUploading(true);
            const res = await fetch("https://api.cloudinary.com/v1_1/eslam-shaban/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            const imageUrl = data.secure_url;

            // console.log("Uploaded image:", imageUrl);
            setFormData((prev) => ({ ...prev, images: [...prev.images, imageUrl] }));
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/products/${id}`, formData);
            toast.success("Product updated");
            navigate("/dashboard/products");
        } catch (err) {
            toast.error("Update failed");
            console.error(err);
        }
    };

    return (
        <div className="relative">
            <BackBtn />

            <div className="p-6 bg-white rounded-2xl shadow-md max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-0"
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Price (EGP)</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                required
                                className="w-full px-4  py-3 border-2 border-gray-400 rounded-sm pr-12 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-0"
                            />
                            <span className="absolute right-4 top-2.5 text-gray-400 font-semibold">EGP</span>
                        </div>
                    </div>

                    {/* Stock Input */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Stock</label>
                        <div className="relative">
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Quantity"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-400 rounded-sm pr-12 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-0"
                            />
                            <span className="absolute right-4 top-2.5 text-gray-400 font-semibold">pcs</span>
                        </div>
                    </div>

                    {/* Category Select */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Category</label>
                        <div className="relative">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-400 rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-0"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Product description"
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-400 rounded-md focus:outline-none focus:border-amber-400 "
                        ></textarea>
                    </div>

                    {/* Image Preview (ReactSortable stays here) */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Product Images</label>
                        <ReactSortable
                            list={formData.images}
                            setList={(newList) =>
                                setFormData((prev) => ({ ...prev, images: newList }))
                            }
                            animation={200}
                            className="flex flex-wrap gap-4 mb-2"
                        >
                            {formData.images.map((url, index) => (
                                <div key={index} className="relative w-24 h-24 rounded overflow-hidden border shadow-sm group">
                                    <img
                                        src={url}
                                        loading="lazy"
                                        alt={`product-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Delete Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedImages = [...formData.images];
                                            updatedImages.splice(index, 1);
                                            setFormData((prev) => ({ ...prev, images: updatedImages }));
                                        }}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition"
                                        title="Remove"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </ReactSortable>
                    </div>

                    {/* Upload Image with Icon */}
                    <div>
                        <label
                            htmlFor="imageUpload"
                            className="flex items-center gap-2 px-4 py-2 border border-dashed border-amber-400 rounded-lg text-amber-600 cursor-pointer hover:bg-amber-50 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3m-6-4V4h6v4" />
                            </svg>
                            <span>Upload Image</span>
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition disabled:cursor-not-allowed"
                    >
                        {uploading ? "Uploading Image..." : "Save Changes"}
                    </button>
                </form>

            </div >
        </div>
    );
};

export default EditProduct;
