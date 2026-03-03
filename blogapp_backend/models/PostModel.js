

const mongoose = require("mongoose");

// Define the Courses schema
const postSchema = new mongoose.Schema({

	heading : {
		type: String,
		required: true,
	},
	body : {
		type: String,
		required: true,
	},
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Like"
        }
    ],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ],
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
module.exports = mongoose.model("Post", postSchema);