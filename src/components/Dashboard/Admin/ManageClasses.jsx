import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../utils/Notification";

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [statusId, setStatusId] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/classes")
            .then((data) => {
                setClasses(data.data);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    }, []);

    const handleFeedback = async (e) => {
        const feedback = await e.target.feedback.value;
        const status = "rejected";
        const rejectionData = {
            feedback,
            status,
        };

        await axios
            .patch(
                `http://localhost:8000/api/v1/classes/${statusId}`,
                rejectionData
            )
            .then((res) => {
                if (res?.status === 200) {
                    showSuccessMessage("🆗 Status Updated Successfully");
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });

        e.target.reset();
    };

    const handleStatus = async (e) => {
        const status = e.target.value;
        const statusData = {
            status,
        };

        if (status === "rejected") {
            window.my_modal_5.showModal();
        }

        if (status === "approved") {
            await axios
                .patch(
                    `http://localhost:8000/api/v1/classes/${statusId}`,
                    statusData
                )
                .then((res) => {
                    if (res?.status === 200) {
                        showSuccessMessage("🆗 Status Updated Successfully");
                    }
                })
                .catch((err) => {
                    showErrorMessage(err.message);
                });
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="my-2 mb-5 text-center">
                <div className="space-y-3 text-center ">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Manage Classes
                    </h1>
                </div>
            </div>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image / Class Name / Price</th>
                        <th>Instructor Details</th>
                        <th>Total Courses</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((cls, index) => {
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
                                            <div className="font-bold">
                                                {cls?.class_name}
                                            </div>
                                            <div className="text-sm opacity-50">
                                                ${cls?.price}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <th>
                                    <div>
                                        <div className="font-bold">
                                            {cls?.instructor_name}
                                        </div>
                                        <div className="text-sm opacity-50">
                                            {cls?.instructor_email}
                                        </div>
                                    </div>
                                </th>

                                <th>Total courses</th>
                                <th>
                                    <select
                                        onChange={(e) => {
                                            handleStatus(e);
                                            setStatusId(cls?._id);
                                        }}
                                        className="w-full max-w-[130px] select select-sm  btn btn-sm btn-info text-white"
                                    >
                                        <option disabled selected>
                                            {cls?.status}
                                        </option>
                                        <option
                                            value="approved"
                                            className="btn btn-sm btn-success "
                                        >
                                            Approve
                                        </option>
                                        <option
                                            value="rejected"
                                            className="btn btn-sm btn-error "
                                        >
                                            Reject
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

            {/* Feedback Modal */}
            <dialog
                id="my_modal_5"
                className="modal modal-bottom sm:modal-middle"
            >
                <form
                    onSubmit={handleFeedback}
                    method="dialog"
                    className="modal-box"
                    id="feedback_modal"
                >
                    {/* <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                        ✕
                    </button> */}
                    <h3 className="text-lg font-bold">Rejection Feedback</h3>
                    <textarea
                        name="feedback"
                        defaultValue="Some Other Problem"
                        className="w-full mt-5 border border-gray-400 h-28"
                    ></textarea>
                    <input type="submit" value="Submit" className="btn" />
                </form>
            </dialog>
        </div>
    );
};
export default ManageClasses;
