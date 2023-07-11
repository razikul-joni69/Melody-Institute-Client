import axios from "axios";
import { useEffect, useState } from "react";
import { showErrorMessage } from "../utils/Notification";

const useDbUsers = () => {
    const [users, setUsers] = useState([]);
    const [dbLoading, setDbLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/classes")
            .then((data) => setUsers(data.data))
            .catch((err) => {
                showErrorMessage(err.message);
            })
            .finally(() => setDbLoading(false));
    }, []);

    return [users, dbLoading];
};

export default useDbUsers;
