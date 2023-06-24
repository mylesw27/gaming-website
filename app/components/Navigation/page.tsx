

const Navigation = () => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
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
      </nav>
    </div>
  );
};

export default Navigation;
