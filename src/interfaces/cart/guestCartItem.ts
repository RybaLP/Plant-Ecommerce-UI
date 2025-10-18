import type { Plant } from "../plant";

export interface GuestCartItem {
    plantId : number ,
    quantity : number , 
    plant : Plant
}