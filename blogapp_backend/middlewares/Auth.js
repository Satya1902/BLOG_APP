const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.Auth = (req, res, next) => {
  try {
    const token = req.body.token || res.data.user.token || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found in request body, response and cookie",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Printing decode data from JWT ");
      console.log(decode);

      console.log("printing role : ");
      console.log(decode.role);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: " Token not varified !!!!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while authentication ",
    });
  }
};

exports.isUser = (req, res, next) => {
  try {
    const token = req.body.token || res.data.user.token || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found in request body, response and cookie",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Printing decode data from JWT ");
      console.log(decode);

      console.log("printing role : ");
      console.log(decode.role);

      if (decode.role.toUpperCase() !== "USER") {
        return res.status(401).json({
          success: false,
          message: " You do not hav permission for this !!!!",
        });
      }

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: " Token not varified !!!!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Authorizing ",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    const token = req.body.token || res.data.user.token || req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found in request body, response and cookie",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Printing decode data from JWT ");
      console.log(decode);

      console.log("printing role : ");
      console.log(decode.role);

      if (decode.role !== "ADMIN") {
        return res.status(401).json({
          success: false,
          message: " You do not hav permission for this !!!!",
        });
      }

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: " Token not varified !!!!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Authorizing ",
    });
  }
};
