

// const { model } = require("mongoose");
// const fileuploadModel = require('../Model/FileuploadModel');
const cloudinary = require("../config/Cloudinary");

function isFileTypeSupported (fileType,supportedFile){
    return supportedFile.includes(fileType);
}

async function uploadToCloudinary(file,folder){
    const options = {folder};
    options.resouce_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

const imageupload = async (req,res)=>{
    try {

        

        const imageFile = req.files.file;
        console.log("ImageFile -> ",imageFile);

        const supportedFile = ["jpg","jpeg","png"];

        const fileType = imageFile.name.split(`.`)[1];

        if(!isFileTypeSupported(fileType,supportedFile)){
            return res.status(400).json({
                success : false,
                message : "This file type is not supported pls make the file of JPG or JPEG or PNG "
            });
        }

        const response = await uploadToCloudinary(imageFile,"satya");
        console.log("response -> ",response);
        const imageUrl = response.url;
        console.log(imageUrl);

        // const fileData = await fileuploadModel.create({
        //     name,
        //     tag,
        //     email,
        //     imageurl : response.secure_url
        // });

        res.status(200).json({
            success : true,
            message : "Image is uploaded to cloudinary and also its url has been saved to our database",
            // imageurl : imageUrl
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Something went wrong "
        });
    }
}

module.exports = imageupload ;