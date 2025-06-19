import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ProductDetails from "../pages/public/ProductDetails";
import CartPage from "../pages/public/CartPage";
import DashboardLayout from "../pages/admin/DashboardLayout";
import Overview from "../pages/admin/Overview";
import ProductsList from "../pages/admin/ProductsList";
import Categories from "../pages/admin/Categories";
import OrdersList from "../pages/admin/OrdersList";
import UsersList from "../pages/admin/UsersList";
import Settings from "../pages/admin/Settings";
import EditProduct from "../pages/admin/EditProduct";
import AddProduct from "../pages/admin/AddProduct";

const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/cart" element={<CartPage />} />

            {/* Admin Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="products" element={<ProductsList />} />
                <Route path="products/:id/edit" element={<EditProduct />} />
                <Route path="products/new" element={<AddProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="orders" element={<OrdersList />} />
                <Route path="users" element={<UsersList />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>

    );
};

export default AppRouter;
