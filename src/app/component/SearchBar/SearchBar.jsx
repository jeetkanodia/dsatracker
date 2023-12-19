import React from "react";
const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <>
      <div className="flex">
        <Dropdown />
        <div className="w-full ml-3 mr-28">
          <input
            value={searchQuery}
            onChange={handleSearch}
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="   Search for Questions..."
            required
          />
        </div>
        <div className="relative">
          <ShuffleButton />
        </div>
      </div>
    </>
  );
};

const ShuffleButton = () => {
  return (
    <>
      <button className="absolute w-[6.25rem] flex top-0 items-center text end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-lg border-2 border-blue-700 hover:bg-blue-800    focus:outline-none focus:ring-blue-300 dark:bg-[#212121] dark:hover:bg-[#21] ">
        <p className="p-1">Shuffle 🔀</p>

        <span className="sr-only">Search</span>
      </button>
    </>
  );
};

const Dropdown = () => {
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
        type="button"
      >
        Filters{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg  shadow w-28 dark:bg-gray-700"
      >
        <ul
          className=" text-sm text-gray-700 dark:text-gray-200 "
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:rounded-t-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:rounded-b-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SearchBar;
