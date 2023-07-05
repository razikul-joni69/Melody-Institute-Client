import React, {useEffect, useState} from 'react';
import {Rating} from '@smastrom/react-rating'
import {RxAvatar} from "react-icons/rx";
import {BsBookHalf} from "react-icons/bs";
import {GrUserManager} from "react-icons/gr";
import {FaUser} from "react-icons/fa";

const PopularClasses = () => {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        fetch("/classes.json")
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    console.log(classes)
    return (
        <div>
            <div className="text-center my-5">
                <div className="text-center space-y-3 ">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Popular Courses
                    </h1>
                    <p className="text-xl text-gray-500">
                        See All of your favourite Musical classes here.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                {
                    classes.map(cls =>

                        <div
                            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-14 h-14 rounded-full"
                                         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                         alt="Bonnie image"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-md font-bold text-gray-900 truncate dark:text-white">
                                        {cls.instructor_name} (Instructor)
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {cls.instructor_email}
                                    </p>
                                </div>
                                <div
                                    className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <div className=" bg-base-100">
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost btn-circle btn-md avatar">
                                                <svg className="h-8" data-darkreader-inline-stroke="" fill="none"
                                                     stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                                                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                                </svg>
                                            </label>
                                            <ul tabIndex={0}
                                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                                <li><a>Instructor Profile</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4"/>
                            <div className="relative">
                                <a className="relative" href="#">
                                    <img className=" rounded-t-lg"
                                         src="https://flowbite.com/docs/images/products/apple-watch.png"
                                         alt="product image"/>
                                </a>
                                <span
                                    className="absolute top-0 right-0 btn btn-sm btn-error rounded-full text-white">{cls.tag}</span>
                            </div>
                            <hr className="my-4"/>
                            <div className="space-y-2">
                                <div className="flex justify-between mb-2">
                                    <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                        <BsBookHalf
                                            className="text-red-700 text-[20px]"/> {cls.lessons} {cls.lessons > 1 ? "Lesson's" : "Lesson"}
                                    </div>
                                    <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                        <FaUser
                                            className="text-red-700 text-[20px]"/> {cls.enrolled_students} {cls.enrolled_students > 1 ? "Student's" : "Student"}
                                    </div>
                                </div>
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{cls.class_Name}
                                    </h5>
                                </a>
                                <div
                                    className="text-2xl font-bold text-gray-900 dark:text-white">${cls.price}
                                </div>
                                <div>{cls.class_description.slice(0, 100)}</div>
                                <div className="flex items-center justify-between">
                                    <Rating
                                        style={{maxWidth: 130}}
                                        value={cls.rating}
                                        readOnly
                                    />
                                    <span
                                        className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 -ml-4">{cls.total_ratings}</span>
                                    <a href="#"
                                       className="btn btn-success btn-sm text-white">Enroll
                                        Class</a>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default PopularClasses;