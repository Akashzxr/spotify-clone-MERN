import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import SearchCard from "./SearchCard";

function SearchResult() {
  const songs = useSelector((state) => state.song.searchResult);

  return (
    <div className="text-white bg-background-gray w-full font-spotifytitle flex gap-8 flex-col max-h-78.1vh overflow-y-auto items-center py-7">
      {
        songs.length ? 
        songs.map((items, index) => (
            <SearchCard key={index} data={items} />
          ))
         : <h1 className="font-spotifytitle text-2xl max-h-3 my-auto">There is nothing to show</h1>
      }
    </div>
  );
}

export default SearchResult;