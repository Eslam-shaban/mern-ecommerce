import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Tags,
    ShoppingCart,
    Users,
    Settings,
    Menu,
    X,
    ArrowRightCircle,
    ArrowLeftCircle,
} from "lucide-react";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/dashboard/products", label: "Products", icon: Package },
        // { to: "/dashboard/categories", label: "Categories", icon: Tags },
        { to: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
        { to: "/dashboard/users", label: "Users", icon: Users },
        { to: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">

            {/* Sidebar */}
            <aside
                className={`bg-gray-800 text-white transition-all duration-300
                ${isSidebarOpen ? "w-64" : "w-20"}
                md:flex flex-col p-4`}
            >
                <div className="flex items-center justify-center md:justify-between mb-6">
                    <h2 className={`text-2xl font-bold flex-grow-1 ${isSidebarOpen ? "block" : "hidden"}`}>Admin</h2>
                    <button
                        className="text-white md:hidden"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <nav className="flex flex-col gap-4">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition-all
                                ${isActive ? "bg-gray-700 font-semibold" : ""}`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span className={`${isSidebarOpen ? "inline" : "hidden"}`}>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <button
                    className="mt-6 mx-auto mb-4 px-4 py-2 text-sm text-white bg-gray-700 hover:bg-gray-600 transition-all rounded-full flex items-center gap-2 shadow-sm hover:scale-105 z-50 overflow-hidden"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    {isSidebarOpen ? (
                        <>
                            <ArrowLeftCircle className="w-5 h-5 transition-transform duration-300" />
                            <span className="whitespace-nowrap">Collapse</span>
                        </>
                    ) : (
                        <ArrowRightCircle className="w-5 h-5 animate-left-right will-change-transform" />

                    )}
                </button>
            </aside>

            {/* Main content */}

            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
