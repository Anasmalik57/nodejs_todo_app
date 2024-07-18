import mongoose from "mongoose";

// Connecting to MongoDB
export const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "NodeAPIBackend"
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("DB connection Error:", err));
};