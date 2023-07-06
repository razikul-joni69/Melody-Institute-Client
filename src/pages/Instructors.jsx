import React, {useEffect, useState} from 'react';
import {BsBookHalf} from "react-icons/bs";
import {FaUser} from "react-icons/fa";
import {MdPlayLesson} from "react-icons/md";
import {NavLink} from "react-router-dom";

const Instructors = () => {
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        fetch("/instructor.json").then(res => res.json()).then(data => setInstructors(data))
    }, [])
    return (
        <div>
            <div className="text-center my-5">
                <div className="text-center space-y-3 ">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        All of our Instructors
                    </h1>
                    <p className="text-xl text-gray-500">
                        Choose your favourite class and instructor.
                    </p>

                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center">
                {
                    instructors.map(instructor =>
                        <div
                            className="w-full max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                            <div className="flex flex-col items-center ">
                                <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                     src={instructor.img} alt="Bonnie image"/>
                                <h5 className=" text-xl font-medium text-gray-900 dark:text-white">{instructor.name}</h5>
                                <h4 className="badge badge-ghost my-2">{instructor.email}</h4>

                                {
                                    instructor.number_of_classes > 0 ? <div>
                                        <div className="flex justify-center">
                                            {
                                                instructor.name_of_classes?.map(cls => <span
                                                    className="badge badge-info font-bold text-white dark:text-black mr-2">{cls}</span>)
                                            }
                                        </div>
                                        <div className="flex justify-between my-2 gap-5">
                                            <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                                <MdPlayLesson
                                                    className="text-red-700 text-[20px]"/> {instructor.number_of_classes} {instructor.number_of_classes > 1 ? "Classes" : "Class"}
                                            </div>

                                            <div className="flex items-center gap-1 text-[15px] text-gray-600">
                                                <FaUser
                                                    className="text-red-700 text-[20px]"/> {instructor.total_students} {instructor.total_students > 1 ? "Student's" : "Student"}
                                            </div>
                                        </div>
                                    </div> : <div className="text-red-500">Currently taking no Class</div>
                                }
                                <NavLink to={`${instructor.name}-classes`} className="btn btn-outline mt-2">See
                                    Classes</NavLink>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;