import { createSlice } from '@reduxjs/toolkit'
import SearchResult from '../components/searchResult';

export const songSlice = createSlice({
  name: 'song',
  initialState: {
    song: {
        id: "A_KJ7TO7",
        song:"https://aac.saavncdn.com/651/5397403bde88ed978cc0ce56e348aae5_320.mp4",
        artist: "Anirudh",
        name : "Dheema (From &quot;Love Insurance Kompany&quot)",
        image : "https://c.saavncdn.com/651/Dheema-From-Love-Insurance-Kompany-Tamil-2024-20241015191442-500x500.jpg",
    },
    songIndex: 0,
    searchResult: [],
    playlistSongs: [],
  },
  reducers: {
    //to store the song detail of clicked song
    storeSong: (state, action) => {
      state.song = action.payload;
    },
    //to store the search result
    storeSearch: (state,action) => {
      state.searchResult = action.payload;
      console.log(state.searchResult);
    },
    //to store the songs in playlist
    storePlaylistSongs: (state,action) => {
      state.playlistSongs = action.payload;
    },
    //store song index
    storeSongIndex: (state,action) => {
     state.songIndex = action.payload;
     console.log(state.songIndex);
    },
    //next song storing function
    storeNext : (state,action) => {
      if(state.playlistSongs.length > 0){
        //increasing the songindex to work the next button when clicking next time.
        state.songIndex = state.songIndex+1;
        //reseting the index to play first song if it clicked next while playing last song in the playlist.
        if(state.songIndex >= state.playlistSongs.length){
          state.songIndex = 0;
        }
        //storing the song details in song state
        state.song = state.playlistSongs[state.songIndex];
      }
      else{
        console.log("there is no playlist");    
      }
    },
   //previous song storing function
    storePrevious : (state,action) => {
      if(state.playlistSongs.length > 0){
        //increasing the songindex to work the next button when clicking next time.
        state.songIndex = state.songIndex-1;
        //reseting the index to play first song if it clicked next while playing last song in the playlist.
        if(state.songIndex <= 0 ){
          state.songIndex = 0;
        }
        //storing the song details in song state
        state.song = state.playlistSongs[state.songIndex];
      }
      else{
        console.log("there is no playlist");    
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { storeSong,storeSearch,storePlaylistSongs,storeNext,storeSongIndex,storePrevious } = songSlice.actions;

export default songSlice.reducer