import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/themeContext.jsx";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-full text-xs px-3 py-1.5 text-text-muted hover:bg-accent transition-colors delay-150 duration-200 ease-in-out cursor-pointer"
            aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}