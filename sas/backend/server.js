import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.config.js";


// Second File Step


//configure dotenv

dotenv.config();
const PORT = process.env.PORT


// listen server
connectDB()
    .then(() => {
        app.listen(PORT, (err) => {
            if (err) {
                throw new Error(`Server not started due to ${err}`)
            }
            console.log(`Server started on port ${PORT}`)
        })
    })
    .catch((err) => {
        throw new Error(`Server not started due to ${err}`)
    })
