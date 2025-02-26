import dayjs from "dayjs";
import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat } from "@/models/call-stat";
import { getChartFromObject } from "./config";

type NonProductionChartObj = {
  callDate: Date;
  nonProductionHours: number;
  breakHours: number;
};

export type NonProductionChartReqQuery = {
  from?: string;
};

export type NonProductionChartReqParams = object;

export type NonProductionChartResponse = {
  results: NonProductionChartObj[];
};

export const GET = createMethodHandler<
  NonProductionChartReqParams,
  object,
  NonProductionChartReqQuery
>({
  async handleRequest(req, res) {
    const { user, query } = req;
    const fromObj = getChartFromObject(query.from);
    const callStats = await CallStat.find({
      userId: user._id,
      callDate: {
        $lte: dayjs().toISOString(),
        $gte: dayjs().subtract(fromObj.value, fromObj.unit).toISOString(),
      },
    }).sort("callDate");
    const response: NonProductionChartResponse = {
      results: callStats.map((cs) => ({
        callDate: cs.callDate,
        nonProductionHours: cs.timings.reduce((p, c) => {
          return Math.round(p + c.hours + c.minutes / 60);
        }, 0),
        breakHours: cs.timings.reduce((p, c) => {
          if (c.title === "Break") {
            return Math.round(p + c.hours + c.minutes / 60);
          }
          return p;
        }, 0),
      })),
    };

    return res.send(response);
  },
});
