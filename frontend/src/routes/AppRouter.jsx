import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import ProductDetails from "../pages/public/ProductDetails";
import CartPage from "../pages/public/CartPage";
import DashboardLayout from "../pages/admin/DashboardLayout";
import Overview from "../pages/admin/Overview";
import ProductsList from "../pages/admin/ProductsList";
// import Categories from "../pages/admin/Categories";
import OrdersList from "../pages/admin/OrdersList";
import UsersList from "../pages/admin/UsersList";
import Settings from "../pages/admin/Settings";
import EditProduct from "../pages/admin/EditProduct";
import AddProduct from "../pages/admin/AddProduct";
import PrivateRoute from "./PrivteRoute";
import AdminRoute from "./AdminRoute";
import UserProfile from "../pages/public/UserProfile";
import UserOrders from "../pages/public/UserOrders";
import ChangePassword from "../pages/public/ChangePassword";
import ShippingForm from "../pages/public/ShippingForm";
import PlaceOrder from "../pages/public/PlaceOrder";
import Payment from "../pages/public/Payment";
import OrderDetails from "../pages/public/OrderDetails";
import StripePayment from "../pages/public/StripePayment";

const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/cart" element={<CartPage />} />

            {/* Protected Routes (Signed-in users only) */}
            <Route element={<PrivateRoute />}>
                {/* Could place /profile or /orders/user routes here later */}
                <Route path="/profile/:userId" element={<UserProfile />} />
                <Route path="/orders/user/:userId" element={<UserOrders />} />
                <Route path="/change-password/:userId" element={<ChangePassword />} />
                <Route path="/shipping/" element={<ShippingForm />} />
                <Route path="/place-order/" element={<PlaceOrder />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route path="/payment/stripe/:orderId" element={<StripePayment />} />

            </Route>

            {/* Admin Routes (Signed-in & isAdmin only) */}
            <Route element={<AdminRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="products" element={<ProductsList />} />
                    <Route path="products/:id/edit" element={<EditProduct />} />
                    <Route path="products/new" element={<AddProduct />} />
                    <Route path="orders" element={<OrdersList />} />
                    <Route path="users" element={<UsersList />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

        </Routes>

    );
};

export default AppRouter;
