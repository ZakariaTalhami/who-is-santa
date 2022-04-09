import mongoose from "mongoose";

export const initializeMongoDB = async () => {
  console.log(`------------ Initializing Mongodb Connection  ------------`);

  if (!process.env.DB_URL) {
    throw new Error("DB_URL must be defined");
  }

  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME must be defined");
  }

  if (!process.env.DB_USER) {
    throw new Error("DB_USER must be defined");
  }

  if (!process.env.DB_PASSWORD) {
    throw new Error("DB_PASSWORD must be defined");
  }

  const options: mongoose.ConnectOptions = {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  };

  await mongoose.connect(process.env.DB_URL, options);
  console.log(`------------ Mongodb connection complete  ------------`);
};
