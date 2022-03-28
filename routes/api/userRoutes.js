const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// get and create user routes
router.route('/').get(getUsers).post(createUser);

/* routes to get single user by id, update single user by id and delete single user by id*/
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// route to add friend by id
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
