import React, { useEffect, useState } from "react";
import MusicCard from "../components/MusicCard";
import img from "../assets/img.jpg";
import { homePlaylist } from "../utils/playlist";
import { getHomePlaylist } from "../api/songs";
import CardRepeater from "../components/CardRepeater";

function Home() {
  const items = [1, 2, 3, 4, 5];
  const [songs, setSongs] = useState();

  useEffect(() => {
    const playlistSongs = async () => {
      setSongs(await getHomePlaylist(6689255));
    };

    playlistSongs();
  }, []);

  return (
    <div className="bg-background-gray w-full px-6 py-5 flex flex-col gap-10 max-h-78.1vh overflow-y-auto">
      {
        homePlaylist.map((playlist,index)=> (
        <div className="flex flex-col gap-6" key={index}>
          <h2 className="text-white font-spotifytitle font-bold text-2xl tracking-wider">
            {playlist.title}
          </h2>
          <div className="flex items-center justify-between">
              <CardRepeater id={playlist.id}/>
          </div>
        </div>
        ))
      }

    </div>
  );
}

export default Home;
