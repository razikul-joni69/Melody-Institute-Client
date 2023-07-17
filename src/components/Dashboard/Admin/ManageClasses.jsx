import axios from "axios";
import { useState } from "react";
import useGetAllClasses from "../../../hooks/useGetAllClasses";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../../utils/Notification";
import Loading from "../../Loading/Loading";

const ManageClasses = () => {
    const [statusId, setStatusId] = useState("");
    const [allClasses, , , dbAllClassesLoading, refetch] = useGetAllClasses();

    const handleFeedback = async (e) => {
        const rejectionFeedback = await e.target.feedback.value;
        const status = "rejected";
        const rejectionData = {
            status,
            rejectionFeedback,
        };

        await axios
            .patch(
                `https://melody-institute-server.vercel.app/api/v1/classes/${statusId}`,
                rejectionData
            )
            .then((res) => {
                if (res?.data?.lastErrorObject?.updatedExisting) {
                    showSuccessMessage("🆗 Status Updated Successfully");
                    refetch();
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });

        e.target.reset();
    };

    const handleStatus = async (e, id) => {
        const status = e.target.value;
        const statusData = {
            status,
        };

        if (status === "approved") {
            await axios
                .patch(
                    `https://melody-institute-server.vercel.app/api/v1/classes/${id}`,
                    statusData
                )
                .then((res) => {
                    if (res?.data?.lastErrorObject?.updatedExisting) {
                        showSuccessMessage("🆗 Status Updated Successfully");
                        refetch();
                    }
                })
                .catch((err) => {
                    showErrorMessage(err.message);
                });
        } else if (status === "rejected") {
            window.my_modal_5.showModal();
        }
    };

    if (dbAllClassesLoading) {
        return <Loading />;
    }

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
                <thead className="dark:text-white">
                    <tr>
                        <th>#</th>
                        <th>Image / Class Name</th>
                        <th>Price</th>
                        <th>Instructor Details</th>
                        <th>Total Seats</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allClasses.map((cls, index) => {
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
                                            <div className="font-bold text-[20px]">
                                                {cls?.class_name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <th className="font-bold text-[20px]">
                                    $ {cls?.price}
                                </th>
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
                                <th>{cls?.total_seats}</th>
                                <th>
                                    <select
                                        onChange={(e) => {
                                            setStatusId(cls?._id);
                                            handleStatus(e, cls?._id);
                                        }}
                                        defaultValue={cls?.status}
                                        className={`w-full max-w-[130px] select select-sm  btn btn-sm btn-info text-white ${
                                            (cls?.status === "approved" &&
                                                "btn-success") ||
                                            (cls?.status === "rejected" &&
                                                "btn-error")
                                        }`}
                                    >
                                        <option disabled value="pending">
                                            {cls?.status}
                                        </option>
                                        <option
                                            value="approved"
                                            className="btn btn-sm btn-success "
                                        >
                                            Approved
                                        </option>
                                        <option
                                            value="rejected"
                                            className="btn btn-sm btn-error "
                                        >
                                            Rejected
                                        </option>
                                    </select>
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
