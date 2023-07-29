import _ from "lodash";
import dayjs from "dayjs";
import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat } from "@/models/call-stat";
import { getChartFromObject } from "./config";

const errors = {};

type CallChartObject = {
  callDate: Date;
  calls: number;
};

export type CallChartReqQuery = {
  from?: string;
};

export type CallChartReqParams = {};

export type CallChartResponse = {
  results: CallChartObject[];
};

export const GET = createMethodHandler<
  CallChartReqParams,
  {},
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
