import type { Address } from "../address";
import type { OrderItem } from "./orderItem";
import type { OrderType } from "../../types/orderType";

export interface Order {
    id : number; 
    orderDate : Date;
    totalPrice : number ;
    shippingAddress : Address;
    deliveryPrice : number;
    status : OrderType;
    orderItems : OrderItem[];
    orderNumber : string; 
    nip? : string;
    companyName? : string;
}