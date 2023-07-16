import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useGetAllUsers = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: dbAllUsers, isLoading: dbAllUsersLoading } = useQuery({
        queryKey: ["dbAllUsers", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/api/v1/users`);
            return res.data;
        },
    });
    return [dbAllUsers, dbAllUsersLoading];
};
export default useGetAllUsers;
