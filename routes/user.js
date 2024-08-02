const express = require('express');
const userController = require('../controllers/userController');

const { verify, isLoggedIn, verifyAdmin } = require("../auth.js");

const router = express.Router();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;