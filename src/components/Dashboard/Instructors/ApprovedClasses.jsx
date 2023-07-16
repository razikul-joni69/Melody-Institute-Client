import useClasses from "../../../hooks/useClasses";
import Loading from "../../Loading/Loading";
import Titles from "../../Titles/Titles";

const ApprovedClasses = () => {
    const [, approvedClasses, , dbLoading] = useClasses();

    if (dbLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full overflow-x-auto">
            <Titles
                title="Approved Classes"
                subTitle={"Your All Approved Classes"}
            />
            {approvedClasses?.length > 0 ? (
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image / Class Name</th>
                            <th>Price</th>
                            <th>Instructor</th>
                            <th>Enrolled Students</th>
                            <th>Available Seats</th>
                            <th>Approved Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedClasses?.map((cls, index) => {
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
                                    <th className="text-xl">$ {cls?.price}</th>
                                    <td>
                                        <span className="font-bold">
                                            {cls?.instructor_name}
                                        </span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            {cls?.instructor_email}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-info">
                                            {cls?.enrolled_students}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-warning">
                                            {cls?.available_seats}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${
                                                cls?.status === "pending" &&
                                                "btn-info"
                                            } 
                                            ${
                                                cls?.status === "approved" &&
                                                "btn-success"
                                            }
                                            ${
                                                cls?.status === "rejected" &&
                                                "btn-error"
                                            }`}
                                        >
                                            {cls?.status}
                                        </button>
                                    </td>
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
export default ApprovedClasses;
