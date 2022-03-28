const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log('Got all users');
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(`Failed to get all users! ${err.message}`);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
    console.log('Created a new user');
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(`Failed to create a new user! ${err.message}`);
  }
};

module.exports = {
  getUsers,
  createUser,
};
