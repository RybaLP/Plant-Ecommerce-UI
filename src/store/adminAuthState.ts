import {create} from "zustand";
import {persist} from "zustand/middleware";
import type { AdminAuthStore } from "../interfaces/zustand-stores/adminAuthStore";


export const useAdminAuthStore = create<AdminAuthStore>()(
    persist(
        (set) => ({
            isAuthenticated : false,
            setIsAuthenticated : () => set({isAuthenticated : true}),
            logout : () => set({isAuthenticated : false})
        }),
        {
            name : "admin-auth"
        }
    )
);