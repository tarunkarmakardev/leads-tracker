import { GET, DELETE, DETAIL, PATCH, POST } from "@/controllers/targets";
import { Router } from "express";

const targetsRouter = Router();

targetsRouter.get("/", GET);
targetsRouter.get("/:id", DETAIL);
targetsRouter.post("/", POST);
targetsRouter.patch("/:id", PATCH);
targetsRouter.delete("/:id", DELETE);

export default targetsRouter;
