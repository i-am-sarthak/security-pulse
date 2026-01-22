import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="
        relative flex h-9 w-16 items-center rounded-full
        bg-gray-300
        transition-colors duration-300
        focus:outline-none
      "
    >
      {/* Knob */}
      <span
        className={`
          absolute left-1 top-1 h-7 w-7 rounded-full
          bg-white
          shadow-md
          transition-all duration-300 ease-out
          ${isDark ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {/* Sun */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center text-sm
            transition-opacity duration-200
            ${isDark ? "opacity-0" : "opacity-100"}
          `}
        >
          ☀️
        </span>

        {/* Moon */}
        <span
          className={`
            absolute inset-0 flex items-center justify-center text-sm
            transition-opacity duration-200
            ${isDark ? "opacity-100" : "opacity-0"}
          `}
        >
          🌙
        </span>
      </span>
    </button>
  );
};
