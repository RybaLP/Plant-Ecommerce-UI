import type { ClientContactInfo } from "../interfaces/clientContactInfo";
import { apiClient } from "./apiclients/apiClient";

export const createClientContaftInfo = async (request : ClientContactInfo) => {
    const response = await apiClient.post("/api/user/contact", request);
    return response.data;
}