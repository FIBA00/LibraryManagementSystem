import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../features/auth/hooks/useAuth.js";

export default function ProtectedRoute() {
    const { data, isLoading, isError } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }
    if (isError || !data) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(data.user.roles)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />;

}