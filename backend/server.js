require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/User')
const corsOptions = require("./config/corsOptions")

// express app
const app = express()

// middleware
app.use(express.json())
// Allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow cookies to be sent
}));
app.use(cookieParser())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })