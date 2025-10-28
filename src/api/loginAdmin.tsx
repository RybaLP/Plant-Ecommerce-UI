import type { LoginForm } from "../interfaces/loginForm";
import { publicApiClient } from "./apiclients/publicApiClient";

export const loginAdmin = async (reqBody : LoginForm) => {
    const response = await publicApiClient.post("/api/auth/admin", reqBody);
    return response.data;
}