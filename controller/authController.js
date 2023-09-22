const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");

//post -->Register
const registerController = async (req, res) => {
  try {
    let { name, email, password, phone, address ,answer } = req.body;
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer is Required" });
    }
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register Please Login",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    }).save();

    // console.log("user",user)

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};

//post -->Login
const LoginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.send({ error: "please provide correct email and password " });
    }

    //existing user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // Invalid password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token

    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRECT_KEY,
      { expiresIn: "7d" }
    );
    let loginStatus = true;

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.name,
        role: user.role,
      },
      token,
      loginStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};
// test get request
const testController = async (req, res) => {
  try {
    const user = await userModel.find();
    res.send("Protected route");
    console.log("usercheck", user);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login ",
      error,
    });
  }
};

//protected user route GET
const proterUserConroller = async (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user Protected route ",
      error,
    });
  }
};
//protected admin route GET
const proterAdminConroller = async (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in admin Protected route ",
      error,
    });
  }
};

//forget password POST
const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    console.log("e",email)
    console.log("a",answer)
    console.log("p",newPassword)

    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer is Required" });
    }
    if (!newPassword) {
      return res.send({ message: "newPassword is Required" });
    }
    //check
    const user = await userModel.findOne({ email, answer});
    
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);

     await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: " password reset successfully",
    }
    
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};

module.exports = {
  registerController,
  LoginController,
  testController,
  proterUserConroller,
  proterAdminConroller,
  forgotPasswordController,
};
