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
        <div>
            <Titles title="User Profile" />
            <div className="py-16">
                <div>
                    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                        <div className="border-b px-4 pb-6">
                            <div className="text-center my-4">
                                <img
                                    className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
                                    src={dbCurrentUser?.photoURL}
                                    alt=""
                                />
                                <div className="py-2">
                                    <h3 className="font-bold text-2xl mb-1">
                                        {dbCurrentUser?.name}
                                    </h3>
                                    <div className="text-gray-700">
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
                                        {dbCurrentUser?.role ===
                                        "instructor" ? (
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
                                        <button className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2">
                                            My Classes
                                        </button>
                                    </Link>
                                )}
                                {dbCurrentUser?.role === "student" && (
                                    <Link to="/dashboard/enrolled-classes">
                                        <button className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2">
                                            My Classes
                                        </button>
                                    </Link>
                                )}
                                <Link to="/user/profile/update">
                                    <button className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2">
                                        Update Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;
