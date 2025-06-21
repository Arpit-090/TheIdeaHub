// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middlewares/authMiddleware');
// const ideaController = require('../controllers/ideaController');
import express from 'express';
import authMiddleware from '../middleWares/authMiddlewares.js'
import ideaController from '../controller/ideacontroller.js'
const Idearouter = express.Router();
Idearouter.get('/', ideaController.getIdeas);
Idearouter.post('/', authMiddleware, ideaController.createIdea);
Idearouter.put('/:id/upvote', authMiddleware, ideaController.upvoteIdea);

export default Idearouter;