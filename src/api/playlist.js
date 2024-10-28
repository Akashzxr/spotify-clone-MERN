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