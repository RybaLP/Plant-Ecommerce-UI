import type { Plant } from "../interfaces/plant";
import { useQuery } from "@tanstack/react-query";
import { getLandingPagePlants } from "../api/getLandingPagePlants";

export const useLandingPagePlants = () => {

    const {data, isLoading, isError, error} = useQuery<Plant[]> ({
        queryKey : ["landingPagePlants"],
        queryFn : getLandingPagePlants,

        staleTime : 1000 * 60 * 6,
        refetchOnWindowFocus: false,
    })


    return ({
        plants : data ?? [],
        isLoading,
        isError,
        error : error instanceof Error ? error.message : null
    })
}