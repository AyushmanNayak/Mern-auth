require('dotenv').config()
const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
 const DIRNAME = path.resolve();


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// ====================  Deployment ========================= //
if (process.env.NODE_ENV === "production") {
  // Establishes the path to our frontend (most important)
  app.use(express.static(path.join(DIRNAME, "./frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(DIRNAME, "./frontend/build/index.html"))
  );
}
// ====================  Deployment ========================= //


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 