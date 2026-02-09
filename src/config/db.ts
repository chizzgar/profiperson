import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const dbUri = process.env.DATABASE_URL ?? process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error("Missing DATABASE_URL (or MONGODB_URI) environment variable.");
    }
    const conn = await mongoose.connect(dbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
