import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/AuthType";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token); // Set logged-in state based on token presence
    }, []);
  
    const login = (accessToken: string, refreshToken: string) => {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setIsLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Custom hook to use AuthContext
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };