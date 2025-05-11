import express from "express"
import cors from "cors"
import routerUserDb from "./router/user.router.js"

const app = express()

// global and building middlewares middleware configureation
//json

app.use(express.json())


//url encode

app.use(express.urlencoded({ extended: true }))

// cors

const whiteList = ["http://localhost:5173",]

const corsOption = {
    origin: function (origin, cb) {
        if (whiteList.includes(origin) || !origin) {
            cb(null, true)
        } else {
            cb(new Error("Not allowed by cors", false))
        }

    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credencials: true,
}

// implement cors middleware

app.use(cors(corsOption))

//route configure

app.use("/api/v1/user", routerUserDb)

///


export default app