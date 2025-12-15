import type { CreateUserOrder } from "../interfaces/requests/createUserOrder";
import type { CreateOrderRes } from "../interfaces/responses/createOrderRes";
import { apiClient } from "./apiclients/apiClient";

export const createOrder = async (reqBody : CreateUserOrder) : Promise<CreateOrderRes> => {
    const response = await apiClient.post("/api/orders", reqBody);
    return response.data;
}