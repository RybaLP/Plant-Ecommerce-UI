import { apiClient } from "./apiclients/apiClient";

export const deleteCartItem = async (plantId : number) => {

    const response = await apiClient.delete(`/api/cart/item/${plantId}`);
    return response.data;
}