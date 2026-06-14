
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, type Role } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: Role[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <Navigate
        to="/catalog"
        state={{ unauthorized: true, requiredRoles: allowedRoles }}
        replace
      />
    );
  }

  return <Outlet />;
}