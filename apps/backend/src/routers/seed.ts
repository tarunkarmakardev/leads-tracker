import { POST } from "@/controllers/seed";
import { Router } from "express";

export const seedRouter = Router();

seedRouter.post("/", POST);

export default seedRouter;
