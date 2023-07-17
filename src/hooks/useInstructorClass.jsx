import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useInstructorClasse = () => {
    const { user, loading } = useContext(AuthContext);

    const {
        refetch,
        data: dbCurrentInstructorClasses,
        isLoading: dbCurrentInstructorLoading,
    } = useQuery({
        queryKey: ["dbAllUsers", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(
                `http://localhost:8000/api/v1/classes/${user?.email}`
            );
            return res.data;
        },
    });
    return [dbCurrentInstructorClasses, dbCurrentInstructorLoading, refetch];
};

export default useInstructorClasse;
