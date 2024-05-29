import { useEffect } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { workout }  from '../api/workouts'
import Picture from '../components/picture'
// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const { user } = useAuthContext()
  console.log(user.picture)                              
  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log(user.picture)   
      try{ 
const response = await workout.get("/workouts")
if(response && response.data){  
  dispatch({type: 'SET_WORKOUTS', payload: response.data}) 
}
      }catch(err){ 
        console.log(err.response.data.error)
console.log(err)
      }
    //   const response = await fetch('http://localhost:5000/api/workouts', {
    // headers : {
    //   "Authorization" : `Bearer ${user.token}`
    // }
    // })
    //   const json = await response.json()

    //   if (response.ok) {
    //     dispatch({type: 'SET_WORKOUTS', payload: json})
    //   }
    // }
    }
    if(user){
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
    { user.picture ? <img src={user.picture} alt="profile"  style={{borderRadius : "50%", width : "5%"}} /> : <Picture />}
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home