import mongoose from "mongoose";


//Third file steps


async function connectDB() {

    const MONGODB_URL = process.env.MONGODB_URL;
    const DB_NAME = process.env.DB_NAME;
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
        console.log(`Database connected at host ${connectionInstance.connection.host} on port ${connectionInstance.connection.port}`);
    } catch (error) {
        throw new Error(`Database connection failed due to ${error}`);
    }
}

export default connectDB