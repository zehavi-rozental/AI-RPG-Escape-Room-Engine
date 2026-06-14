"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProtectedRoute;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("../context/AuthContext");
function ProtectedRoute({ allowedRoles, redirectTo = '/login', }) {
    const { isAuthenticated, role } = (0, AuthContext_1.useAuth)();
    const location = (0, react_router_dom_1.useLocation)();
    if (!isAuthenticated) {
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: redirectTo, state: { from: location }, replace: true });
    }
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/catalog", state: { unauthorized: true, requiredRoles: allowedRoles }, replace: true }));
    }
    return (0, jsx_runtime_1.jsx)(react_router_dom_1.Outlet, {});
}
