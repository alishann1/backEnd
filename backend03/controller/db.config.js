import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        return connectionInstance;

    } catch (error) {
        console.log("FAILED TO CONNECT MONGODB", error)
    }
}


export default connectDb