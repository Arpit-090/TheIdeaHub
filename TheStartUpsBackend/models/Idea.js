// const mongoose = require('mongoose');
import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Software', 'Hardware', 'Food', 'Nonprofit', 'Other']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Idea = mongoose.model('Idea',IdeaSchema);
export default Idea;