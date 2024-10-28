import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:4000/playlist", 
    withCredentials: true
})


//get the user playlists
export const getUserPlaylist = async () =>{
    try {
        const response =  await api.get(`/getplaylist`)
        return response;
    } catch (error) {
        console.error(error);
    }
}

//create a new playlist
export const createNewPlaylist = async (name) => {
    try {
        const response = await api.post('/create',{
            name : name
        })
    } catch (error) {
        console.error(error);
    }
}

//add liked songs
export const addToLiked = async (songid) => {
    try {
        const response = await api.patch('/likesong',{
            songId : songid
        })        
    } catch (error) {
        console.error(error);
    }
}

//get the liked songs
export const getLikedSongs = async () => {
    try {
        const response = await api.get('/likedsongs');
        return response;
    } catch (error) {
        console.error(error);
    }
}