import { apiAdmin } from "../apiclients/adminApiClient";

export const adminDeleteReview = async (id : number) => {
    const response = await apiAdmin.delete(`/api/review/admin/${id}`);
    return response.data;
}