import { publicApiClient } from "./apiclients/publicApiClient";

export const sendResetPasswordUrl = async (email : string) : Promise<number> => {
    try {
        const response = await publicApiClient.post("/api/user-password", {email : email});
        return response.status;
    } catch (error) {
        throw new Error("");
    }
}