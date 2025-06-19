import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../store/authSlice";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import logo from "/logo2.svg";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { searchQuery, setSearchQuery, handleSearch } = useSearch();
    const { cartItems } = useCart();
    const cartCount = cartItems.length || 0;
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setMenuOpen(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!user || !user.token) return;
            try {
                const response = await API.get("/users/profile", {
                    headers: { Authorization: `Bearer ${user.token}` },
                    withCredentials: true,
                });
                dispatch(setUser(response.data.user));
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [dispatch, user?.token]);

    return (
        <>
            <nav className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-300 text-white p-4 flex justify-between items-center shadow-lg relative z-50">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 w-72 h-14">
                    <img src={logo} alt="Logo" />
                </Link>

                {/* Search Bar */}
                <div className="w-1/3 hidden md:block">
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-10/12 px-4 py-2 rounded-s-lg bg-amber-50/35  border-amber-400 focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(searchQuery);
                                }
                            }}

                        />
                        <div className="flex items-center justify-center p-2 bg-white/80 w-2/12 rounded-r-lg text-amber-500 cursor-pointer hover:text-black">
                            <Search
                                className=""
                                size={20}
                                onClick={() => {
                                    handleSearch(searchQuery);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Cart and Menu Toggle */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <Link to="/products/cart" className="relative">
                        <ShoppingCart size={24} className="text-white hover:text-gray-800 transition" />
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                            {cartCount}
                        </span>
                    </Link>

                    {/* Desktop Auth Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-black font-bold transition">Login</Link>
                                <Link to="/register" className="hover:text-black font-bold transition">Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} className="cursor-pointer hover:text-red-600" /> : <Menu size={28} className="cursor-pointer hover:text-black" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="bg-orange-100/50 text-gray-800 w-full p-4 flex flex-col space-y-4 md:hidden shadow-md absolute z-40 top-[72px] left-0">
                    <div className="w-full p-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md bg-amber-50/35 border-b border-gray-100 focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(searchQuery);
                                    setMenuOpen(false); // optional: close mobile menu if open
                                }
                            }}

                        />
                    </div>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-center text-2xl font-bold p-2 hover:text-amber-600 border-b border-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-center text-2xl font-bold p-2 hover:text-amber-600"
                                onClick={() => setMenuOpen(false)}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar;
