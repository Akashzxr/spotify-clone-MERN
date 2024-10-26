import axios from 'axios';

//create an axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
})


export default api;