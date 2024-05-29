import axios from "axios"
export const workout = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials : true
})