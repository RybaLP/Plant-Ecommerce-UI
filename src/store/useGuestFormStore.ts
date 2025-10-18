import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GuestFormStore } from "../interfaces/zustand-stores/guestFormStore";

export const useGuestFormStore = create<GuestFormStore>()(
  persist(
    (set) => ({
      guestFirstName: "",
      guestLastName: "",
      guestEmail: "",
      guestPhone: "",
      shippingAddress: { street: "", city: "", postalCode: "", country: "" },

      // optional fields
      companyName : "",
      nip : "",

      setGuestInfo: (data: Partial<GuestFormStore>) =>
        set((state) => ({ ...state, ...data })),

      clearGuestForm: () =>
        set({
          guestFirstName: "",
          guestLastName: "",
          guestEmail: "",
          guestPhone: "",
          shippingAddress: { street: "", city: "", postalCode: "", country: "" },
          companyName : "",
          nip : "",
        }),
    }),
    {
      name: "guest-form-storage", 
    }
  )
);
