// authRoutes.js
// const express = require('express');
import express from 'express'
const Authrouter = express.Router();
import { check } from 'express-validator';
import authController from '../controller/authcontroller.js'
// const { check } = require('express-validator');
// const authController = require('../controllers/authController');

Authrouter.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  authController.register
);

Authrouter.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

export default Authrouter;