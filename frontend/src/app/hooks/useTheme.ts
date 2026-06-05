import { useEffect, useState } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        queueMicrotask(() => {
            const saved = localStorage.getItem("theme") as "light" | "dark" | null;
            if (saved) setTheme(saved);
        });
    }, []);

    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return { theme, toggleTheme };
};