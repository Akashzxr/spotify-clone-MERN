import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
import {
  faAdd,
  faAngleDown,
  faArrowDown,
  faBackwardStep,
  faBars,
  faForwardStep,
  faHeart,
  faHome,
  faMagnifyingGlass,
  faPause,
  faPlay,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToLiked,
  getLikedSongs,
  getUserPlaylist,
  addSongToPlaylist,
} from "../api/playlist";
import { storeNext, storePrevious } from "../redux/songSlice";

const MobilePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isDisplay, setisDisplay] = useState(false);
  const audioRef = useRef(null);
  const [isLiked, setLiked] = useState(false);
  const [playLists, setPlaylists] = useState();
  const song = useSelector((state) => state.song.song);
  const dispatch = useDispatch();

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
    if (isDisplay) {
      setisDisplay(false);
    } else {
      setisDisplay(true);
    }
  };

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
  };

  //add song to the playlist
  const addToplaylist = async (playlistid) => {
    const result = await addSongToPlaylist(playlistid.playlistId, song.id);
  };

  //handle next song
  const handleNextSong = () => {
    dispatch(storeNext());
  };

  //handle previous song
  const handlePreviousSong = () => {
    dispatch(storePrevious());
  };

  //to play the song automaticaly when a song is clicked
  useEffect(() => {
    audioRef.current.play();
    setIsPlaying(true);

    //checking if current song is in liked
    const checkLiked = async () => {
      const result = await getLikedSongs();
      const likedArray = result.songsid;
      for (const item of likedArray) {
        if (item === song.id) {
          setLiked(true);
          return;
        } else {
          setLiked(false);
        }
      }
    };
    checkLiked();

    //get the available playlists
    const getplaylists = async () => {
      const result = await getUserPlaylist();
      setPlaylists(result.data.playlists);
    };

    getplaylists();
  }, [song]);

  //setting the volume to 50% initially and pause intially
  useEffect(() => {
    // audioRef.current.volume = 0.5;
    audioRef.current.pause();
    setIsPlaying(false);
    console.log(isFullScreen);
  }, []);

  return (
    <div className="w-full px-1 fixed bottom-0 bg-black">
      <div
        className={`fullscreen-transition w-full bg-green-600 rounded-xl flex items-center justify-between  px-2 py-5 ${
          isFullScreen ? "h-screen" : "h-14"
        }`}
      >
        <div
          className={`flex items-center justify-between w-full ${
            isFullScreen ? "flex-col" : "flex-row"
          }`}
        >
          <FontAwesomeIcon
            onClick={() => setFullScreen(false)}
            icon={faAngleDown}
            className={`self-start px-2 py-4 z-20  ${
              !isFullScreen && "hidden"
            }`}
          />
          {/* image of the music */}
          <img
            src={song.image}
            alt="Album Cover"
            className={`fullscreen-transition w-12 h-12 rounded-lg ${
              isFullScreen && "w-full h-full"
            }`}
          />

          {/* music description */}
          <div
            className={`flex items-center gap-4 justify-end w-full ${
              isFullScreen && "justify-between px-4 py-4"
            }`}
          >
            {/* descriptoin of the music */}
            <div
            onClick={() => (!isFullScreen ? setFullScreen(true) : null)}
            >
              <p
                className={`font-bold overflow-ellipsis music-name ${
                  isFullScreen
                    ? "whitespace-normal text-lg max-w-60"
                    : "whitespace-nowrap text-sm max-w-48 w-48"
                }`}
              >
                {song.name}
              </p>
              <p
                className={` ${
                  isFullScreen
                    ? "text-base text-gray-300"
                    : "text-xs text-white"
                }`}
              >
                {song.artist}
              </p>
            </div>

            {/* like button */}
            <button className="active:text-red-500" onClick={likeClick}>
              <FontAwesomeIcon
                icon={faHeart}
                className={
                  isLiked
                    ? "focus:text-red-800 text-red-800 text-2xl"
                    : "focus:text-red-800 text-2xl"
                }
              />
            </button>

            <button
              onClick={playlistDisplay}
              className={isFullScreen ? "block" : "hidden"}
            >
              <FontAwesomeIcon icon={faAdd} />
            </button>

            {/* plalists list */}
            <div
              className={
                isDisplay
                  ? `overflow-y-auto absolute right-2 mb-24 bg-gray-600 px-4 py-2 max-h-24 rounded-md font-spotifytitle cursor-pointer`
                  : "hidden"
              }
            >
              {playLists
                ? playLists.map((item, index) => (
                    <div
                      onClick={() => addToplaylist(item)}
                      key={index}
                      className="hover:bg-slate-500 rounded-md px-2"
                    >
                      {item.playlistName}
                    </div>
                  ))
                : null}
            </div>

            {/* play/pause btn */}
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isFullScreen && "hidden"
              }`}
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <FontAwesomeIcon
                  icon={faPause}
                  color="black"
                  className="text-2xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlay}
                  color="black"
                  className="text-2xl"
                />
              )}
            </button>
          </div>

          {/* Controls */}
          <div
            className={`flex-col gap-2 items-center space-x-4 w-full ${
              isFullScreen ? "flex" : "hidden"
            }`}
          >
            {/* Custom Slider */}
            <div className="flex flex-col items-center space-x-2 w-full px-3 gap-2">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSliderChange}
                className="slider w-full h-1 appearance-none bg-gray-700 rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ffff ${
                    (currentTime / duration) * 100
                  }%, #374151 0%)`,
                }}
              />
              <div className="flex items-center justify-between w-full">
                <span className="text-xs">{formatTime(currentTime)}</span>
                <span className="text-xs">{formatTime(duration)}</span>
              </div>
            </div>
            {/*  cotrol Buttons */}
            <div className="flex items-center gap-16 justify-center">
              {/* previous btn */}
              <button onClick={handlePreviousSong}>
                <FontAwesomeIcon className="text-3xl" icon={faBackwardStep} />
              </button>
              {/* play/pause btn */}
              <button
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <FontAwesomeIcon
                    icon={faPause}
                    color="black"
                    className="text-xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    color="black"
                    className="text-xl"
                  />
                )}
              </button>
              {/* next btn */}
              <button onClick={handleNextSong}>
                <FontAwesomeIcon className="text-3xl" icon={faForwardStep} />
              </button>
            </div>
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

      {/* mobile navbar */}
      <div
        className={`fullscreen-transition justify-between items-center px-6 py-4 ${
          isFullScreen ? "opacity-0 flex" : "flex opacity-100"
        }`}
      >
        <Link to={'/'} className="flex flex-col items-center justify-center gap-1">
          <FontAwesomeIcon icon={faHome} color="white" className="text-xl" />
          <p className="text-white text-xs">Home</p>
        </Link>

        <div className="flex flex-col items-center justify-center gap-1">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color="white"
            className="text-xl"
          />
          <p className="text-white text-xs">Search</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <FontAwesomeIcon icon={faBars} color="white" className="text-xl" />
          <p className="text-white text-xs">Your Library</p>
        </div>
      </div>
    </div>
  );
};

export default MobilePlayer;
