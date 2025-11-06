import { apiAdmin } from "../apiclients/adminApiClient";
import type { UpdatePlant } from "../../interfaces/requests/updatePlant";

export const updatePlant = async (id : number, reqBody : UpdatePlant) => {
    const response = await apiAdmin.put(`/api/plant/admin/${id}`, reqBody);
    return response.data;
}