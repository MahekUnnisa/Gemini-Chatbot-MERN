import { connect, disconnect } from "mongoose";
import { config } from "dotenv";

config();

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to database");
    }
}

async function disconnectDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect database");
    }
}

export { connectToDatabase, disconnectDatabase }