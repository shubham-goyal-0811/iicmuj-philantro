import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();



// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_APIKEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_APISECRET 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath)  return null;
        //upload file on cloudinary
        console.log("in cloud ",localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type :"auto"})
        //file has been uploaded successfully
        // console.log("File Uploaded on cloudinary ",response?.url);
        fs.unlinkSync(localFilePath);
        return response;
    }
    catch(error){
        console.log(error);
        fs.unlinkSync(localFilePath);//remove the locally saved temporary file as the upload operation failed
        return null;
        
    }

}

export {uploadOnCloudinary};