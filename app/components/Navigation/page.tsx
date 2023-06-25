'use client'
import { useState } from 'react';
import '../../../styles/tailwind.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-teal-500 p-6">
      <div className="flex items-center space-x-4">
        <span className="text-white font-semibold text-xl tracking-tight">Logo</span>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <div className={`hidden lg:flex lg:items-center lg:space-x-4`}>
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Home
          </a>
          <a
            href="/login"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Login
          </a>
          <a
            href="/sign-up"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Sign Up
          </a>
          <a
            href="/profile"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Profile
          </a>
          <a
            href="/games"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Games
          </a>
        </div>
      </div>
      <div className={`w-full lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-end space-y-4">
          <a
            href="/"
            className="text-teal-200 hover:text-white"
          >
            Home
          </a>
          <a
            href="/login"
            className="text-teal-200 hover:text-white"
          >
            Login
          </a>
          <a
            href="/sign-up"
            className="text-teal-200 hover:text-white"
          >
            Sign Up
          </a>
          <a
            href="/profile"
            className="text-teal-200 hover:text-white"
          >
            Profile
          </a>
          <a
            href="/games"
            className="text-teal-200 hover:text-white"
          >
            Games
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
