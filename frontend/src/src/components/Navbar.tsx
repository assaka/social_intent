import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <BarChart2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Website Tracking Analyzer</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}>
              Home
            </Link>
            <Link to="/dashboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dashboard') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}>
              Dashboard
            </Link>
            <Link to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/about') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}>
              About
            </Link>
            <Link to="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/contact') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              } transition-colors duration-200`}>
              Contact
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link to="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            } transition-colors duration-200`} 
            onClick={closeMenu}>
            Home
          </Link>
          <Link to="/dashboard" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/dashboard') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            } transition-colors duration-200`} 
            onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/about" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            } transition-colors duration-200`} 
            onClick={closeMenu}>
            About
          </Link>
          <Link to="/contact" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/contact') 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            } transition-colors duration-200`} 
            onClick={closeMenu}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;