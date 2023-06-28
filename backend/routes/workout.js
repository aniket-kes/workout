const express = require('express')
const Workout = require('../models/workoutModels');
const {createWorkout, getWorkouts, getSingleWorkout, updateWorkout, deleteWorkout} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//requie auth for all workout routes
router.use(requireAuth);

//GET all workout
router.get('/',getWorkouts)

//GET a single workout
router.get('/:id',getSingleWorkout)

//POST a workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)

//UPDATE a workout
router.patch('/:id',updateWorkout)



module.exports = router