import { apiAdmin } from "../apiclients/adminApiClient";
import type { PlantRequest } from "../../interfaces/requests/plantRequest";

export const createPlant = async (reqBody : PlantRequest) => {
    const response = await apiAdmin.post("/api/plant/admin", reqBody);
    return response.data;
}