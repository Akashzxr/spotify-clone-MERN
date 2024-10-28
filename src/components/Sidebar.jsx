import React, { useEffect, useState } from "react";
import liked from "../assets/liked-songs.png";
import saved from "../assets/saved.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBars } from "@fortawesome/free-solid-svg-icons";
import { getUserPlaylist } from "../api/playlist";
import { createNewPlaylist } from "../api/playlist";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [playlists, setPlaylists] = useState();
  const [isAddBtnActive,setAddBtnActive] = useState(false)
  const [playlistName,setPlaylistName] = useState();


  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  //toggle the input for playlist name
  const toggleInput = () => {
    setAddBtnActive(!isAddBtnActive);
    setPlaylistName("");
  }

  //handling the enter in input
  const handleEnter = async (e) => {
    if(e.key == "Enter"){
      const result = await createNewPlaylist(playlistName)
      toggleInput();
    }
  }

  useEffect(() => {
    const getdata = async () => {
      const result = await getUserPlaylist();
      setPlaylists(result.data.playlists);
      console.log(playlists);
    };

    getdata();
  }, [playlists,playlistName]);

  return (
    <div className="flex px-3 bg-black">
      {/* Sidebar */}
      <div
        className={`h-78.1vh overflow-y-auto bg-background-gray text-white px-2 py-3 duration-300 rounded-md ${
          isCollapsed ? "w-20" : "w-64"
        } relative`}
      >
        {/* Logo */}
        <div
          className={`flex px-3 items-center justify-start gap-x-4 ${
            isCollapsed ? "justify-center" : ""
          }`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
          <h1
            className={`text-xl font-bold duration-300 ${
              isCollapsed && "hidden"
            }`}
          >
            Your Library
          </h1>
        </div>

        {/* Menu Items */}
        <ul className="pt-6">
          {/* liked songs icon */}
          <li
            className={`flex items-center gap-x-4 p-2 cursor-pointer hover:bg-gray-700 rounded-md ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <span>
              <img src={liked} className="rounded-md w-14 h-12" />
            </span>
            <span className={`${isCollapsed ? "hidden" : "block"}`}>Liked</span>
          </li>

          {/* mapping the user playlists */}
          {playlists
            ? playlists.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-x-4 p-2 cursor-pointer hover:bg-gray-700 rounded-md ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                >
                  <span className="w-14 h-12 rounded-md bg-green-700 flex items-center justify-center font-spotifytitle text-3xl">
                    {Array.from(item.playlistName)[0]}
                  </span>
                  <span className={`${isCollapsed ? "hidden" : "block"}`}>
                    {item.playlistName}
                  </span>
                </li>
              ))
            : null}

          {/* crete new playlist button */}
          <li
           onClick={toggleInput}
            className={`flex items-center gap-x-4 p-2 cursor-pointer hover:bg-gray-700 rounded-md relative ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <span className="w-14 h-12 rounded-md bg-slate-700 flex items-center justify-center">
              <FontAwesomeIcon icon={faAdd} className="text-xl" />
            </span>
            <span className={`${isCollapsed ? "hidden" : "block"}`}>
              New Playlist
            </span>
          </li>
        </ul>
        <input value={playlistName} onKeyDown={handleEnter} onChange={(e)=>setPlaylistName(e.target.value)} type="text" placeholder="enter playlist name" className={isAddBtnActive ?"rounded-md text-black bg-slate-500 px-2" : "hidden"}/>
      </div>
    </div>
  );
};

export default Sidebar;
