import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { workout as workoutApi } from '../api/workouts'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
 const { user } = useAuthContext()
  const handleClick = async () => {
    if(!user){
      console.log("No user is logged in so this user cannot delete workouts")
      return
    }
    try{
const response = await workoutApi.delete(`/workouts/${workout._id}`)
if(response && response.data){
  dispatch({type: 'DELETE_WORKOUT', payload: response.data})
}
    }catch(err){
console.log(err)
    }
    // const response = await fetch('http://localhost:5000/api/workouts/' + workout._id, {
    //   method: 'DELETE',
    //   headers : {
    //     "Authorization" : `Bearer ${user.token}`
    //   }
    // })
    // const json = await response.json()

    // if (response.ok) {
    //   dispatch({type: 'DELETE_WORKOUT', payload: json})
    // }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails