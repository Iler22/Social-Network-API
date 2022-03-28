const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
} = require('../../controllers/userController');

// get and create user routes
router.route('/').get(getUsers).post(createUser);

/*routes to get single user by id, update single user by id*/
router.route('/:userId').get(getSingleUser).put(updateUser);

module.exports = router;
