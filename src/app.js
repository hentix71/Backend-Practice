import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


app.use(cookieParser())  //user ko browser bata cookie access gareko 

app.use(cors(
    {
        origin : process.env.CORS_ORIGIN,
        credentials : true
    }
))

app.use(express.json(
    {limit : "16kb"}
)) //ayoune json data ko limit (form bata ayouda)

app.use(express.urlencoded(
    {
        extended : true, limit : "16kb" //extended le object vitra ni object banau xa
    }
)) //URL bata data ayouda

app.use(express.static(
    "public"
))


// routes
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter)




export default app