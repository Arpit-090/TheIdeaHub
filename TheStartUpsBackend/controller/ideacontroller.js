// const Idea = require('../models/Idea');
import Idea from "../models/Idea.js"

// @desc    Get all ideas
const ideaController = {
 getIdeas : async (req, res) => {
  try {
    const ideas = await Idea.find().populate('user', 'username');
    res.json(ideas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
},

// @desc    Create an idea
 createIdea : async (req, res) => {
  try {
    const { title, description, tags, category } = req.body;
    
    const newIdea = new Idea({
      title,
      description,
      tags,
      category,
      user: req.user.id
    });

    const idea = await newIdea.save();
    res.json(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
},

// @desc    Upvote an idea
 upvoteIdea : async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    
    if (!idea) {
      return res.status(404).json({ msg: 'Idea not found' });
    }

    idea.upvotes += 1;
    await idea.save();
    
    res.json(idea);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
}
};

export default ideaController;