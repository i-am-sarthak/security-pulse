import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-dark text-gray-light px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-accent text-2xl font-bold">
          Security Pulse
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-accent transition">
                Home
              </Link>
              <Link to="/saved" className="hover:text-accent transition">
                Saved
              </Link>
              <button
                onClick={handleLogout}
                className="bg-accent text-navy px-3 py-1 rounded-md font-semibold hover:bg-gray-light transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-accent transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-accent transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger (Mobile Only) */}
        <button
        className="md:hidden text-accent focus:outline-none text-3xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        >
        {isOpen ? (
            // Close (X)
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
            </svg>
        ) : (
            // Hamburger
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
            </svg>
        )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-3 mt-3 bg-gray-dark border-t border-accent pt-3 pb-4 animate-slideDownFade">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-accent transition"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              <Link
                to="/saved"
                className="hover:text-accent transition"
                onClick={() => setIsOpen(false)}
              >
                Saved
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-accent text-navy px-3 py-2 rounded-md font-semibold hover:bg-gray-light transition w-fit mx-left"
                >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-accent transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-accent transition"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
