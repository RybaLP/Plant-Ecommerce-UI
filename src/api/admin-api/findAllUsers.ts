import type { UserResponse } from "../../interfaces/responses/userResponse";
import { apiAdmin } from "../apiclients/adminApiClient";

export const findAllUsers = async () : Promise<UserResponse[]> => {
    const response = await apiAdmin.get("/api/user/admin");
    return response.data;
}