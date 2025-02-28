import { GET, DELETE, DETAIL, PATCH, POST } from "@/controllers/projects";
import { Router } from "express";

const projectsRouter = Router();

projectsRouter.get("/", GET);
projectsRouter.get("/:id", DETAIL);
projectsRouter.post("/", POST);
projectsRouter.patch("/:id", PATCH);
projectsRouter.delete("/:id", DELETE);

export default projectsRouter;
