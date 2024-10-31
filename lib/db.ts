import * as mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connect = async () => {
  try {
    // Prevents unnecessary reconnections if already connected
    if (mongoose.connection?.readyState === 1) {
      console.log("Already Connected to MongoDB");
      return;
    }

    if (mongoose.connection?.readyState === 2) {
      console.log("Connection to MongoDB in Progress...");
      return;
    }

    // Attempt to connect to MongoDB with options
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "weebwear",
      bufferCommands: false,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Propagate error to calling function
  }
};

export default connect;
