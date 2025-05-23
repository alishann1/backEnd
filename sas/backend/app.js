import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// First File Steps

// middle wares implement


// json <inbuilt global middleware>

app.use(express.json())

// url encode <inbuilt middleware>

app.use(express.urlencoded({ extended: true }))

// cors middle ware <third party global middleware>

const whiteList = ["http://localhost:5173"];
const corsOptions = {
    origin: function (origin, cb) {
        if (whiteList.includes(origin) || !origin) {
            cb(null, true)
        } else {
            cb(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "PUT", "POST", "DELETE"],

}


app.use(cors(corsOptions));

//cookie parser <third party global middleware>
app.use(cookieParser())


// owner route 
import ownerRouter from "./src/routes/owner/owner.route.js"
app.use("/api/v1/owner", ownerRouter)


// error middleware
import errorMiddleware from "./src/middlewares/error.middleware.js"
app.use(errorMiddleware)


//export app
export default app


