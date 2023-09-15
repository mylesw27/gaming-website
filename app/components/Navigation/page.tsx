'use client'
import { useState } from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarShortcut,
} from '@/components/ui/menubar';
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Implement your search logic here
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Menubar className="flex justify-between items-center p-2 bg-gray-900 border-gray-900 rounded-md-gray-900">
      <div className="flex items-center space-x-4">
        <a href="/">
          <img
            src="./logo.png"
            alt="Logo"
            className="object-contain h-10 w-10"
          />
        </a>
        <div className="hidden md:flex space-x-4">
          <MenubarMenu>
            <MenubarShortcut>Home</MenubarShortcut>
            <MenubarShortcut>Login</MenubarShortcut>
            <MenubarShortcut>File</MenubarShortcut>
            <MenubarShortcut>Sign Up</MenubarShortcut>
            <MenubarShortcut>Sign Out</MenubarShortcut>
            <MenubarShortcut>Games</MenubarShortcut>
          </MenubarMenu>
        </div>
      </div>
      <div className="md:flex items-center space-x-2">
        <form onSubmit={handleSearchSubmit}>
          <Input
            type="search"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      </div>
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="p-2 focus:outline-none"
        >
          Menu
        </button>
        {menuOpen && (
          <div className="mt-2">
            {/* Mobile Menu */}
            <MenubarMenu>
              <MenubarShortcut>Home</MenubarShortcut>
              <MenubarShortcut>Login</MenubarShortcut>
              <MenubarShortcut>File</MenubarShortcut>
              <MenubarShortcut>Sign Up</MenubarShortcut>
              <MenubarShortcut>Sign Out</MenubarShortcut>
              <MenubarShortcut>Games</MenubarShortcut>
            </MenubarMenu>
          </div>
        )}
      </div>
    </Menubar>
  );
};

export default Navigation;



