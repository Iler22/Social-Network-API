const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
} = require('../../controllers/thoughtController');

// route to get all thoughts and create a thought
router.route('/').get(getThoughts).post(createThought);

// route to get a single thought
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;
