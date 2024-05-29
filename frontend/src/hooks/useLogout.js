import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"
import { workout } from "../api/workouts"
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)
    const { dispatch : workoutDispatch } = useWorkoutsContext()
    const logout =  async () => {
         try{
    setIsLoading(true) //starting the request
    setError(null)
    const response = await workout.get("/user/logout")
    if(response.status === 204){
        setIsLoading(false)
        dispatch({type : "LOGOUT"}) //only the type is needed here, the payload is not needed
        workoutDispatch({type : "SET_WORKOUTS", payload : null})
    }
         }catch(err){
            setIsLoading(false)
            setError(err.response.data.error)
         }
        //remove user from storage
        // localStorage.removeItem("user")
        //dispatch takes in the action object
        // dispatch({type : "LOGOUT"}) //only the type is needed here, the payload is not needed
        // workoutDispatch({type : "SET_WORKOUTS", payload : null})
    }
    return { logout, error, isLoading }
}


// try{
//     setIsLoading(true) //starting the request
//     setError(null)
// const response = await workout.post("/user/login", {
// email : email,
// password : password
// })
// if(response && response.data){
// dispatch({type : "LOGIN", payload : response.data})
// setIsLoading(false)
// }
// }
// catch(err){
//     setIsLoading(false)
//     setError(err.response.data.error)
// }