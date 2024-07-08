// The port for the backend
export const PORT = 5555;

// Import the variable from .env file so that the information is ignored by git
import dotenv from "dotenv";
dotenv.config({
    path: '../.env'
})
export const mongoURL = process.env.MONGODB_URL;
console.log("This is the URL: " + mongoURL);