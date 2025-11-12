import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-navy text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-accent hover:text-white transition">
          Security Pulse
        </Link>

        <div className="space-x-6 text-lg">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-accent">Articles</Link>
              <Link to="/saved" className="hover:text-accent">Saved</Link>
              <button
                onClick={logout}
                className="bg-accent text-navy px-3 py-1 rounded-md font-semibold hover:bg-gray-light transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent">Login</Link>
              <Link to="/register" className="hover:text-accent">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
