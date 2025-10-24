import type { Rate } from "../types/rate"

export interface Review {
    id : number , 
    rate : Rate , 
    comment : string , 
    reviewDate : Date,
    username : string,
}