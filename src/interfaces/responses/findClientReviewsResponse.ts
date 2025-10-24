import type { Plant } from "../plant";
import type { Rate } from "../../types/rate";

export interface FindClientReviewsResponse {
    id : number , 
    rate : Rate , 
    comment : string , 
    reviewDate : Date,
    username : string,
    plant : Plant
}