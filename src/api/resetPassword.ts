import { publicApiClient } from "./apiclients/publicApiClient";
import type { ResetPasswordRequest } from "../interfaces/requests/resetPasswordRequest";

export const resetPassword = async (resetPasswordRequest : ResetPasswordRequest) => {
    try {
        const response = await publicApiClient.post("/api/user-password/reset-password", resetPasswordRequest);
        return response.status;
    } catch (error) {
        throw new Error("Could not reset password somehow xd");
    }
}