const { Thought, User } = require('../models');

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
    console.log('Got all thoughts');
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(`Failed to get all thoughts! ${err.message}`);
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    res.json(user);
    console.log('Created a new user');
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(`Failed to create a new user! ${err.message}`);
  }
};

module.exports = { getThoughts, createThought };
