import { getEnv, isDev } from "./lib/env";
import chalk from "chalk";
import express, { Application } from "express";
import cors from "cors";
import authRouter from "./routers/auth";
import authMiddleware from "./middleware/auth";
import projectsRouter from "./routers/projects";
import seedRouter from "./routers/seed";
import reportsRouter from "./routers/reports";

const env = getEnv();
const app: Application = express();
const PORT: number = env.PORT || 5000;
app.use(
  cors({
    origin: [env.FRONTEND_DOMAIN, "http://localhost"],
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ message: "Server is OK" });
});
app.use("/auth", authRouter);
app.use("/seed", authMiddleware, seedRouter);
app.use("/projects", authMiddleware, projectsRouter);
app.use("/reports", authMiddleware, reportsRouter);
app.listen(PORT, async () => {
  console.log(chalk.yellow(`SERVER IS UP ON PORT: ${PORT}`));
  if (isDev()) {
    // Populating code goes here
  }
});
