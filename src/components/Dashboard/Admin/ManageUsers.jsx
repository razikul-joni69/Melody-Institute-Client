import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../utils/Notification";
import Loading from "../../Loading/Loading";

const ManageUsers = () => {
    const [dbAllUsers, dbAllUsersLoading, refetch] = useGetAllUsers();

    const handleStatus = async (e, id) => {
        const role = e.target.value;
        const roleData = {
            role,
        };

        await axios
            .patch(`http://localhost:8000/api/v1/users?id=${id}`, roleData)
            .then((res) => {
                if (res?.data?.lastErrorObject?.updatedExisting) {
                    showSuccessMessage("🆗 Role Updated Successfully");
                    refetch();
                } else {
                    showErrorMessage("Can not update Role");
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    };

    if (dbAllUsersLoading) {
        return <Loading />;
    }

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
                <thead className="dark:text-white">
                    <tr>
                        <th>#</th>
                        <th>Image / Class Name / Email</th>
                        <th>Enrolled / Total Classes</th>
                        <th>User Role</th>
                        <th>Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {dbAllUsers.map((user, index) => {
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
                                <th>Null</th>
                                <th>
                                    <select
                                        onChange={(e) => {
                                            handleStatus(e, user?._id);
                                        }}
                                        defaultValue={user?.role}
                                        className={`w-full max-w-[140px] select select-sm  btn btn-sm btn-info text-white ${
                                            (user?.role === "instructor" &&
                                                "btn-success") ||
                                            (user?.role === "admin" &&
                                                "btn-error")
                                        }`}
                                    >
                                        <option disabled value="student">
                                            {user?.role}
                                        </option>
                                        <option
                                            value="student"
                                            className="btn btn-sm btn-success "
                                        >
                                            Student
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
                                    <button
                                        onClick={() =>
                                            showErrorMessage(
                                                "Delete User not yet implemented"
                                            )
                                        }
                                        className="text-white btn btn-sm btn-error"
                                    >
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
