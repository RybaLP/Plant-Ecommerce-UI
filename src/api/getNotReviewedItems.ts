import type { Plant } from "../interfaces/plant";
import { apiClient } from "./apiclients/apiClient";

export const getNotReviewedItems = async () : Promise<Plant[]> =>{
    try {
        const response = await apiClient.get("/api/review/user/not-reviewed");
        return response.data;
    } catch (error) {
        throw new Error("Could fetch get not reviewed items");
    }
}