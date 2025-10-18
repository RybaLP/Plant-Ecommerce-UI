import type { GuestCartItem } from "../cart/guestCartItem";
import type { GuestCart } from "../cart/guestCart";

export interface GuestCartStore {
    cart : GuestCart;
    totalPrice : number;
    addItem : (item : GuestCartItem) => void;
    removeItem: (plantId: number) => void;
    clearCart: () => void;
    updateQuantity: (plantId: number, quantity: number) => void;
    setCart: (cart: GuestCart) => void;
    setTotalPrice : () => void;
}

