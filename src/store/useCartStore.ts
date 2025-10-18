import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GuestCartStore } from "../interfaces/zustand-stores/guestCartStore";

export const useCartStore = create<GuestCartStore>()(
  persist(
    (set, get) => ({
      
      cart: { items : [] },
      totalPrice : 0,

      addItem: (item) => {
        const { cart } = get();
        const existing = cart.items.find((i) => i.plantId === item.plantId);

        let updatedItems;
        if (existing) {
          updatedItems = cart.items.map((i) =>
            i.plantId === item.plantId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          updatedItems = [...cart.items, item];
        }

        set({ cart: { items: updatedItems } });
        get().setTotalPrice();
      },

      removeItem: (plantId) => {
        const { cart } = get();
        const updatedItems = cart.items.filter((i) => i.plantId !== plantId);
        set({ cart: { items: updatedItems } });
        get().setTotalPrice();
      },

      updateQuantity: (plantId, quantity) => {
        const { cart } = get();
        const updatedItems = cart.items.map((i) =>
          i.plantId === plantId ? { ...i, quantity } : i
        );

        set({ cart: { items: updatedItems } });
        get().setTotalPrice();
      },

     clearCart: () => {
        set({ cart: { items: [] }, totalPrice: 0 }); 
      },
      setCart: (cart) => set({ cart }),


      setTotalPrice: () => {
        const { cart } = get();
        const updatedPrice = cart.items.reduce(
          (total,item) => {
            const price = item.plant?.price ?? 0;
            return total + (price * item.quantity);
          },0
        )
        set({totalPrice : updatedPrice});
        }
    }),
    {
      name: "guest-cart-storage",
    }
  )
);
