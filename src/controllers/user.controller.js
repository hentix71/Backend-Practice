import {asyncHandler} from "../utils/ayncHandler.js";

const registerUser = asyncHandler(async (req, res)=>{
    res.status(200).json(
        {
            message: "From postman ok"
        }
    )
})

export { 
    registerUser 
}