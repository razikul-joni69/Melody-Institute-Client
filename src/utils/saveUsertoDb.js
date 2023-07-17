import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "./Notification";

const saveUserToDb = async (name, email, photoURL, ...rest) => {
    const user = {
        name,
        email,
        photoURL,
        total_students: 0,
        total_classes: 0,
        enrolled_courses: 0,
        address: rest[0]?.address || null,
        gender: rest[0]?.gender || null,
        phone: rest[0]?.phone || null,
        role: rest[0]?.role || "student",
    };

    await axios
        .get(`https://melody-institute-server.vercel.app/api/v1/users/${email}`)
        .then((res) => {
            if (res?.data?.email !== email) {
                axios
                    .post(`https://melody-institute-server.vercel.app/api/v1/users`, user)
                    .then((res) => {
                        if (res?.data.insertedId) {
                            showSuccessMessage(
                                "🦸 User Data Saved in Database Successfully!"
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
};

export default saveUserToDb;
