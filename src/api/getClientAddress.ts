import { apiClient } from "./apiclients/apiClient";

export const getClientAddress = async () => {
    const response = await apiClient.get("/api/user/contact");
    return response.data;
}