const express = require('express');
const { check } = require('express-validator');

const actorsController = require('../controllers/actor-controller'); 
const router = express.Router();


router.post('/login',actorsController.login);


router.post('/signup',
    [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
    ]

,actorsController.signup);

router.get('/',actorsController.getActors);

module.exports = router;