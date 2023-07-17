import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllUsers = () => {
    const {
        refetch,
        data: dbAllUsers,
        isLoading: dbAllUsersLoading,
    } = useQuery({
        queryKey: ["dbAllUsers"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8000/api/v1/users`);
            return res.data;
        },
    });
    return [dbAllUsers, dbAllUsersLoading, refetch];
};
export default useGetAllUsers;
