import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivteRoute = () => {

    const { user } = useSelector((state) => state.auth);
    return user ? <Outlet /> : <Navigate to="/login" replace />;

}

export default PrivteRoute;
