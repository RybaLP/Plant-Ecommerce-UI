import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GuestCartStore } from "../interfaces/zustand-stores/guestCartStore";

export const useCartStore = create<GuestCartStore>()(
  persist(
    (set, get) => ({
      cart: { items: [] },
      totalPrice: 0,

      addItem: (item) => {
        const { cart } = get();
        const currentItems = cart?.items ?? [];

        const existing = currentItems.find((i) => i.plantId === item.plantId);

        const updatedItems = existing
          ? currentItems.map((i) =>
              i.plantId === item.plantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          : [...currentItems, item];

        set({ cart: { items: updatedItems } });
        get().setTotalPrice();
      },

      removeItem: (plantId) => {
        const { cart } = get();
        const currentItems = cart?.items ?? [];

        const updatedItems = currentItems.filter((i) => i.plantId !== plantId);
        set({ cart: { items: updatedItems } });
        get().setTotalPrice();
      },

      updateQuantity: (plantId, quantity) => {
        const { cart } = get();
        const currentItems = cart?.items ?? [];

        const updatedItems = currentItems.map((i) =>
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
        const currentItems = cart?.items ?? [];

        const updatedPrice = currentItems.reduce((total, item) => {
          const price = item.plant?.price ?? 0;
          return total + price * item.quantity;
        }, 0);

        set({ totalPrice: updatedPrice });
      },
    }),
    {
      name: "guest-cart-storage",
      onRehydrateStorage: () => (state, error) => {
        if (!state?.cart) {
          useCartStore.setState({ cart: { items: [] }, totalPrice: 0 });
        }
        if (error) {
          console.error("Błąd przy rehydratacji koszyka:", error);
        }
      },
    }
  )
);
