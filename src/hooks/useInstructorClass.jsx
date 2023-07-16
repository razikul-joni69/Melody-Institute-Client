import axios from "axios";
import { useEffect, useState } from "react";
import { showErrorMessage } from "../utils/Notification";

const useInstructorClasse = (email) => {
    const [classes, setClasses] = useState([]);
    const [dbLoading, setDbLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/v1/classes/${email}`)
            .then((data) => setClasses(data.data))
            .catch((err) => {
                showErrorMessage(err.message);
            })
            .finally(() => setDbLoading(false));
    }, [email]);

    return [classes, dbLoading];
};

export default useInstructorClasse;
