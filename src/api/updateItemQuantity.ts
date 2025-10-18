import { apiClient } from "./apiclients/apiClient";
import type { UpdateItemQuantityRequest } from "../interfaces/requests/updateItemQuantityRequest";

export const updateItemQuantity = async (updateItemQuantityRequest : UpdateItemQuantityRequest) => {
    const response = await apiClient.patch(`/api/cart/item/${updateItemQuantityRequest.plantId}/${updateItemQuantityRequest.quantity}`);
    return response.data;
}