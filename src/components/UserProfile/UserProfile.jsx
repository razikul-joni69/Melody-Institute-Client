import { Link } from "react-router-dom";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import Loading from "../Loading/Loading";
import Titles from "../Titles/Titles";

const UserProfile = () => {
    const [dbCurrentUser, dbCurrentUserLoading] = useGetCurrentUser();

    if (dbCurrentUserLoading) {
        return <Loading />;
    }

    return (
        <div className="pt-10 pb-16 dark:bg-slate-800 dark:text-white">
            <Titles title="User Profile" />
            <div className="">
                <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-slate-700 dark:text-white">
                    <div className="px-4 pb-6">
                        <div className="my-4 text-center">
                            <img
                                className="w-32 h-32 mx-auto my-4 border-4 border-white rounded-full"
                                src={dbCurrentUser?.photoURL}
                                alt=""
                            />
                            <div className="py-2 ">
                                <h3 className="mb-1 text-2xl font-bold">
                                    {dbCurrentUser?.name}
                                </h3>
                                <div className="text-gray-700 dark:text-white">
                                    <p>
                                        Email:{" "}
                                        <span className="badge badge-primary">
                                            {dbCurrentUser?.email}
                                        </span>{" "}
                                    </p>
                                    <p>
                                        Address:{" "}
                                        <span className="badge">
                                            {dbCurrentUser?.address
                                                ? dbCurrentUser?.address
                                                : "Null"}
                                        </span>
                                    </p>
                                    <p>
                                        Address:{" "}
                                        <span className="badge">
                                            {dbCurrentUser?.gender
                                                ? dbCurrentUser?.gender
                                                : "Null"}
                                        </span>
                                    </p>
                                    <p>
                                        Phone:{" "}
                                        <span className="badge">
                                            {dbCurrentUser?.phone
                                                ? dbCurrentUser?.phone
                                                : "Null"}
                                        </span>
                                    </p>
                                    <p>
                                        Role:{" "}
                                        <span className="badge">
                                            {dbCurrentUser?.role
                                                ? dbCurrentUser?.role
                                                : "Null"}
                                        </span>
                                    </p>
                                    {dbCurrentUser?.role === "instructor" ? (
                                        <>
                                            <p>
                                                Total Students:{" "}
                                                <span className="badge">
                                                    {
                                                        dbCurrentUser?.total_students
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                Total Classes:{" "}
                                                <span className="badge">
                                                    {
                                                        dbCurrentUser?.total_classes
                                                    }
                                                </span>
                                            </p>{" "}
                                        </>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-2 px-2">
                            {dbCurrentUser?.role === "instructor" && (
                                <Link to="/dashboard/my-classes">
                                    <button className="flex-1 px-4 py-2 antialiased font-bold text-white bg-blue-600 rounded-full hover:bg-blue-800">
                                        My Classes
                                    </button>
                                </Link>
                            )}
                            {dbCurrentUser?.role === "student" && (
                                <Link to="/dashboard/enrolled-classes">
                                    <button className="flex-1 px-4 py-2 antialiased font-bold text-white bg-blue-600 rounded-full hover:bg-blue-800">
                                        My Classes
                                    </button>
                                </Link>
                            )}
                            <Link to="/user/profile/update">
                                <button className="flex-1 px-4 py-2 antialiased font-bold text-white bg-blue-600 rounded-full hover:bg-blue-800">
                                    Update Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;
