import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "./Notification";

const saveUserToDb = async (name, email, photoURL) => {
    const user = {
        name,
        email,
        photoURL,
        total_students: 0,
        total_classes: 0,
        enrolled_courses: 0,
        address: null,
        gender: null,
        phone: null,
        role: "student",
    };

    await axios
        .get(`http://localhost:8000/api/v1/users/${email}`)
        .then((res) => {
            if (res?.data?.email !== email) {
                axios
                    .post(`http://localhost:8000/api/v1/users`, user)
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
