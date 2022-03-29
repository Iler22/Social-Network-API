const { Thought, User } = require('../models');

const getThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
    console.log('Got all thoughts');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to get all thoughts! ${err.message}`);
  }
};

const getSingleThought = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    res.json(thought);
    console.log('Got a single thought');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to get a single thought! ${err.message}`);
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.json(user);
    console.log('Created a thought');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to create a thought! ${err.message}`);
  }
};

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.json(thought);
    console.log('Updated thought');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to update thought! ${err.message}`);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndRemove({
      _id: req.params.thoughtId,
    });
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    res.json(thought);
    console.log('Thought has been deleted');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to delete thought! ${err.message}`);
  }
};

const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    res.json(thought);
    console.log('Added a reaction to a thought');
  } catch (err) {
    res.status(500).json(err);
    console.log(`Failed to add a reaction to a thought! ${err.message}`);
  }
};

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
};
