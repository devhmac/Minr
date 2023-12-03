import mongoose from "mongoose";

let isConnected = false;

export const dbConnect = async () => {
  console.log("initializing mongo connection...");
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("no MONGODB_URI defined");

  if (isConnected) {
    return console.log("still connected to mongodb ");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("connected to mongo");
  } catch (error) {
    console.log(error);
  }
};
