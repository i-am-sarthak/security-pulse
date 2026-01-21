import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative inline-flex h-8 w-16 items-center rounded-full
        bg-gray-300 dark:bg-gray
        transition-colors duration-300
        focus:outline-none
      "
      aria-label="Toggle theme"
    >
      {/* Knob */}
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full
          bg-white dark:bg-navy
          transition-transform duration-300
          ${isDark ? "translate-x-9" : "translate-x-1"}
        `}
      />

      {/* Icons */}
      <span className="absolute left-2 text-xs">☀️</span>
      <span className="absolute right-2 text-xs">🌙</span>
    </button>
  );
};
