import { createBrowserRouter } from "react-router-dom";
import CheckoutForm from "../components/Checkout/CheckoutForm.jsx";
import ManageClasses from "../components/Dashboard/Admin/ManageClasses.jsx";
import ManageUsers from "../components/Dashboard/Admin/ManageUsers.jsx";
import AddClass from "../components/Dashboard/Instructors/AddClass.jsx";
import ApprovedClasses from "../components/Dashboard/Instructors/ApprovedClasses.jsx";
import MyClasses from "../components/Dashboard/Instructors/MyClasses.jsx";
import RejectedClasses from "../components/Dashboard/Instructors/RejectedClasses.jsx";
import EnrolledClasses from "../components/Dashboard/Students/EnrolledClasses.jsx";
import PaymentHistory from "../components/Dashboard/Students/PaymentHistory.jsx";
import SelectedClasses from "../components/Dashboard/Students/SelectedClasses.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import UpdateUserProfile from "../components/UserProfile/UpdateUserProfile.jsx";
import UserProfile from "../components/UserProfile/UserProfile.jsx";
import Pages from "../layout/Pages.jsx";
import Classes from "../pages/Classes.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Home from "../pages/Home.jsx";
import Instructors from "../pages/Instructors.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import {
    AdminRoute,
    InstructorRoute,
    StudentRoute,
} from "./UserSpecificRoutes.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/instructors",
                element: <Instructors />,
            },
            {
                path: "/classes",
                element: <Classes />,
            },
            {
                path: "/user/profile",
                element: (
                    <PrivateRoute>
                        <UserProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/user/profile/update",
                element: (
                    <PrivateRoute>
                        <UpdateUserProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: "/dashboard/selected-classes",
                        element: (
                            <StudentRoute>
                                <SelectedClasses />
                            </StudentRoute>
                        ),
                    },
                    {
                        path: "/dashboard/enrolled-classes",
                        element: (
                            <StudentRoute>
                                <EnrolledClasses /> ,
                            </StudentRoute>
                        ),
                    },
                    {
                        path: "/dashboard/payment-history",
                        element: (
                            <StudentRoute>
                                <PaymentHistory /> ,
                            </StudentRoute>
                        ),
                    },
                    {
                        path: "/dashboard/checkout/:classId",
                        element: (
                            <StudentRoute>
                                <CheckoutForm /> ,
                            </StudentRoute>
                        ),
                    },
                    {
                        path: "/dashboard/all-classes",
                        element: (
                            <InstructorRoute>
                                <MyClasses />
                            </InstructorRoute>
                        ),
                    },
                    {
                        path: "/dashboard/add-class",
                        element: (
                            <InstructorRoute>
                                <AddClass />
                            </InstructorRoute>
                        ),
                    },
                    {
                        path: "/dashboard/approved-classes",
                        element: (
                            <InstructorRoute>
                                <ApprovedClasses />
                            </InstructorRoute>
                        ),
                    },
                    {
                        path: "/dashboard/rejected-classes",
                        element: (
                            <InstructorRoute>
                                <RejectedClasses />
                            </InstructorRoute>
                        ),
                    },
                    {
                        path: "/dashboard/manage-users",
                        element: (
                            <AdminRoute>
                                <ManageUsers />
                            </AdminRoute>
                        ),
                    },
                    {
                        path: "/dashboard/manage-classes",
                        element: (
                            <AdminRoute>
                                <ManageClasses />
                            </AdminRoute>
                        ),
                    },
                ],
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
