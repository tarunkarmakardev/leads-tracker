import _ from "lodash";
import dayjs from "dayjs";
import { createMethodHandler } from "@/lib/controllerUtil";
import { CallStat, CallStatResponseObject } from "@/models/call-stat";
import { getChartFromObject } from "./config";

const errors = {};

type AppointmentChartObj = {
  callDate: Date;
  calls: number;
  appointments: number;
};

export type AppointmentChartReqQuery = {
  from?: string;
};

export type AppointmentChartReqParams = {};

export type AppointmentChartResponse = {
  results: AppointmentChartObj[];
};

export const GET = createMethodHandler<
  AppointmentChartReqParams,
  {},
  AppointmentChartReqQuery
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
    const response: AppointmentChartResponse = {
      results: callStats.map((cs) => ({
        callDate: cs.callDate,
        calls: cs.basicDetails.calls,
        appointments: cs.basicDetails.appointments,
      })),
    };

    return res.send(response);
  },
});
