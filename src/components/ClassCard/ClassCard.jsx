/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import axios from "axios";
import { useContext } from "react";
import { BsBookHalf } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineEventSeat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useGetCurrentUser from "../../hooks/useGetCurrentUser";
import { AuthContext } from "../../providers/AuthProvider";
import { showErrorMessage, showSuccessMessage } from "../../utils/Notification";
import Loading from "../Loading/Loading";

const ClassCard = ({ approvedClasses, dbAllClassesLoading, refetch }) => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [dbCurrentUser, dbCurrentUserLoading] = useGetCurrentUser();

    if (loading || dbCurrentUserLoading) {
        return <Loading />;
    }

    const handleSaveToCart = async (cls) => {
        if (!user) {
            Swal.fire({
                title: "Are you sure You Want To Login?",
                text: "You have to login/ register for add to cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Navigated to Login!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            });
        } else {
            if (!(dbCurrentUser?.role === "student")) {
                Swal.fire({
                    title: "You can not Enroll!",
                    text: "Only Student can Enroll Classes!",
                    icon: "warning",
                });
            } else if (user && dbCurrentUser?.role === "student") {
                const cartData = {
                    student_email: user?.email,
                    selected_classes: [cls],
                    enrolled_classes: [],
                };
                await axios
                    .get(
                        `https://melody-institute-server.vercel.app/api/v1/cart/${user?.email}`
                    )
                    .then((res) => {
                        if (res?.data?.length) {
                            const oldClasses = res?.data[0]?.selected_classes;
                            const oldClasses2 = res?.data[0]?.enrolled_classes;
                            const updateCartData = {
                                classes: [...oldClasses, cls],
                            };
                            const exist = oldClasses.find(
                                (oldCls) => oldCls._id === cls._id
                            );
                            const exist2 = oldClasses2.find(
                                (oldCls) => oldCls._id === cls._id
                            );
                            if (!exist && !exist2) {
                                axios
                                    .patch(
                                        `https://melody-institute-server.vercel.app/api/v1/cart/${user?.email}?class_type=selected`,
                                        updateCartData
                                    )
                                    .then((res) => {
                                        if (
                                            res?.data?.lastErrorObject
                                                ?.updatedExisting
                                        ) {
                                            showSuccessMessage(
                                                "👍 Class Added to cart!"
                                            );
                                            refetch();
                                        }
                                    })
                                    .catch((err) => {
                                        showErrorMessage(err.message);
                                    });
                            } else {
                                if (exist) {
                                    showErrorMessage(
                                        "Class already added to your cart!"
                                    );
                                }
                                if (exist2) {
                                    showErrorMessage(
                                        "You already enrolled to this class!"
                                    );
                                }
                            }
                        } else {
                            axios
                                .post(
                                    `https://melody-institute-server.vercel.app/api/v1/cart/`,
                                    cartData
                                )
                                .then((res) => {
                                    if (res?.data?.insertedId) {
                                        showSuccessMessage(
                                            "👍 Class Added to cart!"
                                        );
                                        refetch();
                                    }
                                })
                                .catch((err) => {
                                    showErrorMessage(err.message);
                                });
                        }
                    })
                    .catch((err) => {
                        showErrorMessage(err.message);
                    });
            }
        }
    };

    if (dbAllClassesLoading) {
        return <Loading />;
    }

    return (
        <div className="my-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center">
                {approvedClasses.map((cls) => (
                    <div
                        key={cls._id}
                        className={`w-full max-w-sm ${
                            cls.available_seats > 0
                                ? "bg-white"
                                : "bg-[#cc0000]"
                        } border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5`}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="rounded-full w-14 h-14"
                                    src={cls?.instructor_img}
                                    alt="Bonnie image"
                                />
                            </div>
                            <div className={`flex-1 min-w-0`}>
                                <p
                                    className={`text-md font-bold ${
                                        cls?.available_seats > 0
                                            ? "text-gray-900"
                                            : "text-white"
                                    }  truncate dark:text-white`}
                                >
                                    {cls.instructor_name}{" "}
                                    <span className="badge dark:badge-accent dark:text-white ">
                                        Instructor
                                    </span>
                                </p>
                                <p
                                    className={`text-sm  ${
                                        cls?.available_seats > 0
                                            ? "text-gray-500"
                                            : "text-white"
                                    } truncate dark:text-gray-400`}
                                >
                                    {cls?.instructor_email}
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <div className=" bg-base-100 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="dropdown dropdown-end">
                                        <label
                                            tabIndex={0}
                                            className="btn btn-ghost btn-circle btn-md avatar "
                                        >
                                            <svg
                                                className="h-8"
                                                data-darkreader-inline-stroke=""
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                                ></path>
                                            </svg>
                                        </label>
                                        <ul
                                            tabIndex={0}
                                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                                        >
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        Swal.fire({
                                                            icon: "warning",
                                                            title: "Feature not implemented yet!",
                                                            text: "This feature will be implemented soon.",
                                                        });
                                                    }}
                                                >
                                                    Instructor Profile
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="relative">
                            <a className="relative" href="#">
                                <img
                                    className="rounded-t-lg h-60"
                                    src={cls?.img}
                                    alt="product image"
                                />
                            </a>
                        </div>
                        <hr className="my-4" />
                        <div className="space-y-2">
                            <div
                                className={`grid grid-cols-2 gap-2 dark:text-white ${
                                    cls?.available_seats > 0
                                        ? "text-gray-500"
                                        : "text-white"
                                }`}
                            >
                                <div className="flex items-center gap-1 text-[15px]">
                                    <BsBookHalf
                                        className={`${
                                            cls?.available_seats > 0
                                                ? "text-red-700"
                                                : "text-cyan-500"
                                        } text-[20px]`}
                                    />{" "}
                                    {cls?.lessons}{" "}
                                    {cls?.lessons > 1 ? "Lesson's" : "Lesson"}
                                </div>
                                <div className="flex items-center gap-1 text-[15px]">
                                    <MdOutlineEventSeat
                                        className={`${
                                            cls?.available_seats > 0
                                                ? "text-red-700"
                                                : "text-cyan-500"
                                        } text-[20px]`}
                                    />{" "}
                                    {cls?.total_seats}{" "}
                                    {cls?.total_seats > 1
                                        ? "Total Seat's"
                                        : "Total Seat"}
                                </div>
                                <div className="flex items-center gap-1 text-[15px]">
                                    <FaPeopleGroup
                                        className={`${
                                            cls?.available_seats > 0
                                                ? "text-red-700"
                                                : "text-cyan-500"
                                        } text-[20px]`}
                                    />{" "}
                                    {cls?.enrolled_students}{" "}
                                    {cls?.enrolled_students > 1
                                        ? "Enrolled Student's"
                                        : "Enrolled Student"}
                                </div>
                                <div className="flex items-center gap-1 text-[15px]">
                                    <MdOutlineEventSeat
                                        className={`${
                                            cls?.available_seats > 0
                                                ? "text-red-700"
                                                : "text-cyan-500"
                                        } text-[20px]`}
                                    />{" "}
                                    {cls?.available_seats}{" "}
                                    {cls?.available_seats > 1
                                        ? "Available Seat's"
                                        : "Available Seat"}
                                </div>
                            </div>
                            <div
                                className={`${
                                    cls?.available_seats > 0
                                        ? "text-gray-900"
                                        : "text-white"
                                } text-xl font-semibold tracking-tight dark:text-white`}
                            >
                                <h4>{cls?.class_name}</h4>
                                <h4>${cls?.price}</h4>
                            </div>
                            <div
                                className={`${
                                    cls?.available_seats > 0
                                        ? "text-gray-500"
                                        : "text-white"
                                }`}
                            >
                                {cls?.class_description?.slice(0, 100)}
                            </div>
                            <div className="flex items-center justify-between">
                                <Rating
                                    style={{ maxWidth: 130 }}
                                    value={Math.random() * 3 + 2}
                                    readOnly
                                />
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 -ml-4">
                                    {cls?.enrolled_students}
                                </span>
                                <button
                                    onClick={() => handleSaveToCart(cls)}
                                    disabled={
                                        cls.available_seats > 0 ? false : true
                                    }
                                    className={`${
                                        cls?.available_seats > 0
                                            ? "btn-success"
                                            : "btn-warning disabled text-white cursor-not-allowed"
                                    } btn btn-sm text-white`}
                                >
                                    {cls?.available_seats > 0
                                        ? "Add to Cart"
                                        : "Class Booked"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassCard;
