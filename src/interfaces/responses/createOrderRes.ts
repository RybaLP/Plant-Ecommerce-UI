import type { OrderType } from "../../types/orderType";

export interface CreateOrderRes {
    orderId : number, 
    orderNumber : string,
    totalPrice : number,
    status : OrderType
}