import { useAuthenticationStore } from "../store/authenticationStore"
import { useCartStore } from "../store/useCartStore"
import { apiClient } from "../api/apiclients/apiClient"
import type { Plant } from "../interfaces/plant";

export const useAddToCart = () => {
    const isAuthenticated = useAuthenticationStore(state=>state.isAuthenticated);
    const addItemToGuestCart = useCartStore(state => state.addItem);
    const setCart = useCartStore(state => state.setCart);

    const addToCart = async (item : {plantId : number , quantity : number, plant : Plant}) => {

        if(isAuthenticated) {
            try {
                const response = await apiClient.post("/api/cart", {plantId : item.plantId, quantity : item.quantity});
                setCart(response.data);
                return {success : true};
            } catch (error) {
                return { success: false, error: error };
            }
        } else {
            addItemToGuestCart(item);
            return {success : true};
        }
    }
    return {addToCart};
}