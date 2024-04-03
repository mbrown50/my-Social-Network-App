const { ObjectId } = require('bson');
const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate({ username: req.body.username }, {"$push": {friends: thought._id}});
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      const user = await User.findOneAndUpdate({ username: req.body.username }, { "$pull": {friends: req.params.thoughtId}});
      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
 // Create a reaction
 async createReaction(req, res) {
  try {
    const thought = await Reaction.create(req.body);
    res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},
  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Reaction.findOneAndDelete({ _id: req.params.ReactionId });

      if (!thought) {
        res.status(404).json({ message: 'No reaction with that ID' });
      }
      res.json({ message: 'Reaction deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
