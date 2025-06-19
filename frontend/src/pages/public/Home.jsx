// ----------------------------first approach Auto Search----------------------------------
import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import Product from "../../components/Product";
import { useSearch } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Carousel from "../../components/Carousel";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
        limit: 10,
    });
    const [page, setPage] = useState(1);

    const { searchQuery, searchError } = useSearch();
    const navigate = useNavigate();

    const handleProductClick = (product) => {
        navigate(`/products/${product._id}`);
    };

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const { data } = await API.get("/products/categories");
            setCategories(data.categories);
            // console.log(data.categories)
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    // Fetch products (all, search, or category based)
    const fetchProducts = async () => {
        try {
            let url = `/products?page=${page}&limit=${pagination.limit}`;

            if (searchQuery) {
                url = `/products/search?search=${searchQuery}&page=${page}&limit=${pagination.limit}`;
            } else if (activeCategory) {
                const encodedCategory = encodeURIComponent(activeCategory);
                url = `/products/category/${encodedCategory}?page=${page}&limit=${pagination.limit}`;
            }

            const { data } = await API.get(url);
            setProducts(data.products);
            setPagination({
                currentPage: data.pagination.currentPage,
                totalPages: data.pagination.totalPages,
                totalProducts: data.pagination.totalProducts,
                limit: data.pagination.limit,
            });
        } catch (error) {
            console.error("Error fetching products", error);
            setProducts([]);
        }
    };

    // Unified useEffect to fetch products
    useEffect(() => {
        fetchProducts();
    }, [page, searchQuery, activeCategory]);

    // Fetch categories once on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setPage(1); // Reset page when category changes
    };

    const clearCategory = () => {
        setActiveCategory(null);
        setPage(1);
    };

    return (
        <div>
            {/* Carousel Section */}
            <Carousel />

            {/* Category Filter Section */}
            <h2 className="text-2xl text-center font-bold my-4">Products Category</h2>
            <div className="flex flex-wrap justify-center gap-2 my-4">
                <button
                    onClick={clearCategory}
                    className={`px-6 py-2 rounded-full font-semibold transition-all hover:cursor-pointer ${activeCategory === null ? "bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md" : "bg-gray-200 hover:bg-amber-400"
                        }`}
                >
                    All
                </button>
                {categories.map((category, index) => (
                    <button
                        key={`${category}-${index}`}
                        onClick={() => handleCategoryClick(category)}
                        className={`px-6 py-2 rounded-full font-semibold transition-all hover:cursor-pointer ${activeCategory === category ? "bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md" : "bg-gray-200 hover:bg-amber-400"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Cards */}
            <div className="flex flex-wrap gap-4 justify-center">
                {searchError ? (
                    <p>Something went wrong. Please try again.</p>
                ) : products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((product) => (
                        <Product key={product._id} product={product} onClick={() => handleProductClick(product)} />
                    ))
                )}
            </div>

            {/* Pagination */}
            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
};

export default Home;

//--------------------------------second approach Button Search-------------------------------------
// import React, { useEffect, useState } from "react";
// import API from "../api/axiosInstance";
// import Product from "../components/Product";
// import Pagination from "../components/Pagination";
// import Carousel from "../components/Carousel";
// import { useSearch } from "../contexts/SearchContext";

// const Home = () => {
//     const [products, setProducts] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [activeCategory, setActiveCategory] = useState(null);
//     const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, limit: 10 });

//     const { searchedProducts, searchQuery, searchError } = useSearch();

//     // Use searched products if available
//     useEffect(() => {
//         if (searchedProducts.length > 0) {
//             setProducts(searchedProducts);
//             setPagination({
//                 currentPage: 1,
//                 totalPages: Math.ceil(searchedProducts.length / pagination.limit),
//                 limit: pagination.limit,
//             });
//         }
//     }, [searchedProducts]);

//     const fetchProducts = async (page = 1, limit = 10) => {
//         try {
//             const { data } = await API.get(`/products?page=${page}&limit=${limit}`);
//             setProducts(data.products);
//             setPagination(data.pagination);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const fetchCategories = async () => {
//         try {
//             const { data } = await API.get("/products/categories");
//             setCategories(data.categories);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleCategory = async (category) => {
//         setActiveCategory(category);
//         try {
//             const encoded = encodeURIComponent(category);
//             const { data } = await API.get(`/products/category/${encoded}?page=1&limit=${pagination.limit}`);
//             setProducts(data.products);
//             setPagination(data.pagination);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handlePageChange = (page) => {
//         if (activeCategory) {
//             handleCategory(activeCategory);
//         } else {
//             fetchProducts(page, pagination.limit);
//         }
//     };

//     useEffect(() => {
//         fetchProducts(1, pagination.limit);
//         fetchCategories();
//     }, []);

//     return (
//         <div>
//             <Carousel />
//             <SearchBar />

//             <div className="flex flex-wrap justify-center gap-2 my-4">
//                 <button
//                     className={`px-6 py-2 rounded-full ${!activeCategory ? "bg-yellow-400" : "bg-gray-200"}`}
//                     onClick={() => {
//                         fetchProducts();
//                         setActiveCategory(null);
//                     }}
//                 >
//                     All
//                 </button>
//                 {categories.map((cat) => (
//                     <button
//                         key={cat}
//                         className={`px-6 py-2 rounded-full ${activeCategory === cat ? "bg-yellow-400" : "bg-gray-200"}`}
//                         onClick={() => handleCategory(cat)}
//                     >
//                         {cat}
//                     </button>
//                 ))}
//             </div>

//             <div className="flex flex-wrap justify-center gap-4">
//                 {searchError ? (
//                     <p className="text-red-500">{searchError}</p>
//                 ) : products.length === 0 ? (
//                     <p>No products found.</p>
//                 ) : (
//                     products.map((p) => <Product key={p._id} product={p} />)
//                 )}
//             </div>

//             <Pagination pagination={pagination} onPageChange={handlePageChange} />
//         </div>
//     );
// };

// export default Home;




