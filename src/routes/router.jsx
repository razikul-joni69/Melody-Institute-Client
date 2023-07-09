import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Pages from "../layout/Pages.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Instructors from "../pages/Instructors.jsx";
import Classes from "../pages/Classes.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import SelectedClasses from "../components/Students/SelectedClasses.jsx";
import EnrolledClasses from "../components/Students/EnrolledClasses.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages/>,
        children: [
            {
                path: "/home",
                element: <Home/>
            }, {
                path: "/instructors",
                element: <Instructors/>
            }, {
                path: "classes",
                element: <Classes/>
            }, {
                path: "/dashboard",
                element: <Dashboard/>
            }, {
                path: "/login",
                element: <Login/>
            }, {
                path: "/register",
                element: <Register/>
            }
        ]
    }, {
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
            {
                path: "selected-classes",
                element: <SelectedClasses/>
            }, {
                path: "enrolled-classes",
                element: <EnrolledClasses/>
            }
        ]
    }, {
        path: "*",
        element: <NotFound/>
    }
])

export default router;