import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { Pencil, Trash } from "lucide-react";
import Pagination from "../../components/Pagination";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        limit: 10,
    });
    const [page, setPage] = useState(1);

    const fetchProducts = async (page = 1, limit = 10) => {
        try {
            const { data } = await API.get(`/products?page=${page}&limit=${limit}`);
            setProducts(data.products);
            setPagination({
                currentPage: data.pagination.currentPage,
                totalPages: data.pagination.totalPages,
                totalProducts: data.pagination.totalProducts,
                limit: data.pagination.limit,
            });
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };
    useEffect(() => {
        fetchProducts(page, pagination.limit);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };
    const handleDelete = async (productId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This product will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await API.delete(`/products/${productId}`);
                setProducts((prev) => prev.filter((p) => p._id !== productId));
                // fetchProducts(pagination.currentPage); // refresh the list
                Swal.fire("Deleted!", "Product has been deleted.", "success");
            } catch (error) {
                console.error("Delete failed:", error);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };


    return (
        <div className="p-6 bg-white rounded-2xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">All Products</h2>
                <button className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition cursor-pointer"
                    onClick={() => navigate("/dashboard/products/new")}>
                    + Add Product
                </button>
            </div>

            <div className="overflow-x-auto rounded-2xl">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            {/* <th className="p-4">Created</th> */}
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b hover:bg-gray-50 transition duration-150">
                                <td className="p-4 flex items-center gap-3">
                                    <img
                                        src={product.images?.[0] || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-10 h-10 rounded object-cover border border-gray-400"
                                    />
                                    <span className="font-medium text-gray-800">{product.name}</span>
                                </td>
                                <td className="p-4">
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4 text-green-600 font-semibold">${product.price}</td>
                                <td className="p-4">
                                    <span
                                        className={`inline-block text-xs px-2 py-1 rounded-full ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                    </span>
                                </td>
                                {/* <td className="p-4 text-gray-500">
                                    {new Date(product.createdAt).toLocaleDateString()}
                                </td> */}
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition hover:scale-105 cursor-pointer"
                                            onClick={() => navigate(`/dashboard/products/${product._id}/edit`)}>
                                            <Pencil size={16} />
                                        </button>
                                        <button className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition hover:scale-105 cursor-pointer"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
};

export default ProductsList;
