import { getEnv, isDev } from "./lib/env";
import chalk from "chalk";
import express, { Application } from "express";
import cors from "cors";
import authRouter from "./routers/auth";
import authMiddleware from "./middleware/auth";
import projectsRouter from "./routers/projects";
import seedRouter from "./routers/seed";
import reportsRouter from "./routers/reports";
import projectMiddleware from "./middleware/project";
import targetsRouter from "./routers/targets";

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
app.use("/reports", authMiddleware, projectMiddleware, reportsRouter);
app.use("/targets", authMiddleware, projectMiddleware, targetsRouter);
app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(chalk.yellow(`SERVER IS UP ON PORT: ${PORT}`));
  if (isDev()) {
    // Populating code goes here
  }
});
