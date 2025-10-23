// config/db.ts
import mongoose, { Mongoose } from "mongoose";

// ====== Extend global to include mongoose connection
declare global {
  var mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

// ====== MongoDB URL
const MONGODB_URL = process.env.MONGODB_URL as string;

// ====== Mongoose connection interface
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// ====== Use cached connection or initialize
const cached: MongooseConnection = global.mongoose ?? {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

// ====== Connect function
export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MongoDB URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "LMS",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  // ===== Optional: connection event listeners =====
  mongoose.connection.on("connected", () =>
    console.log("🟢 Mongoose connected")
  );
  mongoose.connection.on("disconnected", () =>
    console.log("🔴 Mongoose disconnected")
  );
  mongoose.connection.on("error", (err) =>
    console.error("⚠️ Mongoose connection error:", err)
  );

  return cached.conn;
};
