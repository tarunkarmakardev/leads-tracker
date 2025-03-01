import { GET, DELETE, DETAIL, PATCH, POST } from "@/controllers/reports";
import { Router } from "express";

const reportsRouter = Router();

reportsRouter.get("/", GET);
reportsRouter.get("/:id", DETAIL);
reportsRouter.post("/", POST);
reportsRouter.patch("/:id", PATCH);
reportsRouter.delete("/:id", DELETE);

export default reportsRouter;
