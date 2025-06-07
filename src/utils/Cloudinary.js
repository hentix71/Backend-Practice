import {v2 as cloudinary} from "cloudinary" 
import fs from "fs"  //fs is file system which has multiple file system management methods

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_NAME, 
    api_secret: process.env.CLOUDINARY_CLOUD_NAME 
});

// Cloudinary mehtod
const uploadOnCloudinary = async (localFilePath) => {
    try
    {
        // Incase no local file path
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath,
            {resource_types : "auto"}
        )
    // if uploaded
    console.log("File uploaded on cloudinary", response.url);
    return response    
    } 
    catch(error)
    {   
        // Removing the local file path from the local storage
        fs.unlinkSync(localFilePath)
    }
}

export {uploadOnCloudinary}