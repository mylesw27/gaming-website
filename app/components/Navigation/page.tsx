'use client';
import { useState } from 'react';
import { Menubar, MenubarMenu, MenubarShortcut } from '@/components/ui/menubar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = async (event: any) => {
    event.preventDefault();
    router.push(`/games/search/${encodeURIComponent(searchValue)}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
    setIsMenuOpen(false);
  };

  return (
    <Menubar className="flex justify-between items-center bg-gray-900 border-gray-900 rounded-md-gray-900">
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
            <a href="/">
              <MenubarShortcut>Home</MenubarShortcut>
            </a>
            <a href="/login">
              <MenubarShortcut>Login</MenubarShortcut>
            </a>
            <a href="/sign-up">
              <MenubarShortcut>Sign Up</MenubarShortcut>
            </a>
            <a href="/sign-out">
              <MenubarShortcut>Sign Out</MenubarShortcut>
            </a>
            <a href="/games">
              <MenubarShortcut>Games</MenubarShortcut>
            </a>
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
        <NavigationMenu>
          <NavigationMenuItem className=''>
            {/* Mobile Menu Button */}
            <NavigationMenuTrigger
              onClick={toggleMenu}
              className=" focus:outline-none text-black"
            >
              Menu
            </NavigationMenuTrigger>

            {/* {isMenuOpen && (
              <div
                className={`mt-2 transition-transform transform ${
                  isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
              > */}
                {/* Mobile Menu */}
                <NavigationMenuContent className='flex flex-col space-y-2 p-2'>
                  <div>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                  </div>
                  <div>
                    <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                  </div>
                  <div>
                    <NavigationMenuLink href="/sign-up">Sign Up</NavigationMenuLink>
                  </div>
                  <div>
                    <NavigationMenuLink href="#" onClick={handleSignOut}>Sign Out</NavigationMenuLink>
                  </div>
                  <div>
                    <NavigationMenuLink href="/games">Games</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              {/* </div>
            )} */}
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </Menubar>
  );
};

export default Navigation;