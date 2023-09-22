const express = require("express")
const {registerController,LoginController,testController,proterUserConroller,proterAdminConroller,forgotPasswordController}= require("../controller/authController")
const {requireSignIn,isAdmin} = require("../middleware/authMiddleware")

const router = express.Router()

//routing
//REGISTER
router.post('/register', registerController)

//LOGIN
router.post('/login',LoginController)
//Forgot Password
router.post('/forgot-password', forgotPasswordController)

//test get route
router.get('/test',isAdmin,requireSignIn,testController)

//protected user route
router.get('/user-auth',requireSignIn,proterUserConroller)

// route admin auth
router.get('/admin-auth',requireSignIn, isAdmin,proterAdminConroller)


module.exports= router