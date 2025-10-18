import { useQuery } from "@tanstack/react-query"
import { getAllPLants } from "../api/getAllPlants"
import type { Plant } from "../interfaces/plant"


export const useAllPlants = () => {
    const {data, isLoading, isError, error} = useQuery<Plant[]>({
        queryKey : ["all-plants"],
        queryFn : getAllPLants,
    })

    return {
        plants : data,
        isLoading,
        isError,
        error
    }
}