import { useContext } from "react";
import useInstructorClasse from "../../../hooks/useInstructorClass";
import { AuthContext } from "../../../providers/AuthProvider";
import Loading from "../../Loading/Loading";
import Titles from "../../Titles/Titles";

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, dbLoading] = useInstructorClasse(user?.email);

    if (dbLoading) {
        return <Loading />;
    }
    return (
        <div className="w-full overflow-x-auto">
            <Titles title="My Classes" subTitle={"My All Classes"} />
            {classes?.length > 0 ? (
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image / Class Name</th>
                            <th>Price</th>
                            <th>Instructor</th>
                            <th>Feedback</th>
                            <th>Approved Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes?.map((cls, index) => {
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
                                    {cls?.feedback ? (
                                        <td>
                                            <textarea
                                                value={cls?.feedback}
                                                readOnly
                                            ></textarea>
                                        </td>
                                    ) : (
                                        <td></td>
                                    )}
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
export default MyClasses;
