import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    }
])

export default router;