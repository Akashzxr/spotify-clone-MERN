import React, { useState } from "react";
import logo from "../assets/spotify.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faRightFromBracket, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { searchSong } from "../api/songs";
import { useDispatch } from "react-redux";
import { storeSearch } from "../redux/songSlice";



function Navbar() {
  const [cookies, removeCookie] = useCookies([]);
  const [searchInput,setInput] = useState();
  const [searchResult,setResult] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //logout funtion
  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  //saving the input
  const handleSearch = (e) =>{
    setInput(e.target.value)
  }
 
  //handling the enter
  const handleEnter = async(e) =>{
    if(e.key === "Enter"){
      dispatch(storeSearch(await searchSong(searchInput)))
      navigate('/search')     
    }
  }

  

  return (
    <div className="bg-black py-3 flex items-center justify-between px-6">
      {/* logo */}
      <div>
        <img src={logo} alt="" className="w-10" />
      </div>

      {/* Search and home */}
      <div className="items-center gap-3 hidden md:flex">
        <Link to={'/'}>
        <div className="bg-navbar-gray rounded-full w-10 h-10 flex items-center justify-center">
          <FontAwesomeIcon icon={faHome} color="white" className="text-xl" />
        </div>
        </Link>
        

        <div className="bg-navbar-gray py-2 px-3 rounded-3xl flex items-center gap-5 transition-colors ease-out delay-150 hover:bg-stone-700 duration-300">
          <FontAwesomeIcon icon={faSearch} className="text-xl" color="white" />
          <input
            placeholder="What do you want to play?"
            type="text"
            className="w-80 border-none bg-inherit text-white focus:outline-none"
            onChange={handleSearch}
            onKeyDown={handleEnter}
          />
        </div>
      </div>

      {/* profile */}
      <div className="flex items-center gap-8">
        <div>
          <button onClick={logout} className="text-white flex items-center gap-4">Logout<FontAwesomeIcon icon={faRightFromBracket} color="white"/></button>
        </div>
        <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full">
          <span className="font-semibold text-lg">A</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
