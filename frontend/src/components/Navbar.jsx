// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#DAEEF8] shadow-md h-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-[#2C6F85]">SCH</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium ${
                isActive('/')
                  ? 'border-[#2C6F85] text-[#2C6F85]'
                  : 'border-transparent text-gray-500 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/community-health"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium ${
                isActive('/community-health')
                  ? 'border-[#2C6F85] text-[#2C6F85]'
                  : 'border-transparent text-gray-500 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Community Health
            </Link>
            <Link
              to="/hospital-forecast"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium ${
                isActive('/hospital-forecast')
                  ? 'border-[#2C6F85] text-[#2C6F85]'
                  : 'border-transparent text-gray-500 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Hospital Resource
            </Link>
            <Link
              to="/chatbot"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium ${
                isActive('/chatbot')
                  ? 'border-[#2C6F85] text-[#2C6F85]'
                  : 'border-transparent text-gray-500 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Chatbot
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="bg-[#306F84] text-white hover:bg-[#2C6F85] px-6 py-2 rounded-md text-lg font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#306F84] text-white hover:bg-[#2C6F85] px-6 py-2 rounded-md text-lg font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
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
              ) : (
                <svg
                  className="block h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-[#DAEEF8]'
                  : 'border-transparent text-gray-500 hover:bg-[#DAEEF8] hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/community-health"
              className={`block pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/community-health')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-[#DAEEF8]'
                  : 'border-transparent text-gray-500 hover:bg-[#DAEEF8] hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Community Health
            </Link>
            <Link
              to="/hospital-forecast"
              className={`block pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/hospital-forecast')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-[#DAEEF8]'
                  : 'border-transparent text-gray-500 hover:bg-[#DAEEF8] hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Hospital Resource
            </Link>
            <Link
              to="/chatbot"
              className={`block pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/chatbot')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-[#DAEEF8]'
                  : 'border-transparent text-gray-500 hover:bg-[#DAEEF8] hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Chatbot
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                to="/login"
                className="block pl-3 pr-4 py-4 border-l-4 border-transparent text-xl font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block pl-3 pr-4 py-4 border-l-4 border-transparent text-xl font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
