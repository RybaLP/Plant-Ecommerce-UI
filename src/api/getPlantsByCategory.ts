import type { PlantType } from "../types/plantType";
import { publicApiClient } from "./apiclients/publicApiClient";

export const getPlantsByCategory = (category: PlantType, page: number) => {
  if (category === "ORNAMENTAL") {
    return publicApiClient.get(`/api/plant/ornamental`, {
      params: { page, size: 9 },
    });
  }

  return publicApiClient.get(`/api/plant/category/${category}`, {
    params: { page, size: 9 },
  });
};