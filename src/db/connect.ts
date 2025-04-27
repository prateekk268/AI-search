import mongoose, { Mongoose } from "mongoose";

interface MongooseGlobalCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global type to add 'mongoose' property
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseGlobalCache | undefined;
}

const cached: MongooseGlobalCache = global.mongoose || { conn: null, promise: null };

export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) {
    console.log("Using existing MongoDB connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MongoDB connection string is missing in environment variables.");
    }

    cached.promise = mongoose.connect(uri, {
    }).then((mongooseInstance) => {
      console.log("New MongoDB connection established.");
      return mongooseInstance;
    }).catch((err) => {
      cached.promise = null;
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
};
