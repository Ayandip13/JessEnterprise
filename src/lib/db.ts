import mongoose from "mongoose";

const DEFAULT_MONGODB_URI =
  "mongodb+srv://ayandippaul2002_db_user:NpiQQqF2jpWqyXlw@cluster0.ollutmb.mongodb.net/jess_metrology?retryWrites=true&w=majority";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  if (!uri) {
    return null;
  }

  // 1 = connected, 2 = connecting
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise || mongoose.connection.readyState === 0) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((m) => {
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    console.error("MongoDB connection error:", e);
    return null;
  }

  return cached.conn;
}
