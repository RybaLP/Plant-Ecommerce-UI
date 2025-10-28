export interface AdminAuthStore {
    isAuthenticated : boolean;
    setIsAuthenticated : () => void;
    logout: () => void;
}