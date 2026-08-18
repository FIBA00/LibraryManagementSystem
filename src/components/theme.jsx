import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/themeContext.jsx";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-xl p-2.5 text-text-muted hover:bg-surface-hover"
            aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}