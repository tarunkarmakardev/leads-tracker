import * as calls from "@/controllers/chart/calls";
import * as appointments from "@/controllers/chart/appointments";
import * as nonProduction from "@/controllers/chart/non-production";
import { Router } from "express";

const chartRouter = Router();

chartRouter.get("/calls", calls.GET);
chartRouter.get("/appointments", appointments.GET);
chartRouter.get("/non-production", nonProduction.GET);

export default chartRouter;
