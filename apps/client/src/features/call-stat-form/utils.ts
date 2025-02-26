import { CallStatTimeValue } from "@/services/call-stats/api/types";
import { CallStatsFormValues } from "./common.types";

export function statTimeToString(value: CallStatTimeValue) {
  return `${value.title}: ${value.hours} Hrs ${value.minutes} mins`;
}

export function callStatsToString(values: CallStatsFormValues) {
  const { basicDetails, requests, timings } = values;

  return `
  Calls: ${basicDetails.calls}
  Pitched: ${basicDetails.pitched}
  Call back: ${basicDetails.callBacks}
  Appointments: ${basicDetails.appointments}
  Follow Ups: ${basicDetails.followUps}
  
  LinkedIn requests: ${requests.linkedin}
  Email/WhatsApp requests: ${requests.email + requests.whatsApp}

  ${timings.map(statTimeToString).join("\n")}
          `;
}

export function generateTimingObject(): CallStatTimeValue {
  return {
    title: "",
    hours: 0,
    minutes: 0,
  };
}
