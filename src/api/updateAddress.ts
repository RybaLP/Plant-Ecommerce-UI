import { apiClient } from "./apiclients/apiClient";
import type { UpdateAddress } from "../interfaces/requests/updateAddress";

export const updateAddress = async (address: UpdateAddress) => {
    try {
        const response = await apiClient.patch("/api/address", address);
        return response.data;
    } catch (error: any) {
        console.error("Error updating address:", error?.response?.data || error.message);
        throw error;
    }
};
