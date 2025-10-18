import { publicApiClient } from "./apiclients/publicApiClient";

export const getAllPLants = async () => {
    const response = await publicApiClient.get("/api/plant");
    return response.data;
}