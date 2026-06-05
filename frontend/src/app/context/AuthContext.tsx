"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type UserProfile = {
    id: string;
    name: string;
    email: string;
};

type User = UserProfile | null;

type AuthContextType = {
    user: User;
    login: (userData: UserProfile) => void;
    logout: () => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        queueMicrotask(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser) as UserProfile);
                } catch {
                    localStorage.removeItem("user");
                    setUser(null);
                }
            }
            setLoading(false);
        });
    }, []);

    const login = (userData: UserProfile) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
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