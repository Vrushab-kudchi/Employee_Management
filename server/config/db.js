import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Employee_Management",
    });
    console.log(`connected Database Name ${response.connection.name}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
