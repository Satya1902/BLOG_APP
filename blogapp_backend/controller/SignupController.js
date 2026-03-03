const OtpModel = require("../models/OtpModel");


async function otpController (req,res){
    
    try {

        const {email,otp} = req.body;
        const data = await OtpModel.create({email,otp});
        console.log("Printing data that is stored in DB "); 
        console.log(data);

        return res.status(200).json({
            success : true,
            message : " Otp has been stored on database ",
            data : data
        });       
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong while Storing otp to database "
        });
    }

}

module.exports = otpController;