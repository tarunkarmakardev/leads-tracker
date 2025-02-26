import { CallStatTimeValue } from "@/services/call-stats/api/types";
import dayjs from "dayjs";
import { CallStatsFormValues } from "./common.types";
import { generateTimingObject } from "./utils";

export const initialTimingValues: CallStatTimeValue = generateTimingObject();

export const initialValues: CallStatsFormValues = {
  callDate: dayjs().toISOString(),
  basicDetails: {
    appointments: 0,
    callBacks: 0,
    calls: 0,
    followUps: 0,
    pitched: 0,
    recordingsSent: false,
  },
  requests: {
    email: 0,
    whatsApp: 0,
    linkedin: 0,
  },
  timings: [
    {
      title: "Break",
      hours: 1,
      minutes: 0,
      disabled: true,
    },
  ],
};
