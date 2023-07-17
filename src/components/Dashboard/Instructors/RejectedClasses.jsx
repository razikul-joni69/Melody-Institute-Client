import { useEffect, useState } from "react";
import useGetAllClasses from "../../../hooks/useGetAllClasses";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";
import Loading from "../../Loading/Loading";
import Titles from "../../Titles/Titles";

const RejectedClasses = () => {
    const [, , rejectedClasses, dbAllClassesLoading, ,] = useGetAllClasses();
    const [dbCurrentUser, dbCurrentUserLoading] = useGetCurrentUser();
    const [currentUserRejectedClasses, setCurrentUserRejectedClasses] =
        useState([]);

    useEffect(() => {
        let classes = rejectedClasses.filter(
            (cls) => cls?.instructor_email == dbCurrentUser?.email && cls
        );
        setCurrentUserRejectedClasses(classes);
    }, [rejectedClasses, dbCurrentUser?.email]);

    if (dbAllClassesLoading || dbCurrentUserLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full overflow-x-auto">
            <Titles
                title="Rejected Classes"
                subTitle={"Your All Rejected Classes"}
            />
            {currentUserRejectedClasses?.length > 0 ? (
                <table className="table table-zebra">
                    <thead className="dark:text-white">
                        <tr>
                            <th>#</th>
                            <th>Image / Class Name</th>
                            <th>Price</th>
                            <th>Instructor</th>
                            <th>Feedback</th>
                            <th>Approved Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUserRejectedClasses?.map((cls, index) => {
                            return (
                                <tr key={cls._id}>
                                    <th>
                                        <label>{index + 1}</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 mask mask-squircle">
                                                    <img
                                                        src={cls?.img}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold">
                                                    {cls?.class_name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th className="text-xl">$ {cls?.price}</th>
                                    <td>
                                        <span className="font-bold">
                                            {cls?.instructor_name}
                                        </span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            {cls?.instructor_email}
                                        </span>
                                    </td>
                                    {cls?.feedback ? (
                                        <td>
                                            <textarea
                                                value={cls?.feedback}
                                                readOnly
                                            ></textarea>
                                        </td>
                                    ) : (
                                        <td></td>
                                    )}
                                    <td>
                                        <button
                                            className={`btn btn-sm ${
                                                cls?.status === "pending" &&
                                                "btn-info"
                                            } 
                                            ${
                                                cls?.status === "approved" &&
                                                "btn-success"
                                            }
                                            ${
                                                cls?.status === "rejected" &&
                                                "btn-error"
                                            }`}
                                        >
                                            {cls?.status}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="flex items-center justify-center h-screen text-4xl font-bold text-error">
                    No Classes Found
                </div>
            )}
        </div>
    );
};
export default RejectedClasses;
