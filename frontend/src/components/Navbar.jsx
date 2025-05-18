// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
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
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-[#306F84] text-white hover:bg-[#2C6F85] px-6 py-2 rounded-md text-lg font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
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
              </>
            )}
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
        <div className="md:hidden bg-white shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => handleLinkClick('/')}
              className={`block w-full text-left pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-gray-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('/community-health')}
              className={`block w-full text-left pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/community-health')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-gray-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Community Health
            </button>
            <button
              onClick={() => handleLinkClick('/hospital-forecast')}
              className={`block w-full text-left pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/hospital-forecast')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-gray-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Hospital Resource
            </button>
            <button
              onClick={() => handleLinkClick('/chatbot')}
              className={`block w-full text-left pl-3 pr-4 py-4 border-l-4 text-xl font-medium ${
                isActive('/chatbot')
                  ? 'border-[#2C6F85] text-[#2C6F85] bg-gray-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-[#2C6F85] hover:text-[#2C6F85]'
              }`}
            >
              Chatbot
            </button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left pl-3 pr-4 py-4 border-l-4 border-transparent text-xl font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleLinkClick('/login')}
                    className="block w-full text-left pl-3 pr-4 py-4 border-l-4 border-transparent text-xl font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleLinkClick('/signup')}
                    className="block w-full text-left pl-3 pr-4 py-4 border-l-4 border-transparent text-xl font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
