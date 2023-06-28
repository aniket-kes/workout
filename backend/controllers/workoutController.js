const Workout = require('../models/workoutModels'); 
const mongoose = require('mongoose')

//GET all workout
const getWorkouts = async (req,res) => {
    const user_id = req.user._id

    const workouts = await Workout.find({user_id}).sort({createdAt:-1});

    res.status(200).json(workouts)
}

//GET a single workout
const getSingleWorkout = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error:'No such Workout'})
    }

    res.status(200).json(workout)
} 


//create a new workout
const createWorkout = async (req,res) => {
    const {title, reps, load } = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill all fields', emptyFields})
    }

    try {
        const user_id = req.user._id
        const workout = await Workout.create({title, reps, load, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if (!workout) {
        return res.status(404).json({error:'No such Workout'})
    }

    res.status(200).json(workout)
}

//update workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error:'No such Workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}