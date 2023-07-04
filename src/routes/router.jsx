import {BrowserRouter, createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Pages from "../layout/Pages.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Pages/>,
        children: [
            {
                path: "/",
                element: <Home/>
            }
        ]
    }, {
        path: "*",
        element: <NotFound/>
    }
])

export default router;