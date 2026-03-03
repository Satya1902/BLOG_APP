

const mongoose = require("mongoose");

// Define the Courses schema
const userSchema = new mongoose.Schema({

	email : {
		type: String,
		required: true,
	},
	password : {
		type: String,
		required: true,
	},
	firstname : {
		type: String,
		required: true,
	},
    lastname : {
		type: String,
		required: true,
	},
    about : {
		type: String,
		required: true,
	},
    role : {
		type: String,
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("User", userSchema);