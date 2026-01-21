import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div
      className="
          min-h-screen px-6 py-8 animate-fadeIn
          bg-surface-muted text-charcoal
          dark:bg-navy dark:text-gray-light
          transition-colors
        "
    >

      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
