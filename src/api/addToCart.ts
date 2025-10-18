import { apiClient } from "./apiclients/apiClient";
import type { AddToCart } from "../interfaces/addToCart";
import type { Cart } from "../interfaces/cart/cart";

export const addToCart = async (addToCart : AddToCart) : Promise<Cart> => {
    const reqBody = {plantId : addToCart.plantId, quantity : addToCart.quantity}
    const response = await apiClient.post("/api/cart", reqBody);
    return response.data;
}