import React from "react";
import logo from "../assets/spotify.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className="bg-black py-3 flex items-center justify-between px-6">
      {/* logo */}
      <div>
        <img src={logo} alt="" className="w-10" />
      </div>

      {/* Search and home */}
      <div className="flex items-center gap-3">
        <div className="bg-navbar-gray rounded-full w-10 h-10 flex items-center justify-center">
          <FontAwesomeIcon icon={faHome} color="white" className="text-xl" />
        </div>

        <div className="bg-navbar-gray py-2 px-3 rounded-3xl flex items-center gap-5 transition-colors ease-out delay-150 hover:bg-stone-700 duration-300">
          <FontAwesomeIcon icon={faSearch} className="text-xl" color="white" />
          <input
            placeholder="What do you want to play?"
            type="text"
            className="w-80 border-none bg-inherit text-white focus:outline-none"
          />
        </div>
      </div>

      {/* profile */}
      <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full">
        <span className="font-semibold text-lg">A</span>
      </div>
    </div>
  );
}

export default Navbar;
