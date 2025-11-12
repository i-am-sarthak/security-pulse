import { Navbar } from "../components/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="bg-navy min-h-screen text-gray-light">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
