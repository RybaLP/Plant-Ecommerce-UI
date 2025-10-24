import type { CreateReview } from "../interfaces/requests/createReview";
import { apiClient } from "./apiclients/apiClient";

export const createReview = async (reqBody : CreateReview) => {
    try {
        const response = await apiClient.post("/api/review", reqBody);
        return response.data;
    } catch (error) {
        throw new Error("");        
    }
}