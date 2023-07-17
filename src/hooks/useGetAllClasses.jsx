import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const useGetAllClasses = () => {
    const [approvedClasses, setApprovedClasses] = useState([]);
    const [rejectedClasses, setRejectedClasses] = useState([]);
    const {
        refetch,
        data: allClasses,
        isLoading: dbAllClassesLoading,
    } = useQuery({
        queryKey: ["allClasses"],
        queryFn: async () => {
            const res = await axios.get(
                `https://melody-institute-server.vercel.app/api/v1/classes`
            );
            const approved = res?.data?.filter(
                (cls) => cls?.status === "approved" && cls
            );
            const rejected = res?.data?.filter(
                (cls) => cls?.status === "rejected" && cls
            );
            setRejectedClasses(rejected);
            setApprovedClasses(approved);
            return res.data;
        },
    });

    return [
        allClasses,
        approvedClasses,
        rejectedClasses,
        dbAllClassesLoading,
        refetch,
    ];
};
export default useGetAllClasses;
