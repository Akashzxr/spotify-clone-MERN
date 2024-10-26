import axios from 'axios';


const api = axios.create({
    baseURL: "https://saavn.dev/api", 
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

