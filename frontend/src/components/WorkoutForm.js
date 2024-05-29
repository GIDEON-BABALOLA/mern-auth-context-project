import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { workout as workoutApi } from "../api/workouts"
const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
 const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError("You must be logged in")
      return
    }

    const workout = {title, load, reps}
try{
const response = await workoutApi.post("/workouts", workout);
if(response && response.data){
  setTitle('')
  setLoad('')
  setReps('')
  setError(null)
  setEmptyFields([])
  console.log('new workout added', response.data)
  dispatch({type: 'CREATE_WORKOUT', payload: response.data})
}
}catch(err){
setEmptyFields(err.response.data.emptyFields)
setError(err.response.data.error)
}
    // const response = await fetch('http://localhost:5000/api/workouts', {
    //   method: 'POST',
    //   body: JSON.stringify(workout),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     "Authorization" : `Bearer ${user.token}`
    //   }
    // })

    
//     const json = await response.json()
// console.log(json)
//     if (!response.ok) {
//       setError(json.error)
//       setEmptyFields(json.emptyFields)
//     }
    // if (response.ok) {
    //   setTitle('')
    //   setLoad('')
    //   setReps('')
    //   setError(null)
    //   setEmptyFields([])
    //   console.log('new workout added', json)
    //   dispatch({type: 'CREATE_WORKOUT', payload: json})
    // }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm