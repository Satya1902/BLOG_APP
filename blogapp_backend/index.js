const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const connectToMongoDB = require("./config/Database");
// const connectToCloudinary = require("./config/Cloudinary")
const router = require("./routes/route");

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

app.listen(port,(req,res)=>{
   console.log("server started on port "+port);
});

// middleware to parse data from body
app.use(cookieParser());
app.use(express.json());
app.use(cors({
	credentials:true,
   origin:"http://localhost:3000"
}));

// app.use(fileUpload({
//    useTempFiles : true,
//    tempFileDir : "/temp/"
// }));

// Mounting of path to router 
app.use("/api/v1",router);

connectToMongoDB();
// connectToCloudinary();

app.get("/",(req,res)=>{
   return res.status(200).json({
    success : true,
    message : ` we are on home page and our server is running on port no ${port} `
   });
});

