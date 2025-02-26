import dayjs from "dayjs";
import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat } from "@/models/call-stat";
import { getChartFromObject } from "./config";

type CallChartObject = {
  callDate: Date;
  calls: number;
};

export type CallChartReqQuery = {
  from?: string;
};

export type CallChartReqParams = object;

export type CallChartResponse = {
  results: CallChartObject[];
};

export const GET = createMethodHandler<
  CallChartReqParams,
  object,
  CallChartReqQuery
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
    const response: CallChartResponse = {
      results: callStats.map((cs) => ({
        callDate: cs.callDate,
        calls: cs.basicDetails.calls,
      })),
    };

    return res.send(response);
  },
});
