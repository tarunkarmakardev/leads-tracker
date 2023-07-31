import { getEnv, isDev } from "./lib/env";
import chalk from "chalk";
import express, { Application } from "express";
import cors from "cors";
import { connectDB } from "./lib/db";
import authRouter from "./routers/auth";
import callStatRouter from "./routers/call-stat";
import authMiddleware from "./middleware/auth";
import chartRouter from "./routers/chart";

const env = getEnv();
connectDB();
const app: Application = express();
const PORT: number = env.PORT;
app.use(
  cors({
    origin: [env.FRONTEND_DOMAIN, "http://localhost", "https://localhost"],
  })
);
app.use(express.json());
app.get("/", (req, res) => res.send({ message: "Server is OK" }));
app.use("/api/auth", authRouter);
app.use("/api/stats/calls", authMiddleware, callStatRouter);
app.use("/api/charts", authMiddleware, chartRouter);
app.listen(PORT, async () => {
  console.log(chalk.yellow(`SERVER IS UP ON PORT: ${PORT}`));
  if (isDev()) {
    // Populating code goes here
  }
});
