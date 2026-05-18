import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const ProtectedWrapper = () => {
    const { user, loading } = useAuth();

    if (loading) {
        console.log("loading...");   
        return null;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedWrapper;
