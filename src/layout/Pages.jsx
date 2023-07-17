import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

const Pages = () => {
    return (
        <div className="max-w-[1920px] mx-auto dark:bg-slate-800">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Pages;
