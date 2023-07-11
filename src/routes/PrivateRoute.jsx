/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />;
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default PrivateRoute;
