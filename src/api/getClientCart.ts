import { apiClient } from "./apiclients/apiClient";
import type { Cart } from "../interfaces/cart/cart";

export const getClientCart = async () : Promise <Cart> => {

    const response = await apiClient.get("/api/cart");
    return response.data;
    
}