import { useQuery } from "@tanstack/react-query"
import { getAllPLants } from "../api/getAllPlants"
import type { Plant } from "../interfaces/plant"


export const useAllPlants = () => {
    const {data, isLoading, isError, error} = useQuery<Plant[]>({
        queryKey : ["all-plants"],
        queryFn : getAllPLants,
        staleTime: 1000 * 60 * 5, 
        retry: 1, 
    })

    return {
        plants : data ?? [],
        isLoading,
        isError,
        error
    }
}