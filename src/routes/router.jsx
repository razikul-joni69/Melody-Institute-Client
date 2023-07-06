import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Pages from "../layout/Pages.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Instructors from "../pages/Instructors.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages/>,
        children: [
            {
                path: "/home",
                element: <Home/>
            },{
                path: "/instructors",
                element: <Instructors/>
            }, {
                path: "/login",
                element: <Login/>
            }, {
                path: "/register",
                element: <Register/>
            }
        ]
    },  {
        path: "*",
        element: <NotFound/>
    }
])

export default router;