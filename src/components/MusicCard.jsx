import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getHomePlaylist } from "../api/songs";
import { useDispatch } from "react-redux";
import { storeSong } from "../redux/songSlice";

function MusicCard({ data }) {
  const dispatch = useDispatch();

  const handleCardClick = () =>{
     dispatch(storeSong(data))
  }

  return (
    <div className="flex flex-col gap-2" onClick={handleCardClick}>
      <div className="flex music-card relative w-44">
        <img className="w-11/12 h-40 rounded-md md:h-44" src={data.image} alt=""/>
        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center absolute self-end right-8 bottom-4 opacity-0 musiccard-play hover:bg-green-400">
          <FontAwesomeIcon icon={faPlay} className="text-xl" />
        </div>
      </div>

      <div className="text-gray-400 font-spotifytitle text-sm overflow-hidden">
        <h3 className="max-w-40 max-h-12 text-ellipsis overflow-hidden music-name md:max-w-48">{data.name}</h3>
        <h4 className="text-gray-200 mt-2">{data.artist}</h4>
      </div>
    </div>
  );
}

export default MusicCard;
