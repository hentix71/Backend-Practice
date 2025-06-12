import {asyncHandler} from "../utils/ayncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res)=>{
    // get user details form frontend
    // validate the user details - not empty
    // check if user is already exist in the database : email and username
    // check  for images, and avatar 
    // upload to cloudinary, check avatar in coudinary 
    // Create a user object with the details - create entry in db
    // remove password and referesh token field from response
    // check for response, whether the user is created or not
    // return the response(sucess or failure)



    const {fullName, email, username, password, as } = req.body
    console.log(fullName, email, username, as);
    
})

    // validation user input
    // type 1:
    // if (fullName === "")
    // {
    //     throw new ApiError(400, "Fullname is required")
    // }


    // type 2
    if(
        [fullName, email, username, password].some((feild) => feild?.trim() === "")
    )
    {
        throw new ApiError(400, "Feild misssing")
    }


    // users exist validation
    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })
    if(existedUser)
    {
        throw new ApiError(409, "User emai or username already exists")
    }

    // image validation
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(400, "Avatar file is required")
    }

    // uploading in cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar)
    {
        throw new ApiError(400, "Avatar error");
    }

    // user creaationa nd enter in database
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase() 
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refereshToken"
    )

    if(!createdUser)
    {
        throw new ApiError(500, "failed registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register sucessfully" )
    )
    
        

export { 
    registerUser 
}