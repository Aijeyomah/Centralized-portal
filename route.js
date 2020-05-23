const express = require("express");
const router = express.Router();
const userController = require("./Controllers/usercontroller");
const { signUpUser,signInUser} = userController
const { verifyToken, verifyUserToken } = require("./verifyAuth");
const {createApplication} = require('./Controllers/RegisterApplicant')

router.post('/auth/signup', signUpUser);
router.post('/auth/signin', signInUser);
 router.post('/auth/Applicationform',verifyUserToken,createApplication);

module.exports = router