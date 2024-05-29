import { useState, useEffect } from "react"
import { useLogin } from "../hooks/useLogin"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [check, setCheck] = useState(false)
    const {login, error, isLoading} = useLogin()
    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(email, password)
        check ? localStorage.setItem("rememberme", JSON.stringify({email, password})) : localStorage.removeItem("rememberme")

    }
    const rememberMe = (e) => {
        setCheck(!check)
    }
    useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("rememberme"))
    if(userCredentials){
        setEmail(userCredentials.email)
        setPassword(userCredentials.password)
    }
    }, [])
  return (
    <form className="login" onSubmit={handleSubmit}>
<h3>Log in😊😊😊</h3>
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
<div style={{textAlign : "left"}} className="remember-me-class">
<div><input type="checkbox" className="remember-me" onClick={rememberMe}></input></div>
<div className="remember-me-text">Remeber Me</div>
</div>
<button disabled={isLoading}> { isLoading ? <span class="loader"></span>  : "Login in"}</button>
{error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login