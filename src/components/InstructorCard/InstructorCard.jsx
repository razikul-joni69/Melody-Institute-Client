import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { Link } from "react-router-dom";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import Loading from "../Loading/Loading";

const InstructorCard = () => {
    const [instructors, setInstructors] = useState([]);
    const [dbAllUsers, dbAllUsersLoading] = useGetAllUsers();
    useEffect(() => {
        const instrac = dbAllUsers?.filter(
            (ins) => ins?.role === "instructor" && ins
        );
        setInstructors(instrac);
    }, [dbAllUsers]);

    if (dbAllUsersLoading) {
        return <Loading />;
    }
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center">
            {instructors?.map((instructor) => (
                <div
                    key={instructor?._id}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                    <div className="flex flex-col items-center p-8">
                        <img
                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                            src={instructor?.photoURL}
                            alt="Bonnie image"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                            {instructor.name}
                        </h5>
                        <h4 className="my-2 badge badge-ghost">
                            {instructor?.email}
                        </h4>
                        {instructor?.total_classes > 0 ? (
                            <div>
                                <div className="flex justify-center">
                                    {instructor?.taking_classes?.map(
                                        (cls, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
                                            >
                                                {cls}
                                            </span>
                                        )
                                    )}
                                </div>
                                <div className="flex justify-between gap-5 my-2">
                                    <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                        <MdPlayLesson className="text-red-700 text-[20px]" />{" "}
                                        {instructor?.total_classes}{" "}
                                        {instructor?.total_classes > 1
                                            ? "Classes"
                                            : "Class"}
                                    </div>
                                    <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                        <FaUser className="text-red-700 text-[20px]" />{" "}
                                        {instructor?.total_students}{" "}
                                        {instructor?.total_students > 1
                                            ? "Student's"
                                            : "Student"}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-red-500">
                                Currently taking no Class
                            </div>
                        )}
                        <div className="flex mt-2 space-x-3">
                            <Link
                                to="/user/profile"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                See Profile
                            </Link>
                            <a
                                href="#"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                            >
                                See Classes
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default InstructorCard;
