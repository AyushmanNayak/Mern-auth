const express = require('express');
const router = express.Router()

//controller ufnctions 

const {signupUser, loginUser} = require ('../controllers/userController')

//loginroutes
//bofa em are post requests bcuzz we are sending user data as login id and password 
router.post('/login', loginUser)

//signuproute
router.post('/signup', signupUser)

module.exports = router;