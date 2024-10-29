import axios from 'axios';


const api = axios.create({
    baseURL: "https://saavn.dev/api", 
    withCredentials: false,
})


//home playlist songs data
export const getHomePlaylist = async (id) =>{
  try{
   const response =  await api.get(`/playlists?id=${id}&limit=5`)
   const songs = await response.data.data.songs;
   const songDetails = [];
   
   
   //extracting data from result and storing in a formated way
   for(const item of songs){
    songDetails.push({
        "id" : item.id,
        "name": item.name,
        "song" :  item.downloadUrl[4].url,
        "image" : item.image[2].url,
        "artist" : item.artists.primary[0].name
    })
   }
   return songDetails;
  }catch (error){
    console.error(error); 
  }
}


//song searching
export const searchSong = async (songName) => {
  try{
    const response =  await api.get(`/search/songs?query=${songName}`)
    const searchResultArray = response.data.data.results;
    const searchResult = [];
  //extracting data from result and storing in a formated way
   for(const item of searchResultArray){
    searchResult.push({
        "id" : item.id,
        "name": item.name,
        "song" :  item.downloadUrl[4].url,
        "image" : item.image[2].url,
        "artist" : item.artists.primary[0].name,
        "duration" : item.duration
    })
   }
   return searchResult;
  }catch(error){
    console.error(error);
  }
}


//get songs by id
export const songById = async (id) => {
  try {
    const response = await api.get(`/songs/${id}`);
   return response;
  } catch (error) {
    console.error(error);

  }
}
