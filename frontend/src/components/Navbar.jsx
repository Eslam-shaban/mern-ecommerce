import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, setUser } from "../store/authSlice";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";
import { Search, ShoppingCart, Menu, X, CircleUser } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import logo from "/logo2.svg";
// import { useCart } from "../contexts/CartContext";
import { clearCart } from '../store/cartSlice'
import { User, LogOut, LogIn, UserPlus, Package, ChevronDown, LayoutDashboard } from "lucide-react";
import { useRef } from "react";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { searchQuery, setSearchQuery, handleSearch } = useSearch();
    // const { cartItems, clearCart } = useCart();
    const { cartItems } = useSelector((state) => state.cart);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const handleLogout = () => {
        dispatch(clearCart());                 // ✅ Safe to call here
        dispatch(logout()); // No need to pass clearCart inside
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!user || !user.token) return;
            try {
                const response = await API.get("/users/profile", {
                    headers: { Authorization: `Bearer ${user.token}` },
                    withCredentials: false,
                });
                const updatedUser = { ...user, ...response.data.user };
                dispatch(setUser(updatedUser));
                // dispatch(setUser(response.data.user));
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        // Call fetchUser here
        fetchUser();

        // Handle outside click to close profile dropdown
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup event listener on unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch, user?.token]);


    return (
        <>
            <nav className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-400 text-white p-4 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center relative">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} loading="lazy" alt="Logo" className="h-10" />
                        {/* <span className="text-2xl font-bold">Veltrix</span> */}
                    </Link>

                    {/* Search - Desktop */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                                className="w-full px-4 py-2 rounded-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                            />
                            <Search
                                size={20}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 cursor-pointer"
                                onClick={() => handleSearch(searchQuery)}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">

                        <div className="hidden md:flex">

                            <div className="relative">
                                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                                    <CircleUser size={24} />
                                    {user ? <p>Hi, {user.name}</p> : <p>Account</p>}
                                    <ChevronDown size={16} />
                                </button>

                                {profileOpen && (
                                    <div ref={profileRef} className="absolute right-0 mt-3 w-48 text-black bg-white rounded-md shadow-lg z-50 overflow-hidden">
                                        {user ? (
                                            <div className="flex flex-col text-sm">
                                                {user?.isAdmin && (
                                                    <div>
                                                        <Link to="/dashboard"
                                                            onClick={() => setProfileOpen(false)}
                                                            className="px-4 py-2 hover:bg-orange-200 hover:font-medium flex items-center gap-2">
                                                            <LayoutDashboard size={18} />Dashboard
                                                        </Link>
                                                    </div>
                                                )}
                                                <Link to={`/profile/${user.id}`}
                                                    onClick={() => setProfileOpen(false)}
                                                    className="px-4 py-2 hover:bg-orange-200 hover:font-medium flex items-center gap-2">
                                                    <CircleUser size={16} /> Profile
                                                </Link>
                                                <Link to={`/orders/user/${user.id}`}
                                                    onClick={() => setProfileOpen(false)}
                                                    className="px-4 py-2 hover:bg-orange-200 hover:font-medium flex items-center gap-2">
                                                    <Package size={16} /> My Orders
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setProfileOpen(false);
                                                    }
                                                    }
                                                    className="w-full text-left px-4 py-2 hover:bg-red-100 hover:font-medium text-red-600 flex items-center gap-2 cursor-pointer"
                                                >
                                                    <LogOut size={16} /> Sign Out
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col text-sm p-2">
                                                <Link to="/login"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="px-4 py-2 hover:bg-amber-100 hover:font-medium border-b-1 border-amber-200 flex items-center gap-2">
                                                    <LogIn size={16} /> Login
                                                </Link>
                                                <Link to="/register"
                                                    onClick={() => {
                                                        setProfileOpen(false);
                                                    }}
                                                    className="px-4 py-2 hover:bg-amber-100 hover:font-medium flex items-center gap-2">
                                                    <UserPlus size={16} /> Register
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Shopping Cart */}
                        <Link to="/products/cart" className="relative">
                            <ShoppingCart className="text-white hover:text-black transition" size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu toggle */}
                        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? (
                                <X size={28} className="cursor-pointer text-white hover:text-red-600 hover:rotate-180 hover:scale-105 " />
                            ) : (
                                <Menu size={28} className="cursor-pointer text-white hover:text-black" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div ref={profileRef} className="md:hidden bg-orange-300/90 p-4 space-y-4 w-full absolute top-[72px] left-0 z-50">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
                        className="w-full px-4 py-2 rounded-md text-black bg-amber-50/35 border border-gray-700"
                    />
                    <div className="flex flex-col gap-2">
                        {user ? (
                            <>
                                <Link to={`/profile/${user.id}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2 rounded hover:bg-orange-200 hover:font-medium flex items-center gap-2">
                                    <CircleUser size={16} /> Profile
                                </Link>
                                <Link to={`/orders/${user.id}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2 rounded hover:bg-orange-200 hover:font-medium flex items-center gap-2">
                                    <Package size={16} /> My Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }} className="bg-red-500 text-white py-2 rounded hover:bg-red-600 cursor-pointer hover:scale-101">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded hover:bg-orange-200 hover:font-medium flex items-center gap-2">
                                    <LogIn size={16} /> Login
                                </Link>
                                <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2 rounded hover:bg-orange-200 hover:font-medium flex items-center gap-2">
                                    <UserPlus size={16} /> Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            )}
        </>
    );
};

export default Navbar;