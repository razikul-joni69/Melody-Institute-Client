import axios from "axios";
import { useEffect, useState } from "react";
import { showErrorMessage } from "../utils/Notification";

const useClasses = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [dbLoading, setDbLoading] = useState(true);
    const [approvedClasses, setApprovedClasses] = useState([]);
    const [rejectedClasses, setRejectedClasses] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/classes")
            .then((res) => {
                setAllClasses(res?.data);
                const approved = res?.data?.filter(
                    (cls) => cls?.status === "approved" && cls
                );
                const rejected = res?.data?.filter(
                    (cls) => cls?.status === "rejected" && cls
                );
                setRejectedClasses(rejected);
                setApprovedClasses(approved);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            })
            .finally(() => setDbLoading(false));
    }, []);

    return [allClasses, approvedClasses, rejectedClasses, dbLoading];
};

export default useClasses;
