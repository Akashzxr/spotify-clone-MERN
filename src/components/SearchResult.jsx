import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { storeSearch } from "../redux/songSlice";
import { searchSong } from "../api/songs";
import { useNavigate } from "react-router-dom";

function SearchResult() {
  const songs = useSelector((state) => state.song.searchResult);
  const [searchInput,setInput] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="text-white bg-background-gray w-full font-spotifytitle flex gap-8 flex-col max-h-78.1vh overflow-y-auto items-center py-7">
      {/* search bar for mobile devices */}
      <div className="bg-navbar-gray py-2 px-3 w-11/12 rounded-3xl flex items-center gap-5 transition-colors ease-out delay-150 hover:bg-stone-700 duration-300 md:hidden">
        <FontAwesomeIcon icon={faSearch} className="text-xl" color="white" />
        <input
          placeholder="What do you want to play?"
          type="text"
          className="w-80 border-none bg-inherit text-white focus:outline-none"
          onChange={handleSearch}
          onKeyDown={handleEnter}
        />
      </div>

      {songs.length ? (
        songs.map((items, index) => <SearchCard key={index} data={items} />)
      ) : (
        <h1 className="font-spotifytitle text-2xl max-h-3 my-auto">
          There is nothing to show
        </h1>
      )}
    </div>
  );
}

export default SearchResult;
