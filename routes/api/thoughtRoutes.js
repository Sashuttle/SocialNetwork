//import express router & required functions through thought controller
const router = require('express').Router();
const { getAllThought, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

//route to get all thoughts
router.route('/').get(getAllThought).post(createThought);

//route to get specific thought by an ID
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

//route to add a reaction to a specific thought
router.route('/:thoughtId/reactions').post(addReaction);

//route to delete a reaction from a specific thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//export router to be used in other parts of my application
module.exports = router;