import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useDbUsers = () => {
    const { user, loading } = useContext(AuthContext);

    const { data: dbCurrentUser, isLoading: dbCurrentUserLoading } = useQuery({
        queryKey: ["currentUser", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(
                `https://melody-institute-server.vercel.app/api/v1/users/${user?.email}`
            );
            return res.data;
        },
    });

    return [dbCurrentUser, dbCurrentUserLoading];
};

export default useDbUsers;
