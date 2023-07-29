import { Router } from "express";
import POST from "@/controllers/call-stat/post";
import GET from "@/controllers/call-stat/get";
import PATCH from "@/controllers/call-stat/patch";
import DELETE from "@/controllers/call-stat/delete";
import DETAIL from "@/controllers/call-stat/detail";

const callStatRouter = Router();

callStatRouter.get("/", GET);
callStatRouter.post("/", POST);
callStatRouter.patch("/:_id", PATCH);
callStatRouter.delete("/:_id", DELETE);
callStatRouter.get("/:_id", DETAIL);

export default callStatRouter;
