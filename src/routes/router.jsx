import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Pages from "../layout/Pages.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Instroctors from "../components/Instructors/Instroctors.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages/>,
        children: [
            {
                path: "/home",
                element: <Home/>
            }, {
                path: "instructors",
                element: <Instroctors/>
            }, {
                path: "/login",
                element: <Login/>
            }, {
                path: "/register",
                element: <Register/>
            }
        ]
    }, {
        path: "*",
        element: <NotFound/>
    }
])

export default router;