import type { Rate } from "../../types/rate";
import type { PlantResponse } from "./plantResponse";

export interface ReviewResponse {
    id : number,
    rate : Rate,
    comment : string,
    reviewDate : Date,
    username : string,
    plant : PlantResponse
}