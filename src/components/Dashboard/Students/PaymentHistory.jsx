import useGetCart from "../../../hooks/useGetCart";
import Loading from "../../Loading/Loading";
import Titles from "../../Titles/Titles";

const PaymentHistory = () => {
    const [, enrolled_classes, dbLoading] = useGetCart();

    if (dbLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full overflow-x-auto">
            <Titles
                title="Payment History"
                subTitle={"Your Enrolled Classes Payment History"}
            />
            {enrolled_classes?.length > 0 ? (
                <table className="table table-zebra">
                    <thead className="dark:text-white">
                        <tr>
                            <th>#</th>
                            <th>Image / Class Name</th>
                            <th>Instructor</th>
                            <th>Payment Status</th>
                            <th>Payment Ammount</th>
                            <th>Transection Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolled_classes?.map((cls, index) => {
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
                                        <button className="btn-sm btn-primary btn">
                                            {
                                                cls?.paymentInfo
                                                    ?.transectionStatus
                                            }
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn-sm btn-success btn">
                                            ${" "}
                                            {
                                                cls?.paymentInfo
                                                    ?.transectionAmount
                                            }
                                        </button>
                                    </td>
                                    <th>
                                        <button className="btn-sm btn-info btn">
                                            {cls?.paymentInfo?.transectionId}
                                        </button>
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="flex items-center justify-center h-screen text-4xl font-bold text-error">
                    No Payment History Found
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
