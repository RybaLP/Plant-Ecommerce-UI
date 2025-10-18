import type { CreateUserOrder } from "../interfaces/requests/createUserOrder";
import type { CreateOrderResponse } from "../interfaces/responses/createOrderResponse";
import { apiClient } from "./apiclients/apiClient";

export const createUserOrder = async (reqBody : CreateUserOrder) : Promise<CreateOrderResponse> => {
    try {
        const response = await apiClient.post("/api/orders",reqBody);
        return response.data;
    } catch (error) {
        throw new Error("Order creation process failed.");        
    }
}