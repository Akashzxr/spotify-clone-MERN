import axios from "axios";
import { songById } from "./songs";

const api = axios.create({
  baseURL: "http://localhost:4000/playlist",
  withCredentials: true,
});

//get the user playlists
export const getUserPlaylist = async () => {
  try {
    const response = await api.get(`/getplaylist`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

//create a new playlist
export const createNewPlaylist = async (name) => {
  try {
    const response = await api.post("/create", {
      name: name,
    });
  } catch (error) {
    console.error(error);
  }
};

//add liked songs
export const addToLiked = async (songid) => {
  try {
    const response = await api.patch("/likesong", {
      songId: songid,
    });
  } catch (error) {
    console.error(error);
  }
};

//get the liked songs
export const getLikedSongs = async () => {
  try {
    const response = await api.get("/likedsongs");
    
    //getting the information about song from jiosaavan api using song id
    const songs = {
      songsid : response.data.likedsongs,
      songs:[]
    };
     const songsId = response.data.likedsongs;
    for (const item of songsId) {
      const songResult = await songById(item);
       songs.songs.push({
        "id": songResult.data.data[0].id,
        "name": songResult.data.data[0].name,
        "song":songResult.data.data[0].downloadUrl[4].url,
        "image": songResult.data.data[0].image[2].url,
        "artist": songResult.data.data[0].artists.primary[0].name,
        "duration":songResult.data.data[0].duration,
      }); 
    }
    return songs;
  } catch (error) {
    console.error(error);
  }
};

//add song to the playlist
export const addSongToPlaylist = async (playlistid, songid) => {
  try {
    const response = await api.patch("/addsong", {
      playlistId: playlistid,
      songId: songid,
    });
  } catch (error) {
    console.error(error);
  }
};

//get the song details in playlist
export const getPlaylistSong = async (playlistId) => {
  try {
    //getting the songs id from mongodb playlist
    const response = await api.get("/playlistsongs", {
      params: {
        playlistId: playlistId,
      },
    });
    //getting the information about song from jiosaavan api using song id
    const songs = [];
    const songsId = response.data.song;
    for (const item of songsId) {
      const songResult = await songById(item);
       songs.push({
        "id": songResult.data.data[0].id,
        "name": songResult.data.data[0].name,
        "song":songResult.data.data[0].downloadUrl[4].url,
        "image": songResult.data.data[0].image[2].url,
        "artist": songResult.data.data[0].artists.primary[0].name,
        "duration":songResult.data.data[0].duration,
      }); 
    }
    return songs;
  } catch (error) {
    console.error(error);
  }
};

//deleting the playlist
export const deletePlaylist = async (playlistId) => {
  try {
    const response = await api.delete(`/deleteplaylist/${playlistId}`)   
    return response;
  } catch (error) {
    console.error(error);
  }
}

