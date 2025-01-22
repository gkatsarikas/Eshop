export type AuthContextType  = {
    isLoggedIn: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}