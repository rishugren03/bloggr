"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  // add other user properties here
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseJwt = (token: string): User | null => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    // The 'sub' claim in a JWT often holds the user ID. 
    // The 'name' or 'username' claim for the username. Adjust if your token is different.
    return { id: decoded.sub || decoded.id, username: decoded.name || decoded.username };
  } catch (e) {
    console.error("Failed to parse JWT:", e);
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const router = useRouter();

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Here you might want to add a check to verify the token with your backend
      // For now, we'll just parse it.
      const userData = parseJwt(token);
      if (userData) {
        setUser(userData);
      } else {
        // Token is invalid or expired
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false); // End loading
  }, []);

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for changes in localStorage (e.g., login/logout in other tabs)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAuthStatus();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [checkAuthStatus]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const userData = parseJwt(token);
    setUser(userData);
    router.push("/"); // Redirect to feed after login
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login"); // Redirect to login after logout
  };

  const isAuthenticated = !loading && !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 