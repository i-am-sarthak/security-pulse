import { useTheme } from "../hooks/useTheme";

import Sun from "../assets/theme-toggle/sun-icon.svg";
import Moon from "../assets/theme-toggle/moon-icon.svg";
import BgLight from "../assets/theme-toggle/light-bg.svg";
import BgDark from "../assets/theme-toggle/dark-bg.svg";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-[67px] h-[30px] rounded-full overflow-hidden focus:outline-none"
    >
      {/* Background */}
      <img
        src={isDark ? BgDark : BgLight}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Knob */}
      <span
        className={`
          absolute top-[3px] left-[3px]
          w-[25px] h-[25px]
          rounded-full bg-white shadow-md
          flex items-center justify-center
          transition-transform duration-300 ease-out
          ${isDark ? "translate-x-[34px]" : "translate-x-0"}
        `}
      >
        <img
        src={isDark ? Moon : Sun}
        className={`
            w-full h-full object-contain transition-transform duration-200
            ${isDark ? "scale-[1.2]" : "scale-[1.4]"}
        `}
        />
      </span>
    </button>
  );
};
