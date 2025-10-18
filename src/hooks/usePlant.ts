import { useQuery } from "@tanstack/react-query";
import { getPlantById } from "../api/getPlantById";
import type { DetailPlant } from "../interfaces/plant/detailPlant";

export const usePlant = (id : number | string) => {

    const {data, isLoading, isError, error} = useQuery<DetailPlant>({
        queryKey : ["plant", id],
        queryFn : () => getPlantById(id),
        enabled : !!id,
        staleTime : 1000 * 80 * 5
    });

    return {
        plant: data,
        isLoading,
        isError,
        error: error instanceof Error ? error.message : null,
  };
}