

const mongoose = require("mongoose");

// Define the Courses schema
const likeSchema = new mongoose.Schema({

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("Like", likeSchema);