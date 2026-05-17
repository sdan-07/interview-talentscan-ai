import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const ProtectedWrapper = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1>Please wait. Loading....</h1>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedWrapper;
