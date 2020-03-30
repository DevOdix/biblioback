const express = require('express');
const { check } = require('express-validator');

const actorsController = require('../controllers/actor-controller'); 
const router = express.Router();


router.post('/login',actorsController.login);


router.post('/signup',actorsController.signup);