import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider.jsx";
import {
    showErrorMessage,
    showSuccessMessage,
} from "../../utils/Notification.js";

const AddClass = () => {
    const { user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const imageUploadToken = import.meta.env.VITE_Image_Upload_Token;
        const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageUploadToken}`;

        data.instructor_name = user?.displayName;
        data.instructor_email = user?.email;
        data.enrolled_students = 0;
        data.available_seats = parseInt(data?.total_seats);
        data.total_seats = parseInt(data?.total_seats);
        data.total_lessons = parseInt(data?.total_lessons);
        data.available_seats = parseInt(data?.total_seats);
        data.price = parseInt(data?.price);

        const formData = new FormData();
        formData.append("image", data.img[0]);

        try {
            await axios
                .post(imageHostingUrl, formData)
                .then((img) => {
                    if (img.status === 200) {
                        data.img = img?.data?.data?.display_url;
                        axios
                            .post("http://localhost:8000/api/v1/classes", data)
                            .then((res) => {
                                if (res?.data?.insertedId) {
                                    showSuccessMessage(
                                        "🏛️ Class Created Successfully!"
                                    );
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
        } catch (err) {
            showErrorMessage(err.message);
        }
    };

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
                                    Instructor Name
                                </label>
                                <input
                                    defaultValue={user?.displayName}
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
                                    Instructor Email
                                </label>
                                <input
                                    value={user?.email}
                                    disabled
                                    type="email"
                                    id="instructor_emamil"
                                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Class Name
                                </label>
                                <input
                                    {...register("class_name")}
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter Class Name"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Price
                                </label>
                                <input
                                    {...register("price")}
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="$2999"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="total_seats"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Total Seats
                                </label>
                                <input
                                    {...register("total_seats")}
                                    type="number"
                                    name="total_seats"
                                    id="total_seats"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="50"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="total_lessons"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Total Lessons
                                </label>
                                <input
                                    {...register("total_lessons")}
                                    type="number"
                                    id="total_lessons"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="50"
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="multiple_files"
                                >
                                    Upload relevant class image
                                </label>
                                {/* <input
                                    {...register("img")}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    id="multiple_files"
                                    type="file"
                                    required
                                /> */}
                                <input
                                    {...register("img", {
                                        required: true,
                                    })}
                                    type="file"
                                    className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg dark:text-white dark:bg-slate-700"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    defaultValue="Start your musical journey with us."
                                    id="description"
                                    rows="5"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                ></textarea>
                            </div>
                        </div>
                        <input
                            type="submit"
                            className="mt-4 text-w hite btn btn-success"
                            value="Add Class"
                        />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddClass;
