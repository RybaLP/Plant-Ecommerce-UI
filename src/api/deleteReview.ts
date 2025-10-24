import { apiClient } from "./apiclients/apiClient"

export const deleteReview = async (id : number) => {
    const response = await apiClient.delete(`/api/review/${id}`);
    return response.data;
}