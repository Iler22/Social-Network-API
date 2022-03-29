const { User, Thought } = require('../models');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log('Got all users');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to get all users! ${err.message}`);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends');
    res.json(user);
    console.log('Got a single user');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to get a single user! ${err.message}`);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
    console.log('Created a new user');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to create a new user! ${err.message}`);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.json(user);
    console.log('Updated user');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to update user! ${err.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json(user);
    console.log('Deleted user and thoughts');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to delete user and thoughts! ${err.message}`);
  }
};

const addFriend = async (req, res) => {
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(friend);
    console.log('Added friend');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed add friend! ${err.message}`);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const friend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(friend);
    console.log('Removed friend');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to remove friend! ${err.message}`);
  }
};

module.exports = {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
