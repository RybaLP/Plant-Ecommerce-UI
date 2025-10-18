import type { CartItem } from "./cartItem"

export interface Cart {
    id : number,  
    totalPrice : number,  
    cartItems : CartItem[],
    updatedAt : number
}