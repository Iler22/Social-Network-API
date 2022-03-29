const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
} = require('../../controllers/thoughtController');

// route to get all thoughts and create a thought
router.route('/').get(getThoughts).post(createThought);

// routes to get a single thought, update a thought and delete a thought
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// route to add a reaction to a thought
router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;
