import axios from "axios"
export const workout = axios.create({
    baseURL : "https://mern-auth-context-api.onrender.com/api",
    withCredentials : true
})