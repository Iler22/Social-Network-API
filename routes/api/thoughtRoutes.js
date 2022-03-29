const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
} = require('../../controllers/thoughtController');

// route to get all thoughts and create a thought
router.route('/').get(getThoughts).post(createThought);

// routes to get a single thought, update a thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought);

module.exports = router;
