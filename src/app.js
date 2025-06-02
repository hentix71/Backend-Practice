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
)) //form bata json data ayouda

app.use(express.urlencoded(
    {
        extended : true, limit : "16kb"
    }
)) //Url  bata data ayouda

app.use(express.static(
    "public"
))



export default app