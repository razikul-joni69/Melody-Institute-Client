import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { showErrorMessage } from "../utils/Notification";

const useGetCart = () => {
    const [dbLoading, setDbLoading] = useState(true);
    const [reFetch, setReFetch] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/v1/cart/${user?.email}`)
            .then((res) => {
                setSelectedClasses(res?.data[0]?.selected_classes);
                setEnrolledClasses(res?.data[0]?.enrolled_classes);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            })
            .finally(() => {
                setDbLoading(false);
                setReFetch(false);
            });
    }, [user?.email, reFetch]);

    return [selectedClasses, enrolledClasses, dbLoading, setReFetch];
};

export default useGetCart;
