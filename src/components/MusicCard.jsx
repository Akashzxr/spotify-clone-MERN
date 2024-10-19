import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function MusicCard({ image }) {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex music-card relative">
        <img className="w-11/12 h-44 rounded-md" src={image} alt="" />
        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center absolute self-end right-8 bottom-4 opacity-0 musiccard-play hover:bg-green-400">
          <FontAwesomeIcon icon={faPlay} className="text-xl" />
        </div>
      </div>

      <div className="text-gray-400 font-spotifytitle text-sm">
        <h3>Devara</h3>
        <h4>Anirudh</h4>
      </div>
    </div>
  );
}

export default MusicCard;
