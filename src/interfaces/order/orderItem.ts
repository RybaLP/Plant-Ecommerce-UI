import type { Plant } from "../plant";

export interface OrderItem {
    id : number ; 
    quantity : number; 
    priceAtPurchase : number;
    plant : Plant;
}