import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
           🪺 NoteNest 
        </h1>

        {/* Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 transform transition-all duration-200"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/60"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/60"
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
