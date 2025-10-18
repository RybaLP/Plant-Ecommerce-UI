import type { RoleType } from "../types/roleType";
import type { Cart } from "./cart/cart";

export interface Client {
    id : number, 
    firstName : string , 
    lastName : string , 
    email : string ,
    role : RoleType,
    cart : Cart,
}