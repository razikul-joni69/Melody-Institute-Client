import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { showErrorMessage } from "../../../utils/Notification";

const ManageClasses = () => {
    const [dbUsers, setDbUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/users")
            .then((data) => {
                setDbUsers(data.data);
                console.log(data);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    }, []);

    return (
        <div className="w-full overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image / Class Name</th>
                        <th>Enrolled Courses</th>
                        <th>User Role</th>
                        <th>Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {dbUsers.map((user, index) => {
                        return (
                            <tr key={user._id}>
                                <th>
                                    <label>{index + 1}</label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="w-12 h-12 mask mask-squircle">
                                                <img
                                                    src={user?.photoURL}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">
                                                {user?.name}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <th>Total courses</th>
                                <th>
                                    <select className="w-full max-w-[150px] select select-sm select-primary">
                                        <option disabled selected>
                                            {user?.role}
                                        </option>
                                        <option>Approved</option>
                                        <option>Rejected</option>
                                    </select>
                                </th>

                                <th>
                                    <button className="text-white btn btn-sm btn-error">
                                        <FaTrashAlt /> Delete
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
export default ManageClasses;
