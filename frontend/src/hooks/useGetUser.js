import { useAuthContext } from "./useAuthContext";
import { workout } from "../api/workouts";
export const useGetUser = () => {
    const { dispatch, user } = useAuthContext()
    const getUser = async () => {
        dispatch({type : "LOADUSER", payload : {}})           
        try{
            if(user === null){
                throw Error("User is not logged in at all")
            }
    const response = await workout.get("/user/get-user")
    if(response && response.data){
    return response.data
    }
    }
    catch(err){
    return null
        }
    }
    return { getUser }
}
