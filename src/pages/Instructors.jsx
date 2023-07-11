import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Titles from "../components/Titles/Titles";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch("/instructor.json")
            .then((res) => res.json())
            .then((data) => setInstructors(data));
    }, []);
    return (
        <div className="my-10">
            <Titles
                title="All of our Instructors"
                subTitle=" Choose your favourite instructors class."
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center">
                {instructors.map((instructor) => (
                    <div
                        key={instructor._id}
                        className="w-full max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div className="flex flex-col items-center ">
                            <img
                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src={instructor.img}
                                alt="Bonnie image"
                            />
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                                {instructor.name}
                            </h5>
                            <h4 className="my-2 badge badge-ghost">
                                {instructor.email}
                            </h4>

                            {instructor.number_of_classes > 0 ? (
                                <div>
                                    <div className="flex justify-center">
                                        {instructor.name_of_classes?.map(
                                            (cls) => (
                                                <span
                                                    key={cls._id}
                                                    className="mr-2 font-bold text-white badge badge-info dark:text-black"
                                                >
                                                    {cls}
                                                </span>
                                            )
                                        )}
                                    </div>
                                    <div className="flex justify-between gap-5 my-2">
                                        <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                            <MdPlayLesson className="text-red-700 text-[20px]" />{" "}
                                            {instructor.number_of_classes}{" "}
                                            {instructor.number_of_classes > 1
                                                ? "Classes"
                                                : "Class"}
                                        </div>
                                        <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                            <FaUser className="text-red-700 text-[20px]" />{" "}
                                            {instructor.total_students}{" "}
                                            {instructor.total_students > 1
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
                            <NavLink
                                to={`${instructor.name}-classes`}
                                className="mt-2 btn btn-outline"
                            >
                                See Classes
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instructors;
