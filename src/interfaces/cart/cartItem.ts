import type { Plant } from "../plant";

export interface CartItem {
    plantId : number , 
    quantity : number, 
    plant : Plant
}