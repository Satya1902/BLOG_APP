

const mongoose = require("mongoose");

// Define the Courses schema
const mailSchema = new mongoose.Schema({

	email : {
		type: String,
		required: true,
	},
	subject : {
		type: String,
		required: true,
	},
    body : {
		type: String,
		required: true,
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("MailSender", mailSchema);