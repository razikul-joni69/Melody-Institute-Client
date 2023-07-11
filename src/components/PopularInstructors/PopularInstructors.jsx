import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";

const PopularInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch("/instructor.json")
            .then((res) => res.json())
            .then((data) => setInstructors(data));
    }, []);
    return (
        <div>
            <div className="my-5 text-center">
                <div className="space-y-3 text-center ">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Popular Instructors
                    </h1>
                    <p className="text-xl text-gray-500">
                        See All of your popular instructors here.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center">
                {instructors.map((instructor) => (
                    <div
                        key={instructor._id}
                        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    >
                        <div className="flex justify-end px-4 pt-4">
                            <button
                                id="dropdownButton"
                                data-dropdown-toggle="dropdown"
                                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                                type="button"
                            >
                                <span className="sr-only">Open dropdown</span>
                                <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 16 3"
                                >
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                            <div
                                id="dropdown"
                                className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            >
                                <ul
                                    className="py-2"
                                    aria-labelledby="dropdownButton"
                                >
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Export Data
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img
                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src={instructor.img}
                                alt="Bonnie image"
                            />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                {instructor.name}
                            </h5>
                            {instructor.number_of_classes > 0 ? (
                                <div>
                                    <div className="flex justify-center">
                                        {instructor.name_of_classes?.map(
                                            (cls) => (
                                                <span className="px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
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
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    See Profile
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                >
                                    See Courses
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularInstructors;
