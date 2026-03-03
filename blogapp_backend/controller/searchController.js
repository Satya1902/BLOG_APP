const PostModel = require("../models/PostModel");

async function getAllSearchedData(req, res) {
  try {
    const data = req.query.data;
    console.log("Data to be search is : ", data);

    // Find users with "John" in the name field
    const query = { heading: { $regex: data, $options: "i" } };
    const allblogs = await PostModel.find(query).populate("user");

    // console.log(
    //   `Printing all blogs which contains ${data} in their heading`,
    //   allblogs
    // );

    if (allblogs.length) {
      return res.status(200).json({
        success: true,
        message: "success",
        allBlogs: allblogs,
      });
    } else {
      return res.status(404).json({
        success: true,
        message: "No post fount",
        allBlogs: allblogs,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { getAllSearchedData };
