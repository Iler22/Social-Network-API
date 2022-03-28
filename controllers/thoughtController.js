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

const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    res.json(thought);
    console.log('Got a single thought');
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(`Failed to get a single thought! ${err.message}`);
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
    console.log('Created a thought');
  } catch (err) {
    res.sendStatus(500).send(err);
    console.log(`Failed to create a thought! ${err.message}`);
  }
};

module.exports = { getThoughts, getSingleThought, createThought };
