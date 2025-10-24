import type { Rate } from "../../types/rate";

export interface CreateReview {
    rate : Rate;
    comment : string ; 
    plantId : number
}