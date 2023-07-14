import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { showErrorMessage } from "../../../utils/Notification.js";
import {
    adminNavigation,
    instructorNavigation,
    studentNavigation,
} from "../Navigation/Navigation.jsx";
import { AuthContext } from "../../../providers/AuthProvider.jsx";

const Sidebar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [dbuser, setdbUser] = useState({});
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/classes")
            .then((data) => setSelectedClasses(data?.data))
            .catch((err) => {
                showErrorMessage(err.message);
            });

        axios
            .get(`http://localhost:8000/api/v1/users/${user?.email}`)
            .then((data) => {
                setdbUser(data?.data);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });

        if (location.pathname == "/dashboard") {
            if (dbuser?.role === "student") {
                navigate("/dashboard/selected-classes");
            } else if (dbuser?.role === "instructor") {
                navigate("/dashboard/add-class");
            } else if (dbuser?.role === "admin") {
                navigate("/dashboard/manage-classes");
            }
        }
    }, [user, dbuser]);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    if (loading) {
        return <div>Loading....</div>;
    }

    return (
        <div>
            <button onClick={toggleSidebar}>
                {!sidebarVisible && (
                    <AiOutlineMenuUnfold className={`h-6 w-6 text-green-600`} />
                )}{" "}
            </button>

            <div className=" md:flex">
                <div
                    id="sidebar"
                    className={`${
                        sidebarVisible ? "md:visible" : "hidden"
                    } w-full  p-3 space-y-2 md:w-60 bg-gray-50 text-gray-800`}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg">Dashboard</h2>
                        <button onClick={toggleSidebar}>
                            {sidebarVisible ? (
                                <CgClose className={`h-6 w-6 text-red-600`} />
                            ) : (
                                <AiOutlineMenuUnfold className={`h-6 w-6`} />
                            )}{" "}
                        </button>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button
                                type="submit"
                                className="p-2 focus:outline-none focus:ring"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                    className="w-5 h-5 text-gray-600"
                                >
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            className="w-full py-2 pl-10 text-sm text-gray-800 bg-gray-100 border-transparent rounded-md focus:outline-none focus:bg-gray-50"
                        />
                    </div>
                    <div className="grid grid-cols-1 justify-items-center">
                        <img
                            src={user?.photoURL}
                            alt=""
                            className="w-24 h-24 bg-gray-500 rounded-full"
                        />
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold text-center">
                                {user?.displayName}
                            </h2>
                            <h5 className="text-center">
                                <span className=" badge">{user?.email}</span>
                            </h5>
                            <h5 className="text-center">
                                <span className="font-bold text-white badge badge-info">
                                    {dbuser?.role?.toUpperCase()}
                                </span>
                            </h5>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-300">
                        {dbuser?.role === "student" && studentNavigation}
                        {dbuser?.role === "instructor" && instructorNavigation}
                        {dbuser?.role === "admin" && adminNavigation}
                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                            <li>
                                <NavLink
                                    to="/dashboard/"
                                    rel="noopener noreferrer"
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className="w-5 h-5 text-gray-600 fill-current"
                                    >
                                        <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                        <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                    </svg>
                                    <span>Settings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/"
                                    rel="noopener noreferrer"
                                    href="#"
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className="w-5 h-5 text-gray-600 fill-current"
                                    >
                                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                        <rect
                                            width="32"
                                            height="64"
                                            x="256"
                                            y="232"
                                        ></rect>
                                    </svg>
                                    <span>Logout</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="content" className="flex-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
