import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBackwardStep,
  faForwardStep,
  faHeart,
  faPause,
  faPlay,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { addToLiked, getLikedSongs } from "../api/playlist";

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isDisplay,setisDisplay] = useState(false);
  const audioRef = useRef(null);
  const [isLiked,setLiked] = useState(false);
  const song = useSelector((state) => state.song.song);

  // Toggle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  //handling the playlist display
  const playlistDisplay = () => {
   if (isDisplay){
    setisDisplay(false);
   }
   else{
    setisDisplay(true);
   }
  }

  // Update current time as the song progresses
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Load the duration of the audio
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };

  // Handle slider interaction to seek in the audio
  const handleSliderChange = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  //handle the volume change
  const handleVolume = (e) => {
    audioRef.current.volume = e.target.value / 100;
    setVolume(e.target.value);
  };

  // Format time (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  //Hadle like button click
  const likeClick = async () => {
    const result = await addToLiked(song.id);
  }

  //to play the song automaticaly when a song is clicked
  useEffect(() => {
    audioRef.current.play();
    setIsPlaying(true);

    
    //checking if current song is in liked
    const checkLiked = async () => {
      const result = await getLikedSongs();
      const likedArray = result.data.likedsongs;
      for(const item of likedArray){
        if(item === song.id){
          setLiked(true);
        }
        else{
          setLiked(false);
        }        
      }
    }

   checkLiked();    
  }, [song]);

  //setting the volume to 50% initially and pause intially
  useEffect(() => {
    audioRef.current.volume = 0.5;
    audioRef.current.pause();
    setIsPlaying(false);

  }, []);

  return (
    <div className="w-full max-w-full bg-black text-white p-4 flex items-center justify-between space-x-4">
      {/* Album Cover and Info */}
      <div className="flex items-center space-x-3">
        <img src={song.image} alt="Album Cover" className="w-12 h-12 rounded" />
        <div>
          <p className="text-sm font-bold max-w-48 music-name">{song.name}</p>
          <p className="text-xs text-gray-400">{song.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-2 items-center space-x-4 w-2/5">
        {/*  cotrol Buttons */}
        <div className="flex items-center gap-10">
          {/* previous btn */}
          <button>
            <FontAwesomeIcon className="text-xl" icon={faBackwardStep} />
          </button>
          {/* play/pause btn */}
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} color="black" />
            ) : (
              <FontAwesomeIcon icon={faPlay} color="black" />
            )}
          </button>
          {/* next btn */}
          <button>
            <FontAwesomeIcon className="text-xl" icon={faForwardStep} />
          </button>
        </div>

        {/* Custom Slider */}
        <div className="flex items-center space-x-2 w-full">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            className="slider w-full h-1 appearance-none bg-gray-700 rounded-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #339a33 ${
                (currentTime / duration) * 100
              }%, #374151 0%)`,
            }}
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* audio control and liked and add to playlist */}

      <div className="flex gap-4 items-center relative">
        {/* like option and add to playlist */}
        <div className="flex items-center gap-4">
          <button className="active:text-red-500" onClick={likeClick}>
            <FontAwesomeIcon icon={faHeart} className={isLiked ? "focus:text-red-800 text-red-800" : "focus:text-red-800" } />
          </button>

          <button onClick={playlistDisplay}>
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>

        {/* plalists list */}
        <div className={isDisplay ?`absolute bottom-9 bg-gray-600 px-4 py-2 max-h-24 rounded-md font-spotifytitle cursor-pointer` : "hidden"}>
            <div className="hover:bg-slate-500 rounded-md px-2">new playlist</div>
            <div className="hover:bg-slate-500 rounded-md px-2">another playlist</div>
        </div>

        {/* audio control */}
        <div className="flex items-center gap-2 justify-center">
          <button>
            <FontAwesomeIcon icon={faVolumeUp} />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            onChange={handleVolume}
            className="slider h-1 appearance-none bg-gray-700 rounded-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, #339a33 ${volume}%, #374151 0%)`,
            }}
          />
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={song.song}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
      ></audio>
    </div>
  );
};

export default Footer;
