import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "./Notification";

const saveUserToDb = async (name, email, photoURL) => {
    const user = {
        address: null,
        name,
        email,
        photoURL,
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
