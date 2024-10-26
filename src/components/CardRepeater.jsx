import React, { useEffect, useState } from "react";
import MusicCard from "./MusicCard";
import { homePlaylist } from "../utils/playlist";
import { getHomePlaylist } from "../api/songs";

function CardRepeater({ id }) {
  const [songs, setSongs] = useState();

  useEffect(() => {
    const playlistSongs = async () => {
      setSongs(await getHomePlaylist(id));
    };

    playlistSongs();
  }, []);

  return (
    <div className="flex items-center justify-between w-full">
      {songs
        ? songs.map((items, index) => (
            <MusicCard key={index} data={items} />
          ))
        : null}
    </div>
  );
}

export default CardRepeater;
