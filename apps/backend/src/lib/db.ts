import chalk from "chalk";
import mongoose from "mongoose";
import { getEnv } from "./env";

const { DATABASE_URI } = getEnv();

export async function connectDB() {
  mongoose.set("strictQuery", true);

  try {
    if (DATABASE_URI) {
      const db = await mongoose.connect(DATABASE_URI, {
        dbName: "sales-logger",
      });
      console.log(chalk.blue(`DB Connected: ${db.connection.host}`));
      return db;
    }
  } catch (error) {
    console.log(error);
  }
}
