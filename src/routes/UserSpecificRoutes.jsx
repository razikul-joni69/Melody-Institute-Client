/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { default as useGetAllUsers } from "../hooks/useGetCurrentUser";

export const AdminRoute = ({ children }) => {
    const location = useLocation();
    const [dbCurrentUser, dbCurrentUserLoading] = useGetAllUsers();

    if (dbCurrentUserLoading) {
        return <Loading />;
    }

    if (dbCurrentUser?.role === "admin") {
        return children;
    }

    return <Navigate state={{ from: location }} to="/" replace></Navigate>;
};

export const StudentRoute = ({ children }) => {
    const location = useLocation();
    const [dbCurrentUser, dbCurrentUserLoading] = useGetAllUsers();

    if (dbCurrentUserLoading) {
        return <Loading />;
    }

    if (dbCurrentUser?.role === "student") {
        return children;
    }

    return <Navigate state={{ from: location }} to="/" replace></Navigate>;
};

export const InstructorRoute = ({ children }) => {
    const location = useLocation();
    const [dbCurrentUser, dbCurrentUserLoading] = useGetAllUsers();

    if (dbCurrentUserLoading) {
        return <Loading />;
    }

    if (dbCurrentUser?.role === "instructor") {
        return children;
    }

    return <Navigate state={{ from: location }} to="/" replace></Navigate>;
};
