import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "./dropDown";

const Header = () => {
  return (
    <nav className="bg-gray-800 px-4 py-2 flex lg:flex-row items-center flex-shrink-0">
      <div className="flex justify-between items-center">
        <span className="text-white text-xl ml-6 lg:mb-0 sm:mb-2">EBARTR</span>
      </div>
      <div className="flex flex-grow justify-center" id="navbar-collapse">
        <div className="w-2/3 flex items-center">
          <input
            type="text"
            placeholder="Search Product..."
            className="text-gray-500  py-2 w-3/4 rounded-l-lg"
          />
          <div className="bg-white h-10 w-10 flex justify-center items-center ml-0 rounded-r-lg cursor-pointer border">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
          </div>
        </div>
        <a
          href="/"
          className="text-gray-500 hover:text-gray-300 py-2 hidden lg:block underline-none"
        >
          Home
        </a>
      </div>
      <div className="flex my-3 my-0">
        <div className="lg:hidden">
          <DropdownMenu />
        </div>

        <a href="sell">
          <button className="bg-transparent hover:bg-white text-white hover:text-gray-900 py-1 px-3 rounded border border-solid border-white mr-2 hidden lg:block">
            &#43; SELL
          </button>
        </a>

        <a href="LoginSignup">
          <button className="bg-purple-700 hover:bg-purple-800 text-white py-1 px-3 rounded border border-solid border-purple-700 hover:border-purple-800 hidden lg:block">
            Log In/Sign Up
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Header;
