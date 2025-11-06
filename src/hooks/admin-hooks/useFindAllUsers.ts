import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "../../interfaces/responses/userResponse";
import { findAllUsers } from "../../api/admin-api/findAllUsers";

export const useFindAllUsers = () => {
    const {data, isLoading, isError} = useQuery<UserResponse[]>({
        queryKey : ["all-users"],
        queryFn : findAllUsers,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    return {data, isLoading, isError};
}