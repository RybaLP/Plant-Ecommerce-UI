import type { CreateGuestOrder } from "../interfaces/requests/createGuestOrder";
import type { CreateOrderRes } from "../interfaces/responses/createOrderRes";
import { publicApiClient } from "./apiclients/publicApiClient";

export const createGuestOrder = async (createGuestOrder : CreateGuestOrder) : Promise <CreateOrderRes> =>{
    try {
        const response = await publicApiClient.post("/api/orders/guest", createGuestOrder);
        return response.data;
    } catch (error) {
        throw new Error("Order creation process failed");        
    }
}