import { apiAdmin } from "../apiclients/adminApiClient";

export const deletePlantById = async (id : number) => {
    const response = await apiAdmin.delete(`/api/plant/admin/${id}`);
    return response.data;
}