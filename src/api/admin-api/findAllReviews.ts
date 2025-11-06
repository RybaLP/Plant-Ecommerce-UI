import type { ReviewResponse } from "../../interfaces/responses/reviewResponse";
import type { Review } from "../../interfaces/review";
import { apiAdmin } from "../apiclients/adminApiClient";

export const findAllReviews = async () : Promise<ReviewResponse[]> => {
    const response = await apiAdmin.get("/api/review/admin");
    return response.data;
}