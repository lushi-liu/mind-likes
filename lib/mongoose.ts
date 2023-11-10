import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MOGODB_URL) return console.log("Missing MONGODB_URL");

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MOGODB_URL, { dbName: "devflow" });
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("failed connection", error);
  }
};
