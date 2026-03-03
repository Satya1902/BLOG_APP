

const mongoose = require("mongoose");

// Define the Courses schema
const otpSchema = new mongoose.Schema({

	email : {
		type: String,
		required: true,
	},
	otp : {
        type : Number,
        required : true,
    },
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("OTP", otpSchema);