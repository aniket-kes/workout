require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

const app = express();

//MIDDLEWARE
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, res.method)
    next();
})

app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('connected to DB & listening on port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })



