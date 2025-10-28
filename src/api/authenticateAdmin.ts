import { publicApiClient } from "./apiclients/publicApiClient";

export const authenticateAdmin = async (token : string) => {
    const response = await publicApiClient.post("/api/auth/admin/authenticate", {token : token});
    return response.data;
}