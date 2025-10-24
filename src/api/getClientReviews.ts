import type { FindClientReviewsResponse } from "../interfaces/responses/findClientReviewsResponse";
import { apiClient } from "./apiclients/apiClient";

export const getClientReviews = async () : Promise<FindClientReviewsResponse[]> => {
    const response = await apiClient.get("/api/review/user");
    return response.data;
}