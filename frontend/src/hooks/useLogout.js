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
    }
    return { logout, error, isLoading }
}

