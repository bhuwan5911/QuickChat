import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // 1. Check karein ki variable load hua hai ya nahi
    if (!process.env.MONGO_URI) {
      console.error("FATAL ERROR: MONGO_URI is not defined in .env file");
      process.exit(1); // Server band kar dega
    }

    // 2. Connect karne ki koshish karein
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  
  } catch (error) {
    // 3. Agar connection fail ho (jaise ghalat password)
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Server band kar dega
  }
};
