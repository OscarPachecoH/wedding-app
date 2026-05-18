import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({
    user,
    allowedRoles = [],
    children
}) => {
    // No autenticado
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Ruta con restricción de roles
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};