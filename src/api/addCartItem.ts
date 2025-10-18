import { apiClient } from "./apiclients/apiClient";
import type { AddItemToCart } from "../interfaces/cart/addItemToCart";

export const addCartItem = async (addItemToCart : AddItemToCart) => {
    const reqBody = {plantId : addItemToCart.plantId, quantity : addItemToCart.quantity}
    const response = await apiClient.post("/api/cart", reqBody);
    return response.data;
}