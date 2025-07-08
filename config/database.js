import mongoose from "mongoose";

const connectDB = async () => {
   await mongoose.connect(process.env.MONGO_URI)
     .then(() => {
        console.log("✅ MongoDB Connected");
     })
     .catch((error) => {
        console.log("❌ MongoDB Connection Failed:", error.message);
     });
};

export default connectDB;
