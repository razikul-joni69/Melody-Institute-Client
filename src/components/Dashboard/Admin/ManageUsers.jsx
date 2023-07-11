import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../utils/Notification";

const ManageUsers = () => {
    const [dbUsers, setDbUsers] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/users")
            .then((data) => {
                setDbUsers(data.data);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    }, []);

    const handleStatus = async (e, id) => {
        const role = e.target.value;
        const roleData = {
            role,
        };

        await axios
            .patch(`http://localhost:8000/api/v1/users/${id}`, roleData)
            .then((res) => {
                if (res?.status === 200) {
                    showSuccessMessage("🆗 Status Updated Successfully");
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    };
    return (
        <div className="w-full overflow-x-auto">
            <div className="my-2 mb-5 text-center">
                <div className="space-y-3 text-center ">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Manage Users
                    </h1>
                    
                </div>
            </div>
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
                                {/* <td>
                                    {user.}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {cls.instructor_email}
                                    </span>
                                </td> */}
                                {/* <th>
                                    <button className="text-white btn btn-sm btn-success">
                                        <BsCreditCard2FrontFill /> {user.role}
                                    </button>
                                </th> */}
                                <th>Total enrolled courses</th>
                                <th>
                                    <select
                                        onChange={(e) => {
                                            handleStatus(e, user?._id);
                                        }}
                                        className="w-full max-w-[140px] select select-sm  btn btn-sm btn-info text-white"
                                    >
                                        <option disabled selected>
                                            {user?.role}
                                        </option>
                                        <option
                                            value="instructor"
                                            className="btn btn-sm btn-success "
                                        >
                                            Instructor
                                        </option>
                                        <option
                                            value="admin"
                                            className="btn btn-sm btn-error "
                                        >
                                            Admin
                                        </option>
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
export default ManageUsers;
