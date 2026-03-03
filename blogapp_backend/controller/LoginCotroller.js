const User = require("../models/User");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const LoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(202).json({
        success: false,
        message: " Please fill out all mandatory field !!",
      });
    }

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: " Please enter registered email id ",
      });
    }

    const payload = {
      email: existingUser.email,
      id: existingUser._id,
      role: existingUser.role,
    };

    if (password === existingUser.password) {
      let token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      existingUser = existingUser.toObject();
      existingUser.token = token;
      existingUser.password = undefined;
      req.body.token = token;

      res.status(200).json({
        success: true,
        token,
        user: existingUser,
        message: "Successfull ",
      });

      // const options = {
      //   expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      //   // httpOnly : true
      // };
      // return res.cookie("token", token, options).status(200).json({
      //   success: true,
      //   message: " Your have Logged in successfully, Enjoy your Blog app ",
      //   user: existingUser,
      // });
      // next();
    } else {
      return res.status(400).json({
        success: false,
        message:
          " You have entered incorrect password, Please enter correct password  ",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Login to BlogApp ",
    });
  }
};

module.exports = LoginController;
