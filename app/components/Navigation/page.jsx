

const Navigation = () => {
  return (
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a
              href="/login"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Login
            </a>
            <a
              href="/upload"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Upload
            </a>
            <a
              href="/sign-up"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              Sign Up
            </a>
            <a
              href="/profile"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Profile
            </a>
            <a
              href="/projects"
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Projects
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
