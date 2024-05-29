import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import avatar from "../assets/profile.png"
import convertToBase64 from "../helper/convert"
const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profile, setProfile] = useState()
    const [picture, setPicture] = useState()
        const { signup, error, isLoading} = useSignup()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)
        formData.append("picture", picture)
        await signup(formData)
    }
    const onUpload = async (e) => {
        setPicture(e.target.files[0])
        const base64 = await convertToBase64(e.target.files[0])
         setProfile(base64)
    }
  return (
    
    <form className="signup" onSubmit={handleSubmit}>
       <div className="register-avatar" style={{ textAlign : "center"}}>
        <label htmlFor="profile">
        <img src={profile ||  avatar} alt="profile" className="profile-img" style={{borderRadius : "50%", width : "15%", height : "5%"}}></img>

        </label>
        <input onChange={onUpload} type="file" id="profile" name="profile" alt="profile" className="profile-input"
        style={{display: "none", cursor : "pointer"}}
        ></input>
         </div>
<h3>Sign up</h3>
<label>Email:</label>
<input 
    type="email"
    onChange={(e) => setEmail(e.target.value)}
    value={email}

/>
<label>Password:</label>
<input 
    type="password"
    onChange={(e) => setPassword(e.target.value)}
    value={password}
        
/>

<button disabled={isLoading}> { isLoading ? <span class="loader"></span>  : "Sign up"}</button>
{error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup