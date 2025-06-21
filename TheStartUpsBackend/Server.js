// require('dotenv').config();
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import Idearouter from './routes/ideaRoutes.js';
import Authrouter from './routes/authRoutes.js';
// const express = require('express');
//  const connectDB = require('./config/db');
// const cors = require('cors');
dotenv.config();
// Connect to database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth',Authrouter);
app.use('/api/ideas',Idearouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));