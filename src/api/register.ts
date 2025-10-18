import type { RegistrationForm } from "../interfaces/registrationForm";
import { publicApiClient } from "./apiclients/publicApiClient";

export const registerUser = async (formData : RegistrationForm) => {

    try {
        const response = await publicApiClient.post("/api/auth/register", formData);
        if(response.data.token) {
            localStorage.setItem('jwtToken', response.data.token);
            console.log("token ");
            console.log(response.data.token);
            return true;
        }
        return false;
    }
    catch (error) {
        return false;
    }
}