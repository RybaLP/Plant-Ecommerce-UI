import { publicApiClient } from "./apiclients/publicApiClient";
import type { Plant } from "../interfaces/plant";

export const getLandingPagePlants = async () : Promise<Plant[]> => {
    const response = await publicApiClient.get("/api/plant/landing-page");
    return response.data;
}