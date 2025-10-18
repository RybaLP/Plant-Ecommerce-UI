export interface AuthenticationStore {
    isAuthenticated : boolean,
    setAuthenticated : () => void,
    logout : () => void,
    checkAuthentication : () => void
}