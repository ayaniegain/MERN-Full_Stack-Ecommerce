const express = require("express")
const {registerController,LoginController,testController,proterConroller}= require("../controller/authController")
const {requireSignIn,isAdmin} = require("../middleware/authMiddleware")

const router = express.Router()

//routing
//REGISTER
router.post('/register', registerController)

//LOGIN
router.post('/login',LoginController)
//test get route
router.get('/test', testController)
//protected route
router.get('/protected',requireSignIn,proterConroller)


module.exports= router