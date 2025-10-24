import { apiClient } from "./apiclients/apiClient"

export const getClientOrders = async () => {
    const response = await apiClient.get("/api/orders");
    return response.data;
}