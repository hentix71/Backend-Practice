// require('dotenv').config({path: './env'})


import dotenv from "dotenv"
import connectDB from "./db/index.js";


// database sanga connect gardda jaila try catch use garne
// database ko lagi time ni lagxa so async await


dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running in port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection error !!", err);
    
})







// Type 1 : To connect database in index.js

/*
(async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(porocess.env.PORT, () => {
            console.log(`App is listining in port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.error("Error", error)
        throw err
    }
})()
*/