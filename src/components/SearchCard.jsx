import React from "react";
import { useDispatch } from "react-redux";
import { storeSong } from "../redux/songSlice";

function SearchCard({ data }) {
  const dispatch = useDispatch();

  //to format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  //to play song on click
  const handleCardClick = () => {
    dispatch(storeSong(data));
  };

  return (
    <div
      className="flex items-center justify-between w-1/2"
      onClick={handleCardClick}
    >
      {/* image and song title and artist */}
      <div className="flex items-center gap-2">
        <img src={data.image} className="rounded-lg w-12 h-12" />
        <div className="flex flex-col text-base">
          <p className="text-gray-200">{data.name}</p>
          <p className="text-gray-400">{data.artist}</p>
        </div>
      </div>

      {/* song duration */}
      <div className="text-gray-400 text-base">{formatTime(data.duration)}</div>
    </div>
  );
}

export default SearchCard;
