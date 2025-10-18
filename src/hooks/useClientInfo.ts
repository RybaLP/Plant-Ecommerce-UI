import { useQuery } from "@tanstack/react-query"
import type { Client } from "../interfaces/client"
import { getCLientContactInfo } from "../api/getClientContactInfo";

export const useClientInfo = () => {

    const {data, isLoading, isError, error} = useQuery<Client> ({
        queryKey : ["clientInfo"],
        queryFn : getCLientContactInfo,

        staleTime : 1000 * 60 * 6,
        refetchOnWindowFocus: false,

        retry : false
    })
    

    return {
        client : isError ? null : data,
        isLoading,
        isError,
        error : error instanceof Error ? error.message : null
    }

};