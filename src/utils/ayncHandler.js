const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
    
}

export {asyncHandler}


// Method 2

// const asyncHandler = (fn) => { //here this can also be (fn) => async() => {}
//     async (err, req, res, next) => {
//         try
//         {
//             await fn(err, req, res, next)
//         }
//         catch (error)
//         {
//             res.status(err.code || 500).json({
//                 success : false,
//                 message : error.message
//             })
//         }
//     } 
// }