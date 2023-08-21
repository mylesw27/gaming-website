'use client';
import { useState } from 'react';
import '../../../styles/tailwind.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-3">
      <div className="flex items-center space-x-4">
        <img
          src="/logo.png"
          alt="GA Games logo"
          className="object contain h-16 w-16 "
        />
      </div>
      <div className={`block lg:hidden ${isMenuOpen ? 'mb-4' : ''}`}>
        <div className="flex justify-end">
          <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white mb-4"
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
        <div className={`w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col items-end space-y-4">
            <a href="/" className="text-teal-200 hover:text-white">
              Home
            </a>
            <a href="/login" className="text-teal-200 hover:text-white">
              Login
            </a>
            <a href="/sign-up" className="text-teal-200 hover:text-white">
              Sign Up
            </a>
            <a href="/profile" className="text-teal-200 hover:text-white">
              Profile
            </a>
            <a href="/games" className="text-teal-200 hover:text-white">
              Games
            </a>
            <div className="relative text-gray-600">
              <input
                className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-2"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
        <div className="relative text-gray-600 lg:block hidden">
          <input
            className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-3 mr-2"
          ></button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
