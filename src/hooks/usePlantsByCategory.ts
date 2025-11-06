import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPlantsByCategory } from "../api/getPlantsByCategory";
import type { PlantType } from "../types/plantType";

export const usePlantsByCategory = (category: PlantType, page: number) => {
  return useQuery({
    queryKey: ["plants", category, page],
    queryFn: async () => {
      const { data } = await getPlantsByCategory(category, page);
      return data;
    },
    placeholderData: keepPreviousData, 
    staleTime: 1000 * 60 * 5,
    gcTime : 1000 * 60 * 10
  });
};
