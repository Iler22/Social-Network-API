const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controllers/userController');

// get and create user routes
router.route('/').get(getUsers).post(createUser);

//route to get single user by id
router.route('/:userId').get(getSingleUser);

module.exports = router;
