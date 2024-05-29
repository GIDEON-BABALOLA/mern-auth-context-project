import { Link } from 'react-router-dom'
import { useLogout  } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar = () => {
  const { logout, error, isLoading} = useLogout()
  const { user } = useAuthContext()
const handleClick = async () => {
await logout()
}
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
        {user && (
        <div>
        <span>{user.email}</span>
<button onClick={handleClick} disabled={isLoading}>Log out</button>
<h3>{error}</h3>
        </div>
      )
        }
        {!user && (
          <div>
            <Link  to="/login">Login</Link>
            <Link  to="/signup">Signup</Link>
          </div>
        )
        }
        </nav>
      </div>
    </header>
  )
}

export default Navbar