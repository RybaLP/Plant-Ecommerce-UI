import type { Client } from "../interfaces/client";
import { apiClient } from "./apiclients/apiClient";

export const getCLientContactInfo = async (): Promise<Client> => {
        const response = await apiClient.get<Client>("/api/user/me");
        return response.data;
};
