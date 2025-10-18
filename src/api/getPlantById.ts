import type { DetailPlant } from "../interfaces/plant/detailPlant";
import { publicApiClient } from "./apiclients/publicApiClient";

export const getPlantById = async (plantId : number | string) : Promise<DetailPlant> => {
    const response = await publicApiClient.get(`/api/plant/${plantId}`)
    return response.data;
}