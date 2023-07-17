import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const routes = ["Home", "Instructors", "Classes", "Dashboard"];

    return (
        <div className="sticky top-0 z-50 navbar dark:bg-slate-800 backdrop-blur-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:text-white"
                    >
                        {routes.map((route, index) => (
                            <li key={index}>
                                <NavLink to={route.toLowerCase()}>
                                    {route}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <NavLink
                    to={"/home"}
                    className="text-xl normal-case btn btn-ghost dark:text-white"
                >
                    Melody <span className="hidden sm:inline">Institute</span>
                </NavLink>
            </div>
            <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal dark:text-white ">
                    {routes.map((route, index) => (
                        <li key={index}>
                            <NavLink to={route.toLowerCase()}>{route}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            {user ? (
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 dark:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    src={
                                        user?.photoURL
                                            ? user?.photoURL
                                            : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                    }
                                    alt="User Profile Photo"
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dark:text-white menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
                        >
                            <li>
                                <Link
                                    to="/user/profile"
                                    className="justify-between dark:hover:bg-white"
                                >
                                    {user?.displayName}
                                    <span className="badge dark:text-white ">
                                        Profile
                                    </span>
                                </Link>
                            </li>
                            <li
                                className="rounded-lg dark:hover:bg-white dark:hover:text-black"
                                onClick={() => logOut()}
                            >
                                <a>LogOut</a>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="space-x-2 navbar-end ">
                    <NavLink
                        to="/login"
                        className="btn btn-sm btn-outline btn-success"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="btn btn-sm btn-outline btn-success"
                    >
                        Register
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Navbar;
