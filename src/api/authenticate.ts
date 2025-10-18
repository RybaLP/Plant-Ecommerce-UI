import type { LoginForm } from "../interfaces/loginForm";
import { publicApiClient } from "./apiclients/publicApiClient";

export const authenticateUser = async (formData: LoginForm) : Promise<boolean>  => {
  try {
    const response = await publicApiClient.post(
      "/api/auth/authenticate",
      formData
    );

    if (response.data.token) {
      localStorage.setItem("jwtToken", response.data.token);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Błąd logowania:", error);
    return false;
  }
};
