const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, about, password, role } = req.body;

    if (!email || !firstname || !lastname || !password || !role) {
      return res.status(202).json({
        success: false,
        message: "Please fill out the all mandatory fields",
      });
    }

    const existingUser = await User.findOne({ email });

    console.log("Printing user", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "You are already a member, so please Login ",
      });
    }

    const userData = await User.create({
      email,
      firstname,
      lastname,
      about,
      password,
      role,
    });
    console.log("Printing user data that is stored in DB ");
    console.log(userData);
    req.user = userData;

    return res.status(200).json({
      success: true,
      message:
        " Congratulations, Now you are a member of Blogapp Please Login to enjoy blogapp .... ",
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Storing user to database ",
    });
  }
};

module.exports = createUser;
