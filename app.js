// app.js
import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { connectDB } from "./data/database.js";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

const app = express();
connectDB();

dotenv.config({
    path: "./data/config.env"
})

// Using Middleware
app.use(express.json());
// Using cookie parser Middleware
app.use(cookieParser());


// Using cors Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// Using Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/task', taskRouter);

// Using Error Middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server Started on PORT:${PORT} in ${process.env.NODE_ENV} Mode`);
});