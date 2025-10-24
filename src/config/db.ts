import mongoose from "mongoose";

declare global {
  var __mongooseConn: Promise<typeof mongoose> | undefined;
}

const connectWithOptions = async () => {
  const uri = process.env.MONGODB_URL as string;

  const isProduction = process.env.NODE_ENV === "production";
  mongoose.set("bufferTimeoutMS", isProduction ? 30000 : 60000);

  return mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 20000,
    socketTimeoutMS: 60000,
    dbName: "LMS",
    maxPoolSize: isProduction ? 20 : 10,
    minPoolSize: isProduction ? 5 : 2,
    bufferCommands: false,
    retryWrites: true,
  });
};

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("❌ Mongodb url is not defined");
    }

    if (!global.__mongooseConn) {
      global.__mongooseConn = connectWithOptions();
    }

    await global.__mongooseConn;
    console.log("🟢 Mongoose connected");

    mongoose.connection.on("error", (err) => {
      console.error("⚠️ Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", (err) => {
      console.log("🔴 Mongoose disconnected");
    });
  } catch (error: any) {
    console.error("❌ mongodb connection failed", error);
    throw error;
  }
};

export default connectDB;
