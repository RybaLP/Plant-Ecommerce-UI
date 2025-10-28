import { publicApiClient } from "./apiclients/publicApiClient";

export const getPlantReviews = async (id : number) => {
    const response = await publicApiClient.get(`/api/review/plant/${id}`);
    return response.data;
}