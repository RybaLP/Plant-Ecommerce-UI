import type { OrderType } from "../../types/orderType";
import { apiAdmin } from "../apiclients/adminApiClient";

export const updateOrderStatus = async (id : number , orderStatus : OrderType) => {
    const response = await apiAdmin.patch(`/api/orders/admin/order-status/${id}`, {orderStatus : orderStatus});
    return response.data; 
}