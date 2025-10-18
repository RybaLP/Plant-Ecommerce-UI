import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthenticationStore } from "../interfaces/zustand-stores/authenticationStore";

export const useAuthenticationStore = create<AuthenticationStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      setAuthenticated: () => {
        set({ isAuthenticated: true });
      },

      logout: () => {
        set({ isAuthenticated: false });
        localStorage.removeItem("jwtToken");
      },

      checkAuthentication: () => {
        const token = localStorage.getItem("jwtToken");
        set({ isAuthenticated: !!token });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
