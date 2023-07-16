import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useDbUsers from "../../hooks/useGetCurrentUser";
import { showErrorMessage, showSuccessMessage } from "../../utils/Notification";
import Loading from "../Loading/Loading";

const UpdateUserProfile = () => {
    const navigate = useNavigate();
    const [, dbCurrentUser, dbLoading] = useDbUsers();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        axios
            .patch(
                `http://localhost:8000/api/v1/users/${dbCurrentUser?.email}`,
                data
            )
            .then((res) => {
                if (res?.data?.lastErrorObject?.updatedExisting) {
                    showSuccessMessage(
                        "🦸 User Data Updated in Database Successfully!"
                    );
                    navigate("/user/profile");
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
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Add a new Class
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label
                                    htmlFor="instructor_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    User Name
                                </label>
                                <input
                                    defaultValue={dbCurrentUser?.name}
                                    disabled
                                    type="text"
                                    id="instructor_name"
                                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="instructor_emamil"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    User Email
                                </label>
                                <input
                                    value={dbCurrentUser?.email}
                                    disabled
                                    type="email"
                                    id="instructor_emamil"
                                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            {dbCurrentUser?.role === "student" && (
                                <div className="w-full">
                                    <label
                                        htmlFor="instructor_emamil"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Enrolled Courses
                                    </label>
                                    <input
                                        value={dbCurrentUser?.enrolled_courses}
                                        disabled
                                        type="email"
                                        id="instructor_emamil"
                                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    />
                                </div>
                            )}
                            {dbCurrentUser?.role === "instructor" && (
                                <>
                                    <div className="w-full">
                                        <label
                                            htmlFor="instructor_name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Total Students
                                        </label>
                                        <input
                                            defaultValue={
                                                dbCurrentUser?.total_students
                                            }
                                            disabled
                                            type="text"
                                            id="instructor_name"
                                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="instructor_emamil"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Total Classes
                                        </label>
                                        <input
                                            value={dbCurrentUser?.total_classes}
                                            disabled
                                            type="email"
                                            id="instructor_emamil"
                                            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="w-full">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Phone Number
                                </label>
                                <input
                                    {...register("phone")}
                                    defaultValue={dbCurrentUser?.phone}
                                    type="number"
                                    placeholder="01xxxxxxxxxxxxx"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Address
                                </label>
                                <input
                                    {...register("address")}
                                    defaultValue={dbCurrentUser?.address}
                                    type="text"
                                    placeholder="Dhaka, Bangladesh"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="gender"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Gender
                                </label>
                                <select
                                    defaultValue={dbCurrentUser?.gender}
                                    id="gender"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...register("gender")}
                                >
                                    <option disabled selected>
                                        {dbCurrentUser?.gender
                                            ? dbCurrentUser?.gender
                                            : "Select Gender"}
                                    </option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            {/* <div className="w-full">
                                <label
                                    htmlFor="gender"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    User Role
                                </label>
                                <select
                                    defaultValue={dbCurrentUser?.role}
                                    id="gender"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    {...register("role")}
                                >
                                    <option disabled selected>
                                        {dbCurrentUser?.role
                                            ? dbCurrentUser?.role
                                            : "Select Role"}
                                    </option>
                                    <option value="instructor">
                                        Instructor
                                    </option>
                                    <option value="student">Student</option>
                                </select>
                            </div> */}
                        </div>
                        <input
                            type="submit"
                            className="mt-4 text-w hite btn btn-success"
                            value="Update User"
                        />
                    </form>
                </div>
            </section>
        </div>
    );
};
export default UpdateUserProfile;
