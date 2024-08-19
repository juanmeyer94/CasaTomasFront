import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminContext from "../Context/AdminContext/adminActions";

interface ProtectedRouteProps {
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { isAuth } = useContext(AdminContext) || { isAuth: false };

    return isAuth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
