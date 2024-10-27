import { createSlice } from '@reduxjs/toolkit'
import SearchResult from '../components/searchResult';

export const songSlice = createSlice({
  name: 'song',
  initialState: {
    song: {
        song:"https://aac.saavncdn.com/651/5397403bde88ed978cc0ce56e348aae5_320.mp4",
        artist: "Anirudh",
        name : "Dheema (From &quot;Love Insurance Kompany&quot)",
        image : "https://c.saavncdn.com/651/Dheema-From-Love-Insurance-Kompany-Tamil-2024-20241015191442-500x500.jpg",
    },
    searchResult: []
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
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { storeSong,storeSearch } = songSlice.actions;

export default songSlice.reducer