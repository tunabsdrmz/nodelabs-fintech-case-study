"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  AuthConfig,
  getToken,
  getStoredUser,
  removeItem,
  setToken,
  setUserData,
} from "@/utils/local-storage-helper";
import type { StoredUserDataType } from "@/utils/local-storage-helper";
import { AuthPrivateService } from "@/services/PrivateRequests/auth";
import { queryClient } from "@/lib/react-query";
import toast from "react-hot-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  user: StoredUserDataType | null;
  login: (token: { accessToken: string; refreshToken: string }) => void;
  signup: (user: StoredUserDataType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [user, setUser] = useState<StoredUserDataType | null>(null);

  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();
    const authenticated = !!token?.accessToken || !!storedUser;
    queueMicrotask(() => {
      setIsAuthenticated(authenticated);
      setUser(storedUser);
      setIsAuthReady(true);
    });
  }, []);

  const login = (token: { accessToken: string; refreshToken: string }) => {
    setToken(token);
    const storedUser = getStoredUser();
    setIsAuthenticated(true);
    setUser(storedUser);
  };

  const signup = (userData: StoredUserDataType) => {
    setUserData(userData);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await AuthPrivateService.logout();
      removeItem(AuthConfig.storageUserDataName);
      queryClient.clear();
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthReady, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
