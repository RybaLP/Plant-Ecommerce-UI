import { useQuery } from "@tanstack/react-query";
import { getClientAddress } from "../api/getClientAddress";
import type { ClientContactInfo } from "../interfaces/clientContactInfo";

export function useClientContactInfo () {
    const {data, isError, isLoading} = useQuery <ClientContactInfo> ({
        queryKey : ["client-contact-info"],
        queryFn : getClientAddress
    })

    return {
        clientContactInfo : isError ? null : data,
        isError,
        isLoading
    }
}

