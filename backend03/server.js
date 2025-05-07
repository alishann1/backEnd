import app from "./app.js"
import dotenv from "dotenv"
import connectDb from "./controller/db.config.js";

dotenv.config();


// get por tbariable from env file

const port = process.env.PORT

connectDb()
    .then(() => {
        app.listen(port, (err) => {
            if (err) {
                console.log(err)
                return;
            }
            console.log("server is running on port", port)
        })
        console.log("CONNECTED TO MONGODB")

    })
    .catch((err) => {
        console.log(err)
    })

// server 
