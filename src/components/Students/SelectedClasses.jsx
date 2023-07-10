import React, {useEffect, useState} from 'react';
import {AiOutlineMenuUnfold} from "react-icons/ai";
import {CgClose} from "react-icons/cg";
import axios from "axios";
import {showErrorMessage} from "../../utils/Notification.js";
import {FaCcMastercard, FaTrashAlt} from "react-icons/fa";
import {SiGoogleclassroom} from "react-icons/si";
import {BiSelectMultiple} from "react-icons/bi";
import {RiSecurePaymentLine} from "react-icons/ri";
import {BsCreditCard2FrontFill} from "react-icons/bs";

const SelectedClasses = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [selectedClasses, setSelectedClasses] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/classes")
            .then(data => setSelectedClasses(data?.data))
            .catch(err => {
                showErrorMessage(err.message)
            })
    }, [])

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        // <div id="content" className="flex-auto">
        <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>Image / Class Name</th>
                    <th>Instructor</th>
                    <th>Delete</th>
                    <th>Payment</th>
                </tr>
                </thead>
                <tbody>
                {selectedClasses.map((cls, index) => {
                    return <tr>
                        <th>
                            <label>
                                {index + 1}
                            </label>
                        </th>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={cls.class_img}
                                             alt="Avatar Tailwind CSS Component"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{cls.class_name}</div>
                                    <div className="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            {cls.instructor_name}
                            <br/>
                            <span className="badge badge-ghost badge-sm">{cls.instructor_email}</span>
                        </td>
                        <th>
                            <button className="btn btn-sm btn-error text-white"><FaTrashAlt/> Delete</button>
                        </th>
                        <th>
                            <button className="btn btn-sm btn-success text-white"><BsCreditCard2FrontFill/> Pay</button>
                        </th>
                    </tr>
                })}

                </tbody>
            </table>
        </div>)
};

export default SelectedClasses;