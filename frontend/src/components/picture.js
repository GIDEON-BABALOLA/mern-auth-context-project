import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import avatar from "../assets/profile.png"
import { workout } from '../api/workouts'
const Picture = () => {
    const { dispatch, user } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const onUpload = async (e) => {
      setError(null)
      setIsLoading(true)
        const formData = new FormData()
        formData.append("picture", e.target.files[0])
        try{
    const response = await workout.patch("/user/add-picture", formData)
    if(response && response.data){
      console.log(response.data)
 dispatch({type : "ADDPICTURE", payload : response.data})
 setIsLoading(false)
    }
        }catch(err){
            console.log(err)      
            setError(err.response.data)     
            setIsLoading(false) 
            console.log(err.response.data)                          
        }
    }
  return (
    <> 
    {isLoading ?  <span class="loader"></span>  :  <>
    <label htmlFor="profile">
        <img src={user.picture ||  avatar} alt="profile" className="profile-img" style={{borderRadius : "50%", width : "5%", height : "5%"}}></img>
        </label>
        <input onChange={onUpload} type="file" id="profile" name="profile" alt="profile" className="profile-input"
        style={{display: "none", cursor : "pointer"}}
        ></input>
        {error && "Unable To Upload Picture"}
    </>}
    </>
  )
}

export default Picture