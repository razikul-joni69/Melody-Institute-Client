import axios from "axios";
import { useContext } from "react";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetCart from "../../../hooks/useGetCart.jsx";
import { AuthContext } from "../../../providers/AuthProvider.jsx";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../utils/Notification.js";
import Loading from "../../Loading/Loading.jsx";
import Titles from "../../Titles/Titles.jsx";

const SelectedClasses = () => {
    const [selectedClasses, dbLoading, setReFetch] = useGetCart();
    const { user } = useContext(AuthContext);

    const handleClassDelete = (id) => {
        axios
            .delete(
                `http://localhost:8000/api/v1/cart?email=${user?.email}&id=${id}`
            )
            .then((res) => {
                console.log(res);
                if (res?.data?.lastErrorObject?.updatedExisting) {
                    showSuccessMessage("🆗 Class Deleted Successfully");
                    setReFetch(true);
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    };

    if (dbLoading) {
        return <Loading />;
    }

    return (
        // <div id="content" className="flex-auto">
        <div className="w-full overflow-x-auto">
            <Titles
                title="Selected Classes"
                subTitle={"Your Selected All Classes"}
            />
            {selectedClasses.length > 0 ? (
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image / Class Name</th>
                            <th>Price</th>
                            <th>Available Seats</th>
                            <th>Instructor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClasses?.map((cls, index) => {
                            return (
                                <tr key={cls._id}>
                                    <th>
                                        <label>{index + 1}</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="w-12 h-12 mask mask-squircle">
                                                    <img
                                                        src={cls?.img}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold">
                                                    {cls?.class_name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <th className="text-xl">{cls?.price}</th>
                                    <th className="text-xl">
                                        {cls?.available_seats}
                                    </th>
                                    <td>
                                        <span className="font-bold">
                                            {cls?.instructor_name}
                                        </span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            {cls?.instructor_email}
                                        </span>
                                    </td>
                                    <th>
                                        <button
                                            onClick={() =>
                                                handleClassDelete(cls?._id)
                                            }
                                            className="text-white btn btn-sm btn-error"
                                        >
                                            <FaTrashAlt /> Delete
                                        </button>
                                    </th>
                                    <th>
                                        <Link
                                            to={`/dashboard/checkout/${cls?._id}`}
                                        >
                                            <button className="text-white btn btn-sm btn-success">
                                                <BsCreditCard2FrontFill /> Make
                                                Payment
                                            </button>
                                        </Link>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="flex items-center justify-center h-screen text-4xl font-bold text-error">
                    No Classes Found
                </div>
            )}
        </div>
    );
};

export default SelectedClasses;
