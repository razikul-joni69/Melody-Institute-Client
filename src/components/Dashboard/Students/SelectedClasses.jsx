import axios from "axios";
import { useEffect, useState } from "react";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { showErrorMessage } from "../../../utils/Notification.js";

const SelectedClasses = () => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [selectedClasses, setSelectedClasses] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/classes")
            .then((data) => setSelectedClasses(data?.data))
            .catch((err) => {
                showErrorMessage(err.message);
            });
    }, []);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        // <div id="content" className="flex-auto">
        <div className="w-full overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image / Class Name</th>
                        <th>Instructor</th>
                        <th>Delete</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedClasses.map((cls, index) => {
                        return (
                            <tr key={index}>
                                <th>
                                    <label>{index + 1}</label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 mask mask-squircle">
                                                <img
                                                    src={cls.class_img}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {cls.class_name}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                United States
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {cls.instructor_name}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {cls.instructor_email}
                                    </span>
                                </td>
                                <th>
                                    <button className="text-white btn btn-sm btn-error">
                                        <FaTrashAlt /> Delete
                                    </button>
                                </th>
                                <th>
                                    <button className="text-white btn btn-sm btn-success">
                                        <BsCreditCard2FrontFill /> Pay
                                    </button>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SelectedClasses;
