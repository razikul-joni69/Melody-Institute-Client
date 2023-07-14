import { createBrowserRouter } from "react-router-dom";
import ManageClasses from "../components/Dashboard/Admin/ManageClasses.jsx";
import ManageUsers from "../components/Dashboard/Admin/ManageUsers.jsx";
import AddClass from "../components/Dashboard/Instructors/AddClass.jsx";
import EnrolledClasses from "../components/Dashboard/Students/EnrolledClasses.jsx";
import SelectedClasses from "../components/Dashboard/Students/SelectedClasses.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import Pages from "../layout/Pages.jsx";
import Classes from "../pages/Classes.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Home from "../pages/Home.jsx";
import Instructors from "../pages/Instructors.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

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
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: "/dashboard/selected-classes",
                        element: <SelectedClasses />,
                    },
                    {
                        path: "/dashboard/enrolled-classes",
                        element: <EnrolledClasses />,
                    },
                    {
                        path: "/dashboard/add-class",
                        element: <AddClass />,
                    },
                    {
                        path: "/dashboard/manage-users",
                        element: <ManageUsers />,
                    },
                    {
                        path: "/dashboard/manage-classes",
                        element: <ManageClasses />,
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
