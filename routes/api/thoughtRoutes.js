const router = require('express').Router();
const {
  getThoughts,
  createThought,
} = require('../../controllers/thoughtController');

// route to get all thoughts and create a thought
router.route('/').get(getThoughts).post(createThought);

module.exports = router;
