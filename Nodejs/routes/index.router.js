const express = require('express');
const router = express.Router();
// var bcrypt = require('bcrypt');


 

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');
 
router.post('/register',ctrlUser.register);
router.post('/authenticate',ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken,ctrlUser.userProfile);

module.exports = router;