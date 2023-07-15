import axios from "axios";
import { useEffect, useState } from "react";
import { showErrorMessage } from "../utils/Notification";

const useDbUsers = () => {
    const [dbUsers, setDbUsers] = useState([]);
    const [dbLoading, setDbLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/users")
            .then((data) => setDbUsers(data.data))
            .catch((err) => {
                showErrorMessage(err.message);
            })
            .finally(() => setDbLoading(false));
    }, []);

    return [dbUsers, dbLoading];
};

export default useDbUsers;
