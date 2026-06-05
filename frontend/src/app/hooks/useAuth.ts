import { useEffect, useState } from "react";

type AuthUser = {
    token: string;
} | null;

export const useAuth = () => {
    const [user, setUser] = useState<AuthUser>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        queueMicrotask(() => {
            const token = localStorage.getItem("token");
            setUser(token ? { token } : null);
            setLoading(false);
        });
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return { user, loading, login, logout };
};