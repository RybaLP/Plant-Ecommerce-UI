import type { CreateGuestOrder } from "../interfaces/requests/createGuestOrder";
import type { CreateOrderResponse } from "../interfaces/responses/createOrderResponse";
import { publicApiClient } from "./apiclients/publicApiClient";

export const createGuestOrder = async (createGuestOrder : CreateGuestOrder) : Promise <CreateOrderResponse> =>{
    try {
        const response = await publicApiClient.post("/api/orders/guest/cod", createGuestOrder);
        return response.data;
    } catch (error) {
        throw new Error("Order creation process failed");        
    }
}