const express = require('express');
const router = express.Router();
const {middlewareEmail, signup, login} = require('./authentication-controller');

router.use('/signup/', middlewareEmail);
router.post('/signup', signup);
router.post('/login', login);


module.exports = router; 


