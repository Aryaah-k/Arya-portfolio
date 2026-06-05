"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    queueMicrotask(() => {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      const nextTheme = savedTheme ?? "dark";
      setTheme(nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition flex items-center gap-2"
      aria-label="Toggle color theme"
    >
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}