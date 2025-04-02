import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from"../models/user.models.js" 
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler( async(req,res)=>
{
    //get user details from frontend
    //validation - not empty
    //check if user already exists : username and email
    // cehck for images
    //check for avatar
    // upload them to cloudinary get url from cloudinary avatar check
    //create user object- create entry in db
    // remove password and refreshtoken field from response
    // check for user creation
    //return response

    const {fullName, email, username,password}= req.body
    // console.log(req.body());
    
    console.log("email:",email); 

    // if(fullName==="")
    // {
    //     throw new ApiError(400, "FullName is required")
    // }
    if(
        [fullName, email,password, username].some((field)=>
            field?.trim()===""
        )
    )
        {
            throw new ApiError(400, "All fields are compulsory")
        }

    const existedUser= await User.findOne({
        $or: [{username}, { email }]
    })
    if(existedUser)
    {
        throw new ApiError(409, "User with email or username already esists")
    }
    const avataraLocalFilePath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(req.files);
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage >0)
    {
        coverImageLocalPath= req.files.coverImage[0].path
    }
    if(!avataraLocalFilePath)
    {
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avataraLocalFilePath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // console.log(coverImage);
    
    // console.log(avataraLocalFilePath);
    // console.log(coverImageLocalPath);
    
    

    if(!avatar)
    {
        throw new ApiError(400,"Avatar file is required")
    }
    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

   const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser)
   {
    throw new ApiError(500,"Something went wrong while registering the user")
   }
   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
   )
    

})


export{registerUser}