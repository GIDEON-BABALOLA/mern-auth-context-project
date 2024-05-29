import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { workout } from "../api/workouts";
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const signup = async (formData) => {
        // setIsLoading(true) //starting the request
        // setError(null)
        try{
            setIsLoading(true) //starting the request
            setError(null)
const response = await workout.post("/user/signup", formData)
if(response && response.data){
    dispatch({type : "LOGIN", payload : response.data})
    setIsLoading(false)
}
        }
        catch(err){
            setIsLoading(false)
            setError(err.response.data.error)
        }
        
        // const response = await fetch("http://localhost:5000/api/user/signup", {
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json",
        //     },
        //     body : JSON.stringify({email : email, password: password})
        // })
    //     const json = await response.json()
    //     console.log(json)
    //     if(!response.ok){
    //         setIsLoading(false)
    //         setError(json.error)
    //         console.log(json.error)
    //     }
    //     if(response.ok){
    //   //save the user to local storage
    //   localStorage.setItem("user", JSON.stringify(json))
    //   //Update auth context
    //   dispatch({type : "LOGIN", payload : json})
    //   setIsLoading(false)
        
    }
    return { signup, isLoading, error}
}
